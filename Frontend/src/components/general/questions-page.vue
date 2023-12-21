<script setup>
import postsPopular from "../sidebar/posts-popular.vue";
import serBar from "../sidebar/ser-bar.vue";
import InputText from "primevue/inputtext";
import ScrollTop from "primevue/scrolltop";
import headerPage from "../layout/header-page.vue";
import footerPage from "../layout/footer-page.vue";
import { articlesStore } from "@/stores/articles.store";
import { useRouter } from "vue-router";
const useArticles = articlesStore();
const router = useRouter();
const runStore = async () => {
  await useArticles.getArticleQuestion();
  document.title = "Questions";
};
runStore();

const gotoDetails = (value) => {
  router.push({ name: "detail", params: { id: value } });
};
const gotoUser = (value) => {
  router.push({ name: "personal", params: { id: value } });
};
</script>

<template>
  <div class="bg-body-secondary">
    <headerPage />
    <div class="container box-content">
      <section class="left-content bg-body">
        <div class="actions-data">
          <div>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="useArticles.search_questions"
                placeholder="Search"
                class="search-post"
              />
            </span>
          </div>
          <div>
            <select v-model="useArticles.selected" class="form-select">
              <option
                v-for="(option, index) in useArticles.options"
                :key="index"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>

        <div v-if="useArticles.filterQuestions <= 0" style="min-height: 100vh">
          <h4 class="text-secondary text-center mt-5">There's nothing here</h4>
        </div>

        <div v-else class="box-data">
          <div
            class="item-data gap-2"
            v-for="(item, index) in useArticles.filterQuestions"
            :key="index"
          >
            <div class="user-info">
              <img :src="item.avatar" class="avatar-user" />
              <span @click="gotoUser(item.userId)" class="username">{{
                item.user
              }}</span>
            </div>
            <h4 @click="gotoDetails(item.id)" class="title-post">
              {{ item.title }}
            </h4>

            <div class="reactions gap-3">
              <span v-if="item.Likes">
                <i class="pi pi-heart"></i> {{ item.Likes.length }}
              </span>
              <span v-if="item.Comments">
                <i class="pi pi-comments"></i> {{ item.Comments.length }}
              </span>
              <span class="tag-post">{{ item.createdAt }}</span>
              <span class="tag-post">{{ item.category }}</span>
            </div>
          </div>
        </div>
      </section>
      <!-- right -->
      <section class="right-content gap-2">
        <serBar />
        <postsPopular />
      </section>
    </div>
    <footerPage />
    <ScrollTop />
  </div>
</template>

<style scoped>
.box-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
}
.actions-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.left-content {
  width: 65%;
  overflow: hidden;
  border-radius: 5px;
}
.right-content {
  width: 34%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
/* box card */
.box-data {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 100vh;
}

/* card */
.item-data {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid gainsboro;
  padding: 10px;
  width: 100%;
}

.user-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.avatar-user {
  height: 25px;
  width: 25px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 5px;
}
.username:hover {
  transition: all 0.5s;
  cursor: pointer;
  color: aqua;
}

.tag-post {
  padding: 0 10px;
  margin-bottom: 5px;
  background-color: #eef0e5;
  border-radius: 5px;
  font-size: 0.9em;
}
.title-post:hover {
  cursor: pointer;
  transition: all 0.5s;
  color: blue;
}

.related,
.reactions {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

@media only screen and (max-width: 768px) {
  .right-content {
    display: none;
  }
  .left-content {
    width: 100%;
  }
}

@media only screen and (max-width: 576px) {
  .search-post {
    width: 180px;
  }
}
</style>
