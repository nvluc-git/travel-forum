import { defineStore } from "pinia";
import { ref } from "vue";
import cateApi from "@/services/categoryAPI";
export const categoriesStore = defineStore("categories", () => {
  const cats = ref([]);

  const getCats = async () => {
    const res = await cateApi.getCategories();
    cats.value = res.data;
  };

  return { cats, getCats };
});
