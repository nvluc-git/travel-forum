import { api, apiFormData } from "./baseAPI";

const nameModel = "/admin";

const adminApi = {
  getUsers: async () => {
    return await api.get(`${nameModel}/users`);
  },
  sendMess: async (id, values) => {
    return await apiFormData.post(`${nameModel}/sendMess/${id}`, values);
  },
  banUser: async (id) => {
    return await api.put(`${nameModel}/banned/${id}`);
  },
  deleteUser: async (id) => {
    return await api.delete(`${nameModel}/deleteUser/${id}`);
  },

  getServices: async () => {
    return await api.get(`${nameModel}/services`);
  },
  getOneService: async (id) => {
    return await api.get(`${nameModel}/service/${id}`);
  },

  createService: async (values) => {
    return await apiFormData.post(`${nameModel}/service/create`, values);
  },
  updateService: async (values) => {
    return await apiFormData.put(`${nameModel}/service/update`, values);
  },
  deleteService: async (id) => {
    return await api.delete(`${nameModel}/service/delete/${id}`);
  },
  removeArticle: async (id) => {
    return await api.delete(`${nameModel}/removeArticle/${id}`);
  },
};

export default adminApi;
