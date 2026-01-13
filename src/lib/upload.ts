import {promises as fs} from 'fs';
import path from 'path';
import {randomBytes} from 'crypto';
import {getUploadDir} from './features';

type UploadKind = 'products' | 'jobs' | 'hero';

const productTypes = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp']
]);

const cvTypes = new Map([
  ['application/pdf', 'pdf'],
  ['application/msword', 'doc'],
  ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'docx']
]);

const limits: Record<UploadKind, number> = {
  products: 5 * 1024 * 1024,
  jobs: 10 * 1024 * 1024,
  hero: 5 * 1024 * 1024
};

function buildRelativePath(kind: UploadKind, extension: string) {
  const date = new Date();
  const dir = `${kind}/${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`;
  const randomName = randomBytes(16).toString('hex');
  return `${dir}/${randomName}.${extension}`;
}

async function writeFileToUpload(relativePath: string, buffer: Buffer) {
  const baseDir = getUploadDir();
  const absolute = path.resolve(baseDir, relativePath);
  if (!absolute.startsWith(path.resolve(baseDir))) {
    throw new Error('Unsafe upload path');
  }
  await fs.mkdir(path.dirname(absolute), {recursive: true});
  await fs.writeFile(absolute, buffer);
  return relativePath.replace(/\\\\/g, '/');
}

async function saveFile(file: File, kind: UploadKind, allowed: Map<string, string>) {
  const ext = allowed.get(file.type);
  if (!ext) {
    throw new Error('Unsupported file type');
  }
  if (file.size > limits[kind]) {
    throw new Error('File too large');
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const relativePath = buildRelativePath(kind, ext);
  return writeFileToUpload(relativePath, buffer);
}

export async function saveProductMedia(file: File) {
  return saveFile(file, 'products', productTypes);
}

export async function saveHeroImage(file: File) {
  return saveFile(file, 'hero', productTypes);
}

export async function saveJobCv(file: File) {
  return saveFile(file, 'jobs', cvTypes);
}

export function resolveUploadPath(relativePath: string) {
  const baseDir = getUploadDir();
  const resolved = path.resolve(baseDir, relativePath);
  if (!resolved.startsWith(path.resolve(baseDir))) {
    throw new Error('Unsafe path');
  }
  return resolved;
}
