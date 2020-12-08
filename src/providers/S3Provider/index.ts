import { config as awsConfig, S3 } from "aws-sdk";
import { uuid } from "uuidv4";
import { awsConfig as awsConfigKey } from "../../../config/aws";

const bucketName = process.env.AWS_BUCKET_NAME || "argosprojectkvn";
const awsS3 = new S3();
awsConfig.update(awsConfigKey);

interface Response {
  filename: string;
  bucketName: string;
}

const uploadFile = async (image: Buffer): Promise<Response> => {
  const filename = `${uuid()}.jpg`;

  await awsS3.upload(
    {
      Bucket: bucketName,
      Key: filename,
      Body: {
        buffer: image,
      },
    },
    {},
    (err) => {
      if (err) {
        console.error(err);
      }
    },
  );

  return {
    filename,
    bucketName,
  };
};

// export const deleteFile = async () => {};

export default { uploadFile };
