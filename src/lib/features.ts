export const isCaptchaEnabled = () => process.env.ENABLE_CAPTCHA === 'true';

export const getUploadDir = () => {
  if (!process.env.UPLOAD_DIR) {
    throw new Error('UPLOAD_DIR is not configured');
  }
  return process.env.UPLOAD_DIR;
};
