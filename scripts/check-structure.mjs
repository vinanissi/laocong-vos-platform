/**
 * Phase 003 — read-only repo structure audit (no file mutations).
 * Exit 1 if required top-level folders are missing; exit 0 if only warnings.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const REQUIRED_DIRS = [
  'apps',
  'services',
  'runtime',
  'database',
  'packages',
  'integrations',
  '00_SYSTEM_BRAIN',
  'docs',
];

function isDir(p) {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function existsFile(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

const errors = [];
const warnings = [];

for (const name of REQUIRED_DIRS) {
  const full = path.join(root, name);
  if (!isDir(full)) {
    errors.push(`Missing required directory: ${name}/`);
  }
}

const appsScriptDir = path.join(root, 'apps-script');
if (isDir(appsScriptDir)) {
  warnings.push(
    'WARN: root contains apps-script/ — confirm Apps Script stays out of core runtime (integration layer only).'
  );
}

let entries;
try {
  entries = fs.readdirSync(root);
} catch (e) {
  errors.push(`Cannot read repo root: ${e.message}`);
  entries = [];
}

for (const name of entries) {
  if (name.endsWith('.gs')) {
    warnings.push(
      `WARN: root-level GAS file "${name}" — prefer integrations/gas-support/legacy-modules/ for legacy code.`
    );
  }
}

const gasSupport = path.join(root, 'integrations', 'gas-support');
if (!isDir(gasSupport)) {
  warnings.push(
    'WARN: integrations/gas-support/ not found — expected slot for GAS legacy support per repo structure.'
  );
}

console.log('=== check-structure — LAOCONG_VOS_PLATFORM ===');
console.log(`Root: ${root}`);
console.log('');

if (errors.length) {
  console.log('ERRORS:');
  for (const line of errors) console.log(`  - ${line}`);
  console.log('');
}

if (warnings.length) {
  console.log('WARNINGS:');
  for (const line of warnings) console.log(`  - ${line}`);
  console.log('');
}

if (!errors.length && !warnings.length) {
  console.log('OK: required directories present; no structural warnings.');
} else if (!errors.length) {
  console.log('OK: required directories present (warnings only).');
}

process.exit(errors.length > 0 ? 1 : 0);
