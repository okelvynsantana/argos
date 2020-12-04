import { Context } from "@sdkgen/node-runtime";
import Aws from "aws-sdk";
import { awsRegion, collectionId as awsCollectionId } from "../../config/aws";
import { api } from "../api";

Aws.config.region = process.env.AWS_REGION;

const rekognition = new Aws.Rekognition({ region: awsRegion });
const collectionId = awsCollectionId;

api.fn.searchFaceInBase = async (_ctx: Context, { image }) => {
  try {
    const imageExistInCollection = await rekognition.searchFacesByImage({
      CollectionId: collectionId,
      FaceMatchThreshold: 99,
      Image: {
        Bytes: image,
      },
      MaxFaces: 1,
    });

    if (!imageExistInCollection) {
      await rekognition.indexFaces(
        {
          CollectionId: collectionId,
          Image: {
            Bytes: image,
          },
          MaxFaces: 1,
          QualityFilter: "AUTO",
          DetectionAttributes: ["ALL"],
        },
        (err) => {
          console.error(err);
          throw api.err.Fatal("Erro ao adicionar imagem na collection");
        },
      );

      return {
        match: false,
      };
    }

    return {
      match: true,
    };
  } catch (error) {
    console.error(error);
    throw api.err.Fatal("Erro ao realizar a consulta na collection");
  }
};
