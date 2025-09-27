import fs from 'node:fs/promises';
import path from 'node:path';

import ts from 'typescript';

// Helper to recursively get all .ts files in a directory
async function getAllTSFiles(dir: string): Promise<string[]> {
  return fs.readdir(dir, { recursive: true, withFileTypes: true }).then(async (files) => {
    const results: string[] = [];
    for (const file of files) {
      if (file.isFile() && file.name.endsWith('.ts') && !file.name.endsWith('.d.ts')) {
        results.push(path.join(file.parentPath, file.name));
      }
    }
    return results;
  });
}

// Check for bad JSDoc comments in a TypeScript file using the AST
async function findBadJsdocInFile(filePath: string): Promise<void> {
  return fs.readFile(filePath, 'utf8').then((sourceText) => {
    const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true);

    function checkNode(node: ts.Node): void {
      // Get JSDoc nodes
      for (const jsDoc of ts.getJSDocCommentsAndTags(node).filter(ts.isJSDoc)) {
        if (!jsDoc.comment || jsDoc.comment.toString().trim() === '') {
          const { line, character } = sourceFile.getLineAndCharacterOfPosition(jsDoc.pos);
          reportBadJsdoc({ filePath, line, character });
        }
      }
      ts.forEachChild(node, checkNode);
    }

    return checkNode(sourceFile);
  });
}

// Collect bad JSDoc results for reporting
type BadJsdoc = { filePath: string; line: number; character: number };
const badJsdocResults: BadJsdoc[] = [];

function reportBadJsdoc(result: BadJsdoc): void {
  badJsdocResults.push(result);
}

// Main execution
async function main(): Promise<void> {
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
      console.log(
        `${relPath}:${line + 1}:${character + 1} - Bad JSDoc: Empty or missing description`,
      );
    }
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
