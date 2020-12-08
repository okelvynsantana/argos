import { api, Context } from "../api";
import { handleSearchFaceByImage, handleIndexFace, handleSearchFace } from "../providers/RekognationProvider";
// import { uploadFile } from "../providers/S3Provider";

api.fn.searchFaceInBase = async (_ctx: Context, { image }) => {
  const existsFaceInSelfie = await handleSearchFace(image);

  if (existsFaceInSelfie.FaceDetails?.length === 0) {
    throw api.err.Fatal("Não existem um rosto nessa foto.");
  }

  const userExists = await handleSearchFaceByImage(image);

  if (userExists.FaceMatches?.length === 0) {
    await handleIndexFace(image);
    return {
      match: false,
    };
  }
  return {
    match: true,
  };
};
