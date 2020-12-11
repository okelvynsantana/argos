const strings = {
  errors: {
    rekognition: {
      Fatal: "Houve um erro no processamento da imagem.",
      noFace: "Não existe um rosto na foto enviada",
      manyFaces: "Existe mais de um rosto na foto, por favor envie uma foto com apenas um rosto",
      internalError: "Erro ao se comunicar com a ferramenta de análise facial, por favor tente novamente.",
    },
  },
  success: {
    rekognition: {
      indexFaces: "Rosto indexado com sucesso",
    },
  },
};

export default strings;
