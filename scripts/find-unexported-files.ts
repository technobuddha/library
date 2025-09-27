#!/usr/bin/env tsx
/* eslint-disable no-console */
/* eslint-disable n/no-sync */

/**
 * Script to find TypeScript files in src/ that are not exported by src/index.ts.
 */

import fs from 'node:fs';
import path from 'node:path';

/**
 * The source directory to scan.
 */
const SRC_DIR = path.resolve('src');

/**
 * The main index file to check for exports.
 */
const INDEX_FILE = path.join(SRC_DIR, 'index.ts');

/**
 * Recursively list all .ts files in a directory, excluding .d.ts, .test.ts, and index.ts.
 * @param dir - Directory to scan.
 * @returns Array of absolute file paths.
 */
function listAllTSFiles(dir: string): string[] {
  let results: string[] = [];
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(listAllTSFiles(filePath));
    } else if (
      file.endsWith('.ts') &&
      !file.endsWith('.d.ts') &&
      !file.endsWith('.test.ts') &&
      file !== 'index.ts'
    ) {
      results.push(path.resolve(filePath));
    }
  }
  return results;
}

/**
 * Get all files exported by an index.ts file (including nested exports).
 * @param indexPath - Path to index.ts file.
 * @param visited - Set of visited index files to avoid cycles.
 * @returns Array of absolute file paths.
 */
function getExportedFiles(indexPath: string, visited: Set<string> = new Set()): string[] {
  if (!fs.existsSync(indexPath)) {
    return [];
  }
  if (visited.has(indexPath)) {
    return [];
  }
  visited.add(indexPath);
  const dir = path.dirname(indexPath);
  const content = fs.readFileSync(indexPath, 'utf8');
  const exportRegex = /export\s+\*\s+from\s+['"](.+?)['"]/gu;
  const exportNamedRegex = /export\s+\{[^}]+\}\s+from\s+['"](.+?)['"]/gu;
  let match: RegExpExecArray | null;
  let files: string[] = [];
  while ((match = exportRegex.exec(content)) !== null) {
    const [, rel] = match;
    const resolved = path.resolve(dir, rel);
    if (fs.existsSync(resolved)) {
      files.push(resolved);
    } else if (fs.existsSync(`${resolved}/index.ts`)) {
      files = files.concat(getExportedFiles(`${resolved}/index.ts`, visited));
    }
  }
  while ((match = exportNamedRegex.exec(content)) !== null) {
    const [, rel] = match;
    const resolved = path.resolve(dir, rel);
    if (fs.existsSync(resolved)) {
      files.push(resolved);
    } else if (fs.existsSync(`${resolved}/index.ts`)) {
      files = files.concat(getExportedFiles(`${resolved}/index.ts`, visited));
    }
  }
  return files;
}

/**
 * Main entry point for the script.
 */
function main(): void {
  const allFiles = listAllTSFiles(SRC_DIR).map((f) => path.resolve(f));
  const exportedFiles = new Set(getExportedFiles(INDEX_FILE));
  const unexported = allFiles.filter((f) => !exportedFiles.has(f));
  if (unexported.length === 0) {
    console.log('All files are exported by src/index.ts');
  } else {
    console.log('Unexported files:');
    for (const f of unexported) {
      console.log(path.relative(SRC_DIR, f));
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
