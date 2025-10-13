// Placeholder AWS config (if you use S3). Fill env vars and install aws-sdk or @aws-sdk/client-s3 when needed.
export default {
  region: process.env.AWS_REGION || 'ap-south-1',
  bucket: process.env.AWS_S3_BUCKET || ''
};