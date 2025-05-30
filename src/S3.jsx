import { S3Client, GetObjectCommand, ListObjectsCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// Initialize an S3 client with provided credentials
const s3Client = new S3Client({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESSKEYID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRETACCESSKEY
    }
});

export const listSourceBucket = async () => {
  const command = new ListObjectsCommand({ Bucket: import.meta.env.VITE_AWS_SOURCE_NAME });
  const response = await s3Client.send(command);
  return response;
}

export const getFileUrlFromAws = async (fileName, expireTime = null, bucketName) => {
    try {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: fileName, 
        });
        // Generate a signed URL with expiration time if provided
        if (expireTime != null) {
            const url = await getSignedUrl(s3Client, command, { expiresIn: expireTime });
            return url;
        } else {
            // Generate a signed URL without expiration time
            const url = await getSignedUrl(s3Client, command);
            return url;
        }
    } catch (err) {
        console.log("error ::", err);
        return "error";
    }
};