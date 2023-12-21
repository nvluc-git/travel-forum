import { defineStore } from "pinia";
import { ref } from "vue";
import userApi from "@/services/userAPI";
import router from "@/routers";

export const accountsStore = defineStore("accounts", () => {
  const currentUser = ref({});
  const userP = ref({});
  const articleP = ref([]);
  const mess = ref("");
  const checkData = ref(false);
  const getAccounts = async () => {
    try {
      const res = await userApi.currentUser();
      const { data } = res.data;
      currentUser.value = data;
    } catch (error) {
      console.log(error);
    }
  };
  const getOneAcc = async (id) => {
    try {
      const res = await userApi.getOneAcc(id);
      const { data } = res.data;
      if (data === false) return router.push({ name: "error" });
      userP.value = data.user;
      articleP.value = data.article;
    } catch (error) {
      console.log(error);
    }
  };

  const updateAccount = async (values) => {
    try {
      const res = await userApi.updateAcc(values);
      const { message, data } = res.data;
      checkData.value = data;
      mess.value = message;
    } catch (error) {
      console.log(error);
    }
  };

  const changePassword = async ({ curPass, newPass }) => {
    try {
      const res = await userApi.changePass({ curPass, newPass });
      const { message, data } = res.data;
      mess.value = message;
      checkData.value = data;
    } catch (error) {
      console.log(error);
    }
  };
  const reportArticle = async (id) => {
    try {
      const res = await userApi.rpArticle(id);
      const { message, data } = res.data;
      mess.value = message;
      checkData.value = data;
    } catch (error) {
      console.log(error);
    }
  };
  const services = ref([]);
  const someServices = ref([]);
  const getSers = async () => {
    try {
      const res = await userApi.userGetService();
      services.value = res.data;
      let get_sers = res.data;
      let getSomeSers = get_sers.sort(() => 0.5 - Math.random());
      someServices.value = getSomeSers.slice(0, 4);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    currentUser,
    getAccounts,
    getOneAcc,
    userP,
    articleP,
    updateAccount,
    mess,
    checkData,
    changePassword,
    reportArticle,
    getSers,
    services,
    someServices,
  };
});
