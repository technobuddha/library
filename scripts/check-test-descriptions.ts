import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { camelCase, kebabCase } from 'lodash-es';

interface TestFileInfo {
  filePath: string;
  functionName: string;
  importedName: string;
  describeName: string;
  isConsistent: boolean;
  issues: string[];
}

async function checkTestFiles(srcDir: string = './src'): Promise<void> {
  try {
    const files = await readdir(srcDir);
    const testFiles = files.filter((file) => file.endsWith('.test.ts'));

    const results: TestFileInfo[] = [];

    for (const file of testFiles) {
      const filePath = join(srcDir, file);
      const content = await readFile(filePath, 'utf-8');

      const result = analyzeTestFile(filePath, content);
      results.push(result);
    }

    // Print results
    console.log(`\nChecked ${results.length} test files:\n`);

    const inconsistent = results.filter((r) => !r.isConsistent);
    const consistent = results.filter((r) => r.isConsistent);

    console.log(`✅ Consistent: ${consistent.length}`);
    console.log(`❌ Inconsistent: ${inconsistent.length}\n`);

    if (inconsistent.length > 0) {
      console.log('INCONSISTENT FILES:');
      console.log('==================');
      for (const result of inconsistent) {
        console.log(`\n📁 ${result.filePath}`);
        console.log(`   Function: ${result.functionName}`);
        console.log(`   Import: ${result.importedName}`);
        console.log(`   Describe: ${result.describeName}`);
        console.log(`   Issues: ${result.issues.join(', ')}`);
      }
    }

    if (consistent.length > 0) {
      console.log('\nCONSISTENT FILES:');
      console.log('=================');
      for (const result of consistent) {
        console.log(`✅ ${result.filePath} - ${result.functionName}`);
      }
    }
  } catch (error) {
    console.error('Error checking test files:', error);
  }
}

function analyzeTestFile(filePath: string, content: string): TestFileInfo {
  const issues: string[] = [];

  // Extract function name from filename (remove .test.ts)
  const fileName = filePath.split('/').pop() || '';
  const functionName = fileName.replace('.test.ts', '');

  // Extract imported function names
  const importMatches = content.match(/import\s*{[^}]+}\s*from\s*['"][^'"]+['"];?/g) || [];
  const importedFunctions: string[] = [];

  for (const importMatch of importMatches) {
    const functionsMatch = importMatch.match(/{\s*([^}]+)\s*}/);
    if (functionsMatch) {
      const functions = functionsMatch[1]
        .split(',')
        .map((f) => f.trim())
        .filter((f) => !f.startsWith('type '))
        .map((f) => f.replace(/\s+as\s+\w+/, '')) // Remove aliases
        .filter((f) => f.length > 0);
      importedFunctions.push(...functions);
    }
  }

  // Extract describe block names
  const describeMatches = content.match(/describe\s*\(\s*['"]([^'"]+)['"][^)]*\)/g) || [];
  const describeNames = describeMatches
    .map((match) => {
      const nameMatch = match.match(/describe\s*\(\s*['"]([^'"]+)['"]/);
      return nameMatch ? nameMatch[1] : '';
    })
    .filter((name) => name.length > 0);

  // Check consistency
  const primaryImportedFunction =
    importedFunctions.find(
      (f) => f === functionName || f.toLowerCase() === functionName.toLowerCase(),
    ) ||
    importedFunctions[0] ||
    'unknown';

  const primaryDescribeName = describeNames[0] || 'unknown';

  // Check for issues
  if (primaryImportedFunction !== camelCase(functionName)) {
    issues.push(
      `Import name "${primaryImportedFunction}" doesn't match filename "${functionName}"`,
    );
  }

  if (primaryDescribeName !== camelCase(functionName)) {
    issues.push(`Describe name "${primaryDescribeName}" doesn't match filename "${functionName}"`);
  }

  if (primaryImportedFunction !== primaryDescribeName) {
    issues.push(
      `Import name "${primaryImportedFunction}" doesn't match describe name "${primaryDescribeName}"`,
    );
  }

  if (describeNames.length > 1) {
    issues.push(`Multiple describe blocks found: ${describeNames.join(', ')}`);
  }

  if (importedFunctions.length === 0) {
    issues.push('No function imports found');
  }

  if (describeNames.length === 0) {
    issues.push('No describe block found');
  }

  return {
    filePath,
    functionName,
    importedName: primaryImportedFunction,
    describeName: primaryDescribeName,
    isConsistent: issues.length === 0,
    issues,
  };
}

// Run the script
checkTestFiles().catch(console.error);
