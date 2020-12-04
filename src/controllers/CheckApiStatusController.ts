import { api } from "../api";

api.fn.checkApiStatus = async (_ctx) => {
  return {
    status: 200,
    message: "Api rodando",
    error: false,
  };
};
