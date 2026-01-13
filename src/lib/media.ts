export function asUploadUrl(filePath?: string | null) {
  if (!filePath) return null;
  if (/^https?:\/\/?/i.test(filePath)) {
    return filePath;
  }
  return `/uploads/${filePath.replace(/\\/g, '/')}`;
}
