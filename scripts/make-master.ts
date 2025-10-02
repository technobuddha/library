#!/usr/bin/env node
import fs from 'node:fs/promises';

import { unique } from '@technobuddha/library';

import { names } from '../datasets/names.ts';
import { namesFemale } from '../datasets/names-female.ts';
import { namesMale } from '../datasets/names-male.ts';
import { namesNeutral } from '../datasets/names-neutral.ts';
import { words } from '../datasets/twl06.ts';

const master = unique(
  [...names, ...namesFemale, ...namesMale, ...namesNeutral, ...words].map((w) => w.toUpperCase()),
).sort();

await fs.writeFile('./fixtures/master.json', `${JSON.stringify(master, null, 2)}\n`, 'utf-8');

// eslint-disable-next-line no-console
console.log(master.length, 'words');
