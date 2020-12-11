import { api, Context } from "../api";
import { FaceResponse, InvalidArgument } from "../generated/api";
import { handleSearchFaceByImage, handleIndexFace, handleSearchFace } from "../providers/RekognationProvider";
import strings from "../utils/strings";
// import { uploadFile } from "../providers/S3Provider";

api.fn.searchFaceInBase = async (_ctx: Context, { image }): Promise<FaceResponse> => {
  const existsFaceInSelfie = await handleSearchFace(image);

  if (existsFaceInSelfie.FaceDetails) {
    if (existsFaceInSelfie.FaceDetails.length === 0) {
      throw new InvalidArgument(strings.errors.rekognition.noFace, {
        argumentName: "image",
        reason: strings.errors.rekognition.noFace,
      });
    }
    if (existsFaceInSelfie.FaceDetails.length > 1) {
      throw new InvalidArgument(strings.errors.rekognition.manyFaces, {
        argumentName: "image",
        reason: strings.errors.rekognition.manyFaces,
      });
    }
  }

  const userExists = await handleSearchFaceByImage(image);
  const info =
    userExists.FaceMatches!.length > 0
      ? userExists.FaceMatches!.map((face) => {
          return {
            faceId: face.Face!.FaceId!,
            similarity: face.Similarity!,
          };
        })
      : null;

  if (userExists.FaceMatches!.length === 0) {
    await handleIndexFace(image);
    return {
      match: false,
      info,
    };
  }
  return {
    match: true,
    info,
  };
};
