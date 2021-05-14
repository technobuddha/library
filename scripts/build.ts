#!/bin/env -S ts-node --prefer-ts-exts
import process                      from 'process';
import chalk                        from 'chalk';
import shell                        from 'shelljs';
import { empty }                    from '../src/constants';
import splitLines                   from '../src/splitLines';
import compareStrings               from '../src/compareStrings';
import metricUnits                  from '../src/metricUnits';
import glob                         from 'glob';
import path                         from 'path';
import fs                           from 'fs-extra';
import type { PackageJson }         from 'type-fest';

process.env.NODE_ENV = 'production';

function out(text: string | undefined) {
    if(text)
        process.stdout.write(text);
}

function run(res: shell.ShellString) {
    if(res.code !== 0) {
        if(res.stdout) out(chalk.yellow(res.stdout));
        if(res.stderr) out(chalk.red(res.stderr));
        process.exit(res.code);
    }
}

function nano() {
    const t = process.hrtime();
    return t[0] + t[1] / 1000000000;
}

let timer: number;
function start(task: string, text?: string) {
    out(chalk.whiteBright(task));
    out(' '.repeat(12 - task.length));
    if(text) {
        out(chalk.blue(text));
        out(' '.repeat(20 - text.length));
    } else {
        out(' '.repeat(20));
    }
    timer = nano();
}

function finish() {
    const clock = nano() - timer;

    out(chalk.cyanBright(`${metricUnits(clock, { format: '##0.00', pad: 6 })}s\n`));
}

type PackageJsonTypescript = PackageJson & { typescript?: string };

const pj     = JSON.parse(fs.readFileSync('package.json').toString()) as PackageJsonTypescript;
const pjName = pj.name ?? '@technobuddha/library';

pj.scripts = {};
delete pj.devDependencies;
delete pj.publishConfig;

start('Cleaning');
run(shell.rm('-rf', 'dist', 'doc'));
run(shell.mkdir('dist', 'doc'));
finish();

start('Compiling', 'es5');
run(shell.exec('tsc -p src/tsconfig.json -t es5 -m commonjs --outDir dist'));
for(const file of glob.sync('dist/*.js')) {
    const { dir, base, name } = path.parse(file);
    const dest = path.join(dir, name);

    fs.mkdirSync(dest);
    pj.main         = `./${name}.cjs`;
    pj.module       = `./${name}.mjs`;
    pj.browser      = `./${name}.cjs`;
    pj.esnext       = `./${name}.mjs`;
    pj.typescript   = `./${name}.ts`;
    pj.types        = `./${name}.d.ts`;
    fs.writeFileSync(path.join(dest, 'package.json'), JSON.stringify(pj, null, 2), 'utf8');

    fs.moveSync(path.join(dir, base), path.join(dest, `${name}.cjs`));
    fs.moveSync(path.join(dir, `${name}.d.ts`), path.join(dir, name, `${name}.d.ts`));
    fs.copyFileSync(path.join('src', `${name}.ts`), path.join(dir, name, `${name}.ts`));
}
finish();

start('Compiling', 'esnext');
run(shell.exec('tsc -p src/tsconfig.json -t esnext -m esnext --outDir dist'));
for(const file of glob.sync('dist/*.js')) {
    const { dir, base, name } = path.parse(file);
    const dest = path.join(dir, name);

    fs.moveSync(path.join(dir, base), path.join(dest, `${name}.mjs`));
    fs.removeSync(path.join(dir, `${name}.d.ts`));
}
finish();

start('Correcting', 'imports');
for(const file of glob.sync('dist/**/*.*s')) {
    const contents = fs.readFileSync(file, { encoding: 'utf8' });
    fs.writeFileSync(file, contents.replace(/(?<=(from |require\()['"])\.\//ug, '../'));
}
finish();

start('Generating', 'doc');
run(shell.exec('npx typedoc > /dev/null'));
const readme        = splitLines(fs.readFileSync('doc/README.md', { encoding: 'utf8' }));
const toc: string[] = [];

readme.splice(0, 8);

toc.push(
    '[@technobuddha/library](../README.md) / Modules',
    empty,
    '## Table of contents',
    ...readme.sort((a, b) => compareStrings(a, b, { caseInsensitive: true })),
    empty
);
fs.writeFileSync('doc/Modules.md', toc.join('\n'));
fs.unlinkSync('doc/README.md');

for(const file of glob.sync('doc/*/*.md')) {
    const contents = fs.readFileSync(file, { encoding: 'utf8' });
    fs.writeFileSync(
        file,
        contents.replace(
            '[@technobuddha/library](../README.md)',
            '[@technobuddha/library](../../README.md) / [Modules](../Modules.md)'
        )
    );
}

finish();

start('Building', 'dist');
pj.name = pjName;
delete pj.main;
delete pj.module;
delete pj.browser;
delete pj.esnext;
delete pj.typescript;
delete pj.types;
fs.writeFileSync('dist/package.json', JSON.stringify(pj, null, 2), 'utf8');

fs.copyFileSync('LICENSE',   'dist/LICENSE');
fs.copyFileSync('README.md', 'dist/README.md');
finish();
