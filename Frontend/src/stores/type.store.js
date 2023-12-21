import { defineStore } from "pinia";
import { ref } from "vue";
import typeAPI from "@/services/typeAPI";
export const typesStore = defineStore("types", () => {
  const types = ref([]);

  const getTypes = async () => {
    const res = await typeAPI.getTypes();
    types.value = res.data;
  };

  return { types, getTypes };
});
