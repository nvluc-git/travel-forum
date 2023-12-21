import { defineStore } from "pinia";
import { computed, ref } from "vue";
import bookmarkApi from "@/services/bookmarkAPI";
export const bookmarkStore = defineStore("bookmark", () => {
  // states

  const bookmark = ref([]);
  const searchArticle = ref("");
  const mess = ref(null);
  const checkData = ref(null);
  const searchArticles = computed(() => {
    let forSearch = bookmark.value.filter((s) =>
      s.title.toLowerCase().includes(searchArticle.value.toLowerCase())
    );
    return forSearch;
  });
  // actions
  const onGetBookmark = async () => {
    try {
      const res = await bookmarkApi.getBookmark();
      const { data } = res.data;
      bookmark.value = data;
    } catch (error) {
      error;
    }
  };

  const actionBookmark = async (articleId) => {
    try {
      const res = await bookmarkApi.onBookmark(articleId);
      const { message, data } = res.data;
      checkData.value = data;
      mess.value = message;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    bookmark,
    onGetBookmark,
    actionBookmark,
    searchArticles,
    searchArticle,
    mess,
  };
});
