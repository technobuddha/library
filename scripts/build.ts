#!/bin/env -S ts-node --prefer-ts-exts
import process                      from 'process';
import chalk                        from 'chalk';
import shell                        from 'shelljs';
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

const pj     = JSON.parse(fs.readFileSync('package.json').toString()) as PackageJson;
const pjName = pj.name ?? '@technobuddha/library';

pj.scripts = {};
delete pj.devDependencies;
delete pj.publishConfig;

start('Cleaning');
run(shell.rm('-rf', 'dist'));
run(shell.mkdir('dist'));
finish();

start('Compiling', 'es5');
run(shell.exec('tsc -p src/tsconfig.json -t es5 -m commonjs --outDir dist'));
for(const file of glob.sync('dist/*.js')) {
    const { dir, base, name } = path.parse(file);
    const dest = path.join(dir, name);

    fs.mkdirSync(dest);
    pj.name         = `${pjName}/${name}`;
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

start('Building', 'dist');
pj.name = pjName;
delete pj.main;
delete pj.module;
delete pj.browser;
delete pj.esnext;
delete pj.typescript;
delete pj.types;
fs.writeFileSync('dist/package.json', JSON.stringify(pj, null, 2), 'utf8');

fs.copyFileSync('README.md', 'dist/README.ms');
fs.copyFileSync('LICENSE', 'dist/LICENSE');
finish();
