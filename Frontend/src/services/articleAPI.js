import { api, apiFormData } from "./baseAPI";
const nameModel = "/articles";

const articlesApi = {
  getAll: async () => {
    return await api.get(nameModel);
  },
  getById: async (id) => {
    return await api.get(`${nameModel}/${id}`);
  },
  getByUser: async (userId) => {
    return await api.get(`${nameModel}/articleUser/${userId}`);
  },

  getByPost: async () => {
    return await api.get(`${nameModel}/articlePost`);
  },
  getByQuestion: async () => {
    return await api.get(`${nameModel}/articleQuestion`);
  },
  getPostUser: async () => {
    return await api.get(`${nameModel}/articlePostUser`);
  },
  getQuestionUser: async () => {
    return await api.get(`${nameModel}/articleQuestionUser`);
  },

  newArticle: async (values) => {
    return await apiFormData.post(`${nameModel}/create`, values);
  },

  updateArticle: async (values) => {
    return await apiFormData.put(`${nameModel}/update`, values);
  },
  deleteArticle: async (id) => {
    return await api.delete(`${nameModel}/delete/${id}`);
  },
};

export default articlesApi;
