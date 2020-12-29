import fs from 'fs';

const pj = JSON.parse(fs.readFileSync('package.json').toString());
pj.scripts = {};
delete pj.devDependencies;
fs.writeFileSync('dist/package.json', JSON.stringify(pj), 'utf8');
