import { api, apiFormData } from "./baseAPI";
const nameModel = "/users";

const userApi = {
  currentUser: async () => {
    return await api.get(`${nameModel}/currentUser`);
  },
  getOneAcc: async (id) => {
    return await api.get(`${nameModel}/${id}`);
  },
  updateAcc: async (values) => {
    return await apiFormData.put(`${nameModel}/update`, values);
  },
  changePass: async ({ curPass, newPass }) => {
    return await api.put(`${nameModel}/changePass`, { curPass, newPass });
  },
  rpArticle: async (id) => {
    return await api.post(`${nameModel}/rpArticle/${id}`);
  },
  userGetService: async () => {
    return await api.get(`${nameModel}/services`);
  },
};

export default userApi;
