// Converted from find-bad-jsdoc-ast.js to TypeScript
import fs from 'node:fs/promises';
import path from 'node:path';

import ts from 'typescript';

// Helper to recursively get all .ts files in a directory
async function getAllTSFiles(dir: string): Promise<string[]> {
  let results: string[] = [];
  const list = await fs.readdir(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    if (stat?.isDirectory()) {
      results = results.concat(await getAllTSFiles(filePath));
    } else if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
      results.push(filePath);
    }
  }
  return results;
}

// Check for bad JSDoc comments in a TypeScript file using the AST
async function findBadJsdocInFile(filePath: string): Promise<void> {
  const sourceText = await fs.readFile(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true);

  function checkNode(node: ts.Node): void {
    // Use the public API to get JSDoc nodes, avoid 'any'.
    const jsDocNodes = ts.getJSDocCommentsAndTags(node).filter(ts.isJSDoc);
    if (jsDocNodes.length > 0) {
      for (const jsDoc of jsDocNodes) {
        // Example: check for empty JSDoc or missing description
        if (!jsDoc.comment || jsDoc.comment.toString().trim() === '') {
          const { line, character } = sourceFile.getLineAndCharacterOfPosition(jsDoc.pos);
          // Instead of console.log, collect results for reporting
          reportBadJsdoc({ filePath, line: line + 1, character: character + 1 });
        }
      }
    }
    ts.forEachChild(node, checkNode);
  }

  checkNode(sourceFile);
}

// Collect bad JSDoc results for reporting
type BadJsdoc = { filePath: string; line: number; character: number };
const badJsdocResults: BadJsdoc[] = [];

function reportBadJsdoc(result: BadJsdoc): void {
  badJsdocResults.push(result);
}

// Main execution
async function main(): Promise<void> {
  // Avoid __dirname: use import.meta.url to get the current file location
  const currentFileUrl = import.meta.url;
  const currentFilePath = path.dirname(new URL(currentFileUrl).pathname);
  const srcDir = path.resolve(currentFilePath, '../src');
  const files = await getAllTSFiles(srcDir);
  for (const file of files) {
    await findBadJsdocInFile(file);
  }
  // Output all bad JSDoc results at once (no console.log in checkNode)
  if (badJsdocResults.length > 0) {
    const cwd = process.cwd();
    for (const { filePath, line, character } of badJsdocResults) {
      // Show path relative to current working directory
      const relPath = path.relative(cwd, filePath);
      // eslint-disable-next-line no-console
      console.log(`${relPath}:${line}:${character} - Bad JSDoc: Empty or missing description`);
    }
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  // Avoid process.exit for better testability
  // process.exit(1);
});
