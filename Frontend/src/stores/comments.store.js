import { defineStore } from "pinia";
import { ref } from "vue";
import cmtsAPI from "@/services/commentAPI";

export const cmtsStore = defineStore("comments", () => {
  // states

  const comments = ref([]);
  const mess = ref("");
  const checkData = ref(false);
  // actions
  const onGetCmts = async (id) => {
    try {
      const res = await cmtsAPI.getCmt(id);
      const { data } = res.data;
      comments.value = data;
    } catch (error) {
      error;
    }
  };
  const onNewComment = async (articleId, contentCmt) => {
    try {
      const res = await cmtsAPI.newComment(articleId, contentCmt);
      const { message, data } = res.data;
      checkData.value = data;
      mess.value = message;
    } catch (error) {
      console.log(error);
    }
  };
  const onDeleteCmt = async (id) => {
    try {
      const res = await cmtsAPI.deleteComment(id);
      const { message, data } = res.data;
      checkData.value = data;
      mess.value = message;
    } catch (error) {
      console.log(error);
    }
  };

  return { comments, onGetCmts, onNewComment, mess, checkData, onDeleteCmt };
});
