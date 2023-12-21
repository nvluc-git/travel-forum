<script setup>
import { useRouter } from "vue-router";
import { articlesStore } from "@/stores/articles.store";
const router = useRouter();
const useArticles = articlesStore();
const runStore = async () => {
  await useArticles.getArticleQuestion();
};
runStore();
const goToUser = (value) => {
  router.push({ name: "personal", params: { id: value } });
};
const goToDetail = (value) => {
  router.push({ name: "personal", params: { id: value } });
};
const goToMore = (value) => {
  router.push({ name: value });
};
</script>

<template>
  <div class="side-bar">
    <h4 class="title-side">Popular questions</h4>
    <div>
      <div v-if="useArticles.questions_popular <= 0">cc</div>
      <div v-else class="mt-3">
        <div
          v-for="(item, index) in useArticles.questions_popular"
          :key="index"
          class="d-flex justify-content-start align-items-start gap-2 pb-2 mb-2"
          style="border-bottom: 1px solid gainsboro"
        >
          <img :src="item.avatar" class="img-art" />
          <div
            class="d-flex flex-column justify-content-start align-items-start"
          >
            <span class="my-hv title-art" @click="goToDetail(item.id)">{{
              item.title
            }}</span>
            <span class="my-hv user-art" @click="goToUser(item.userId)"
              >by {{ item.user }}</span
            >
          </div>
        </div>
        <button
          class="btn btn-sm btn-outline-primary"
          @click="goToMore('questions')"
        >
          See more
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.side-bar {
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
.title-side {
  font-weight: bold;
  text-transform: capitalize;
}
.img-art {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.my-hv:hover {
  cursor: pointer;
  transition: all 0, 5s;
  color: #0766ad;
}
.user-art {
  font-size: 0.9em;
  color: grey;
}
</style>
