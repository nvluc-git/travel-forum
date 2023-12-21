import { api } from "./baseAPI";

const nameModel = "/comments";

const cmtsAPI = {
  getCmt: async (id) => {
    return await api.get(`${nameModel}/${id}`);
  },
  newComment: async (articleId, values) => {
    return await api.post(`${nameModel}/create/${articleId}`, values);
  },
  deleteComment: async (id) => {
    return await api.delete(`${nameModel}/delete/${id}`);
  },
};

export default cmtsAPI;
