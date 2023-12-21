import { defineStore } from "pinia";
import { ref } from "vue";
import likesAPI from "@/services/likeAPI";

export const likeStore = defineStore("likes", () => {
  // states

  const likes = ref([]);
  const mess = ref(null);

  // actions
  const onGetLikes = async (id) => {
    try {
      const res = await likesAPI.getLikes(id);
      const { data } = res.data;
      likes.value = data;
    } catch (error) {
      error;
    }
  };
  const onLike = async (id) => {
    try {
      const res = await likesAPI.onLike(id);
      const { message } = res.data;
      console.log(message);
      mess.value = message;
    } catch (error) {
      console.log(error);
    }
  };

  return { likes, onGetLikes, onLike, mess };
});
