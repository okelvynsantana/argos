import { config as awsConfig, Rekognition } from "aws-sdk";
import { awsConfig as awsConfigKey, recognitionConfig } from "../../../config/aws";
import { api } from "../../api";

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
        FaceMatchThreshold: 90,
      },
      (err) => {
        if (err) {
          console.error(err);
          throw api.err.Fatal("Erro ao encontrar rosto");
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
    (err) => {
      console.error(err);
    },
  );

  return "Face indexada com sucesso";
};

export const handleSearchFace = async (image: Buffer): Promise<Rekognition.DetectFacesResponse> => {
  const facesExists = await rekognition
    .detectFaces({ Image: { Bytes: image }, Attributes: ["ALL"] }, (err, data) => {
      if (err) {
        console.error(err);
        throw api.err.Fatal("Erro ao tentar detectar faces na imagem");
      }
      return data;
    })
    .promise();
  return facesExists;
};
