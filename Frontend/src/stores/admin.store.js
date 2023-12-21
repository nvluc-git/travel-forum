import { defineStore } from "pinia";
import { computed, ref } from "vue";
import adminApi from "@/services/admin";

export const adminStore = defineStore("admin", () => {
  const users = ref([]);
  const services = ref([]);
  const service = ref({});
  const mess = ref(null);
  const checkData = ref(false);
  const selected = ref("All");
  const options = ref([
    { text: "All", value: "All" },
    { text: "Active", value: "Active" },
    { text: "Banned", value: "Banned" },
  ]);
  const onGetUser = async () => {
    try {
      const res = await adminApi.getUsers();
      users.value = res.data;
    } catch (error) {
      error;
    }
  };
  const searchUser = ref("");
  const filterUser = computed(() => {
    let sUser = users.value.filter((s) =>
      s.email.toLowerCase().includes(searchUser.value.toLowerCase())
    );
    if (selected.value === "Active") {
      return sUser.filter((a) => a.status === true);
    }
    if (selected.value === "Banned") {
      return sUser.filter((b) => b.status === false);
    }

    return sUser;
  });

  const onBanUser = async (id) => {
    try {
      const res = await adminApi.banUser(id);
      const { message, data } = res.data;
      if (data === true) {
        checkData.value = data;
        mess.value = message;
        return;
      } else {
        checkData.value = data;
        mess.value = message;
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onDeleteUser = async (id) => {
    try {
      const res = await adminApi.deleteUser(id);
      const { message } = res.data;
      mess.value = message;
    } catch (error) {
      console.log(error);
    }
  };

  // services
  const getSers = async () => {
    try {
      const res = await adminApi.getServices();
      services.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const oneSer = async (id) => {
    try {
      const res = await adminApi.getOneService(id);

      service.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const newSer = async (values) => {
    try {
      const res = await adminApi.createService(values);

      const { message } = res.data;

      mess.value = message;
    } catch (error) {
      console.log(error);
    }
  };
  const updateSer = async (values) => {
    try {
      const res = await adminApi.updateService(values);
      const { message } = res.data;
      mess.value = message;
    } catch (error) {
      console.log(error);
    }
  };
  const deleteSer = async (id) => {
    try {
      const res = await adminApi.deleteService(id);
      const { message } = res.data;
      mess.value = message;
    } catch (error) {
      console.log(error);
    }
  };

  const searchService = ref("");
  const filterSer = computed(() => {
    let searchSer = services.value.filter((s) =>
      s.title.toLowerCase().includes(searchService.value.toLowerCase())
    );
    return searchSer;
  });

  const onSendMess = async (id, values) => {
    try {
      const res = await adminApi.sendMess(id, values);
      const { message } = res.data;
      mess.value = message;
    } catch (error) {
      console.log(error);
    }
  };

  const remove_article = async (id) => {
    try {
      const res = await adminApi.removeArticle(id);
      const { message, data } = res.data;
      checkData.value = data;
      mess.value = message;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    users,
    checkData,
    onGetUser,
    mess,
    searchUser,
    filterUser,
    options,
    selected,
    services,
    getSers,
    oneSer,
    newSer,
    updateSer,
    deleteSer,
    onBanUser,
    onDeleteUser,
    filterSer,
    searchService,
    service,
    onSendMess,
    remove_article,
  };
});
