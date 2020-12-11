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
  const faceId = userExists.FaceMatches!.length > 0 ? userExists.FaceMatches!.map((face) => face.Face!.FaceId!) : null;
  const similarity =
    userExists.FaceMatches!.length > 0 ? userExists.FaceMatches!.map((face) => face.Similarity!) : null;

  if (userExists.FaceMatches!.length === 0) {
    await handleIndexFace(image);
    return {
      match: false,
      faceId,
      similarity,
    };
  }
  return {
    match: true,
    faceId,
    similarity,
  };
};
