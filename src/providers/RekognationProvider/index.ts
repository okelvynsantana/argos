import { config as awsConfig, Rekognition } from "aws-sdk";
import { awsConfig as awsConfigKey, recognitionConfig } from "../../../config/aws";
import { ServiceError } from "../../generated/api";
import strings from "../../utils/strings";

const rekognition = new Rekognition();
awsConfig.update(awsConfigKey);

export const handleSearchFaceByImage = async (image: Buffer): Promise<Rekognition.SearchFacesByImageResponse> => {
  const searchFace = await rekognition
    .searchFacesByImage(
      {
        CollectionId: recognitionConfig.collectionId,
        Image: {
          Bytes: image,
        },
        MaxFaces: 1,
        FaceMatchThreshold: 99,
      },
      (err) => {
        if (err) {
          console.error(err);
          throw new ServiceError(strings.errors.rekognition.internalError);
        }
      },
    )
    .promise();

  return searchFace;
};

export const handleIndexFace = async (image: Buffer): Promise<string> => {
  await rekognition.indexFaces(
    {
      CollectionId: recognitionConfig.collectionId,
      Image: {
        Bytes: image,
      },
      MaxFaces: 1,
      QualityFilter: "AUTO",
    },
    (err, data) => {
      if (err) {
        console.error(err);
        throw new ServiceError(strings.errors.rekognition.internalError);
      }
      return data;
    },
  );

  return strings.success.rekognition.indexFaces;
};

export const handleSearchFace = async (image: Buffer): Promise<Rekognition.DetectFacesResponse> => {
  const facesExists = await rekognition
    .detectFaces({ Image: { Bytes: image }, Attributes: ["ALL"] }, (err, data) => {
      if (err) {
        console.error(err);
        throw new ServiceError(strings.errors.rekognition.internalError);
      }
      return data;
    })
    .promise();
  return facesExists;
};
