import { defineStore } from "pinia";
import { ref } from "vue";
import notisAPI from "@/services/notiAPI";

export const NotiStore = defineStore("notis", () => {
  // states

  const notis = ref([]);
  const mess = ref(null);

  // actions
  const onGetNoti = async (id) => {
    try {
      const res = await notisAPI.getNotis(id);
      const { data } = res.data;
      notis.value = data;
    } catch (error) {
      error;
    }
  };

  return { notis, onGetNoti, mess };
});
