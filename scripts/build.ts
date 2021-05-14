#!/bin/env -S ts-node --prefer-ts-exts
import buildForNPM from '../../../scripts/build-for-npm';
buildForNPM({ packageName: 'library' });
