#!/usr/bin/env node
// find-unexported-files.js
// Usage: node find-unexported-files.js

import fs from 'node:fs';
import path from 'node:path';

const SRC_DIR = path.resolve('src');
const INDEX_FILE = path.join(SRC_DIR, 'index.ts');

function listAllTSFiles(dir) {
  let results = [];
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

function getExportedFiles(indexPath, visited = new Set()) {
  if (!fs.existsSync(indexPath)) return [];
  if (visited.has(indexPath)) return [];
  visited.add(indexPath);
  const dir = path.dirname(indexPath);
  const content = fs.readFileSync(indexPath, 'utf8');
  const exportRegex = /export\s+\*\s+from\s+['"](.+?)['"]/g;
  const exportNamedRegex = /export\s+\{[^}]+\}\s+from\s+['"](.+?)['"]/g;
  let match;
  let files = [];
  while ((match = exportRegex.exec(content)) !== null) {
    let rel = match[1];
    let resolved = path.resolve(dir, rel);
    if (fs.existsSync(resolved)) {
      files.push(resolved);
    } else if (fs.existsSync(resolved + '/index.ts')) {
      files = files.concat(getExportedFiles(resolved + '/index.ts', visited));
    }
  }
  while ((match = exportNamedRegex.exec(content)) !== null) {
    let rel = match[1];
    let resolved = path.resolve(dir, rel);
    if (fs.existsSync(resolved)) {
      files.push(resolved);
    } else if (fs.existsSync(resolved + '/index.ts')) {
      files = files.concat(getExportedFiles(resolved + '/index.ts', visited));
    }
  }
  return files;
}

function main() {
  const allFiles = listAllTSFiles(SRC_DIR).map(f => path.resolve(f));
  const exportedFiles = new Set(getExportedFiles(INDEX_FILE));
  const unexported = allFiles.filter(f => !exportedFiles.has(f));
  if (unexported.length === 0) {
    console.log('All files are exported by src/index.ts');
  } else {
    console.log('Unexported files:');
    unexported.forEach(f => console.log(path.relative(SRC_DIR, f)));
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
