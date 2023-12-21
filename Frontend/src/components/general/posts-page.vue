<script setup>
import serBar from "../sidebar/ser-bar.vue";
import InputText from "primevue/inputtext";
import ScrollTop from "primevue/scrolltop";
import headerPage from "../layout/header-page.vue";
import footerPage from "../layout/footer-page.vue";
import questionsPopular from "../sidebar/questions-popular";
import { articlesStore } from "@/stores/articles.store";
import { useRouter } from "vue-router";
const useArticles = articlesStore();
const router = useRouter();
const runStore = async () => {
  await useArticles.getArticlePost();
  document.title = "Posts";
};
runStore();

const gotoDetails = (value) => {
  router.push({ name: "detail", params: { id: value } });
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
                v-model="useArticles.search_posts"
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

        <div v-if="useArticles.filterPosts <= 0" style="min-height: 100vh">
          <h4 class="text-secondary text-center mt-5">There's nothing here</h4>
        </div>

        <div v-else class="box-data">
          <div
            class="item-data gap-2"
            v-for="(item, index) in useArticles.filterPosts"
            :key="index"
          >
            <div class="img-item" @click="gotoDetails(item.id)">
              <img :src="item.image" class="img-post" />
            </div>
            <div class="info-item gap-2">
              <h4 class="title-post fw-bold m-0" @click="gotoDetails(item.id)">
                {{ item.title }}
              </h4>

              <p class="subTitle-post text-secondary m-0">
                {{ item.subTitle }}
              </p>

              <div class="related gap-3">
                <div v-if="item.Likes">
                  <i class="pi pi-heart"></i> {{ item.Likes.length }}
                </div>
                <div v-if="item.Comments">
                  <i class="pi pi-comments"></i> {{ item.Comments.length }}
                </div>
                <div class="tag-post text-uppercase">
                  {{ item.category }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- right -->
      <section class="right-content gap-2">
        <serBar />
        <questionsPopular />
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
  height: 100%;
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
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 1px solid gainsboro;
  padding: 10px;
}

/* left-card */
.img-item {
  width: 30%;
  overflow: hidden;
  border-radius: 5px;
}
.img-post {
  object-fit: cover;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
}
.img-post:hover {
  transition: all 0.5s;
  transform: scale(1.05);
}
/* right card */
.info-item {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.tag-post {
  padding: 3px 10px;
  background-color: #eef0e5;
  border-radius: 5px;
  font-size: 0.9em;
}
.title-post:hover {
  cursor: pointer;
  transition: all 0.5s;
  color: #b0926a;
}
.subTitle-post {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  width: 95%;
}

.related {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

@media only screen and (max-width: 992px) {
  .tag-post {
    font-size: 0.8em;
  }
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
  .title-post {
    font-size: 1.1em;
  }
  .subTitle-post {
    font-size: 0.9em;
  }

  .related {
    font-size: 0.8em;
  }
}
</style>
