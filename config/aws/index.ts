export const awsConfig = {
  region: process.env.AWS_REGION,

  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

export const recognitionConfig = {
  collectionId: process.env.AWS_REKOGNITION_COLLECTION_ID || "argos",
};
