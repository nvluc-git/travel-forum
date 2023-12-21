<script setup>
import headerPage from "../layout/header-page.vue";
import { useRoute } from "vue-router";
import { articlesStore } from "../../stores/articles.store.js";
import { cmtsStore } from "../../stores/comments.store";
import { likeStore } from "../../stores/likes.store";
import { bookmarkStore } from "@/stores/bookmark.store";
import { accountsStore } from "@/stores/accounts.store";
import { adminStore } from "@/stores/admin.store";
import * as yup from "yup";
import { Field, Form, ErrorMessage } from "vee-validate";
import Toast from "primevue/toast";
import Dialog from "primevue/dialog";
import ScrollTop from "primevue/scrolltop";
import { useToast } from "primevue/usetoast";
import router from "@/routers";
import { onBeforeRouteUpdate } from "vue-router";
import { ref } from "vue";
const toast = useToast();
const useArticles = articlesStore();
const useCmts = cmtsStore();
const useLike = likeStore();
const useBookMark = bookmarkStore();
const useAcc = accountsStore();
const useAdmin = adminStore();
const route = useRoute();
const id = route.params.id;

const runStore = async () => {
  await useArticles.onGetOne(id);
  await useAcc.getAccounts();
  const userId = useArticles.article.userId;
  await useArticles.articleUser(id, userId);
  const articleId = useArticles.article.id;
  const cate = useArticles.article.category;
  await useArticles.articleRelated(cate, articleId);
  await useCmts.onGetCmts(id);
  await useLike.onGetLikes(id);
  await useBookMark.onGetBookmark();
  document.title = useArticles.article.title;
};
runStore();

const newComment = yup.object().shape({
  contentCmt: yup
    .string()
    .required("content cannot be empty")
    .min(5, "content must be at least 5 characters"),
});

const newCmt = async (values, { resetForm }) => {
  const articleId = useArticles.article.id;
  await useCmts.onNewComment(articleId, values);
  if (useCmts.checkData === true) {
    toast.add({
      severity: "success",
      detail: useCmts.mess,
      life: 3000,
    });
  }
  resetForm();
  await useCmts.onGetCmts(id);
};

const onReaction = async (id) => {
  await useLike.onLike(id);

  toast.add({
    severity: "success",
    detail: useLike.mess,
    life: 3000,
  });
  await useLike.onGetLikes(id);
  await useArticles.onGetOne(id);
};

const onBookmark = async (id) => {
  await useBookMark.actionBookmark(id);

  toast.add({
    severity: "success",
    detail: useBookMark.mess,
    life: 3000,
  });

  await useArticles.onGetOne(id);
};

const delete_cmt = async (id) => {
  await useCmts.onDeleteCmt(id);
  if (useCmts.checkData === true) {
    toast.add({
      severity: "success",
      detail: useCmts.mess,
      life: 3000,
    });
  }
  const articleId = useArticles.article.id;
  await useCmts.onGetCmts(articleId);
};

const goToUser = (value) => {
  router.push({ name: "personal", params: { id: value } });
};
const goToDetail = (value) => {
  router.push({ name: "detail", params: { id: value } });
};

const rpLog = ref(false);

const rp_article = async () => {
  const id = useArticles.article.id;
  await useAcc.reportArticle(id);

  if (useAcc.checkData === true) {
    toast.add({
      severity: "success",
      detail: useAcc.mess,
      life: 3000,
    });
  }
  rpLog.value = false;
};

const userLikeLog = ref(false);

const removeLog = ref(false);
const remove_Article = async () => {
  const id = useArticles.article.id;
  await useAdmin.remove_article(id);
  if (useAdmin.checkData === true) {
    toast.add({
      severity: "success",
      detail: useAdmin.mess,
      life: 3000,
    });
  }
  removeLog.value = false;
  router.push({ name: "home" });
};

const on_hide = ref(false);
const onHide = () => {};

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    await useArticles.onGetOne(to.params.id);
    await useAcc.getAccounts();
    const userId = useArticles.article.userId;
    await useArticles.articleUser(to.params.id, userId);
    const articleId = useArticles.article.id;
    const cate = useArticles.article.category;
    await useArticles.articleRelated(cate, articleId);
    await useCmts.onGetCmts(to.params.id);
    await useLike.onGetLikes(to.params.id);
    await useBookMark.onGetBookmark();
    document.title = useArticles.article.title;
  }
});
</script>
<template>
  <div class="bg-body">
    <Toast position="top-right" />

    <section>
      <!-- report -->
      <Dialog
        v-model:visible="rpLog"
        modal
        header="Report article"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <div>
          You find this article violates the terms of use and want to report it?
        </div>
        <template #footer>
          <button class="btn btn-primary me-2" @click="rp_article()">
            Confirm
          </button>
          <button class="btn btn-secondary" @click="rpLog = false">
            Cancel
          </button>
        </template>
      </Dialog>
      <!-- remove -->
      <Dialog
        v-model:visible="removeLog"
        modal
        header="Report article"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <div>
          You find this article violates the terms of use and want to report it?
        </div>
        <template #footer>
          <button class="btn btn-primary me-2" @click="remove_Article()">
            Confirm
          </button>
          <button class="btn btn-secondary" @click="removeLog = false">
            Cancel
          </button>
        </template>
      </Dialog>
      <!-- view user like -->
      <Dialog
        v-model:visible="userLikeLog"
        modal
        header="Users liked"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <div
          class="d-flex flex-column justify-content-start align-items-start gap-4"
        >
          <div
            v-for="(item, index) in useLike.likes"
            :key="index"
            class="d-flex justify-content-start align-items-center gap-2"
          >
            <img :src="item.avatarUser" class="avatar-userLike" />
            <span @click="goToUser(item.userId)" class="my-hv">{{
              item.user
            }}</span>
          </div>
        </div>
      </Dialog>
    </section>
    <headerPage />
    <div class="container pb-5 pt-5" style="overflow: hidden">
      <!-- post details -->
      <section @click="onHide()">hello</section>
      <section v-if="on_hide === true" class="post-detail">
        <h1 class="title-post fw-bold">{{ useArticles.article.title }}</h1>
        <p>{{ useArticles.article.subTitle }}</p>
        <div
          class="text-center img-post"
          v-if="useArticles.article.type === 'Post'"
        >
          <img :src="useArticles.article.image" class="item-img" />
        </div>
        <p class="content-post mt-2" v-html="useArticles.article.content"></p>

        <div class="footer-post">
          <div
            class="col d-flex justify-content-start align-items-center gap-2"
          >
            <div class="tag text-nowrap">
              {{ useArticles.article.createdAt }}
            </div>
            <div class="tag text-nowrap" v-if="useArticles.article.accountData">
              by {{ useArticles.article.user }}
            </div>
            <div class="tag text-nowrap">
              {{ useArticles.article.category }}
            </div>
            <div class="tag text-nowrap">{{ useArticles.article.type }}</div>
          </div>

          <div class="col d-flex justify-content-end align-items-center gap-4">
            <div class="d-flex justify-content-start align-items-center gap-1">
              <span
                @click="onReaction(useArticles.article.id)"
                class="btn-like"
              >
                <i :class="useArticles.isShowLike"></i>
              </span>
              <span
                v-tooltip.bottom="'users liked...'"
                class="btn-like"
                @click="userLikeLog = true"
                >{{ useLike.likes.length }}</span
              >
            </div>
            <span v-tooltip.bottom="'comments'">
              <a href="#comments" class="btn-like">
                <i class="pi pi-comments"></i>
                {{ useCmts.comments.length }}
              </a>
            </span>

            <span
              @click="onBookmark(useArticles.article.id)"
              class="btn-like"
              v-tooltip.bottom="'bookmark this article'"
            >
              <i :class="useArticles.isShowBm"></i>
            </span>

            <span
              v-if="useAcc.currentUser.role === 'User'"
              class="btn-like"
              v-tooltip.bottom="'report this article'"
              @click="rpLog = true"
            >
              <i class="pi pi-flag"></i>
            </span>
            <span
              v-if="useAcc.currentUser.role === 'Admin'"
              class="btn-like"
              v-tooltip.bottom="'delete this article'"
              @click="removeLog = true"
            >
              <i class="pi pi-trash"></i>
            </span>
          </div>
        </div>
      </section>

      <div v-if="useArticles.article.type === 'Post'" class="mt-5">
        <!--related -->
        <section>
          <h4 class="text-primary">Related</h4>
          <div>
            <div
              v-if="useArticles.relatedArticle <= 0"
              class="text-center text-secondary"
            >
              <span>There are no related posts yet</span>
            </div>
            <div
              v-else
              class="d-flex justify-content-start align-items-start flex-wrap gap-5 card-below"
            >
              <div
                class="card article-user"
                v-for="(item, index) in useArticles.relatedArticle"
                :key="index"
              >
                <img
                  :src="item.image"
                  class="card-img-top"
                  style="height: 200px"
                />
                <div class="card-body">
                  <h5
                    class="card-title my-hv text-truncate"
                    @click="goToDetail(item.id)"
                  >
                    {{ item.title }}
                  </h5>
                  <div
                    class="d-flex justify-content-start align-items-center gap-2 mt-2"
                  >
                    <span class="tag">{{ item.createdAt }}</span>
                    <span class="tag">{{ item.category }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- by user -->
        <section class="mt-5">
          <h4 class="text-primary">
            <span
              @click="goToUser(useArticles.article.accountData.id)"
              style="cursor: pointer"
            >
              More form {{ useArticles.article.user }}</span
            >
          </h4>
          <div>
            <div
              v-if="useArticles.articleByUser <= 0"
              class="text-center text-secondary"
            >
              <span>{{ useArticles.article.user }} has no posts yet</span>
            </div>
            <div
              v-else
              class="d-flex justify-content-start align-items-start flex-wrap gap-5 card-below"
            >
              <div
                class="card article-user"
                v-for="(item, index) in useArticles.articleByUser"
                :key="index"
              >
                <img
                  :src="item.image"
                  class="card-img-top"
                  style="height: 200px"
                />
                <div class="card-body">
                  <h5
                    class="card-title my-hv text-truncate"
                    @click="goToDetail(item.id)"
                  >
                    {{ item.title }}
                  </h5>
                  <div
                    class="d-flex justify-content-start align-items-center gap-2 mt-2"
                  >
                    <span class="tag">{{ item.createdAt }}</span>
                    <span class="tag">{{ item.category }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <!-- comments -->
      <section class="mt-5" id="comments">
        <h4 class="text-primary">Comments</h4>
        <div class="mt-2 new-comment">
          <div class="mb-2">Leave a comment</div>
          <Form
            :validation-schema="newComment"
            @submit="newCmt"
            v-slot="{ isSubmitting }"
          >
            <Field id="contentCmt" name="contentCmt" v-slot="{ field }">
              <textarea
                v-bind="field"
                type="text"
                class="form-control"
                style="min-height: 100px"
                placeholder="write your response..."
              ></textarea>
            </Field>
            <ErrorMessage name="contentCmt" class="err-mess" />
            <div class="text-end mt-2">
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="isSubmitting"
              >
                <span
                  v-show="isSubmitting"
                  class="spinner-border spinner-border-sm mr-1"
                ></span>
                Add comment
              </button>
            </div>
          </Form>
        </div>
        <!-- view cmts -->
        <div class="list-comment mt-5">
          <div class="text-center" v-if="useCmts.comments <= 0">
            <span class="text-secondary mt-2">There are no comments yet</span>
          </div>
          <div v-else>
            <div
              class="cmt"
              v-for="(item, index) in useCmts.comments"
              :key="index"
            >
              <div class="info-user">
                <img :src="item.avatar" class="avatar-user" />
                <span class="my-hv ms-1" @click="goToUser(item.userId)">{{
                  item.user
                }}</span>
              </div>
              <p class="fs-5 mt-2 lh-base">{{ item.content }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <span class="a">{{ item.createdAt }}</span>
                <span
                  v-if="useAcc.currentUser.id === item.userId"
                  @click="delete_cmt(item.id)"
                  class="btn-like"
                >
                  <i class="pi pi-trash"></i
                ></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <ScrollTop />
  </div>
</template>

<style scoped>
.err-mess {
  color: red;
}
.content-post {
  line-height: 30px;
}
.title-post {
  text-transform: capitalize;
  font-size: 3em;
}

.img-post {
  border-radius: 5px;
  overflow: hidden;
}
.item-img {
  width: 100%;
  border-radius: 5px;
  object-fit: cover;
}
.footer-post {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-top: 1px solid gainsboro;
  border-bottom: 1px solid gainsboro;
}
.cmt {
  padding: 10px 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.btn-like {
  color: black;
  text-decoration: none;
}
.btn-like:hover {
  color: #0766ad;
  cursor: pointer;
  transition: all 0.5s;
}
.a {
  font-size: 0.8em;
  color: grey;
}
.tag {
  background-color: #eef0e5;
  padding: 3px 10px;
  border-radius: 5px;
  font-size: 0.9em;
  cursor: default;
}
.new-comment {
  border-radius: 5px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.avatar-user {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  object-fit: cover;
}
.article-user {
  width: 300px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.my-hv:hover {
  color: #0766ad;
  cursor: pointer;
  text-decoration: underline;
}
.avatar-userLike {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
}
@media only screen and (max-width: 1400px) {
  .article-user {
    width: 250px;
  }
  .article-user > img {
    height: 150px !important;
  }
}
@media only screen and (max-width: 1200px) {
  .article-user {
    width: 210px;
  }
  .article-user > img {
    height: 150px !important;
  }
}
@media only screen and (max-width: 992px) {
  .article-user {
    width: 330px;
  }
  .article-user > img {
    height: 200px !important;
  }
}
@media only screen and (max-width: 768px) {
  .title-post {
    font-size: 1.9em;
    font-weight: bold;
  }
  .article-user {
    width: 240px;
  }
  .article-user > img {
    height: 150px !important;
  }
}
@media only screen and (max-width: 576px) {
  .title-post {
    font-size: 2em;
    font-weight: bold;
  }
  .footer-post {
    flex-direction: column !important;
    align-items: flex-start !important;
  }
  .card-below {
    justify-content: center !important;
  }
  .article-user {
    width: 200px;
  }
  .article-user > img {
    height: 150px !important;
  }
}

@media only screen and (max-width: 465px) {
  .title-post {
    font-size: 1.9em;
    font-weight: bold;
  }
  .article-user {
    width: 300px;
  }
  .article-user > img {
    height: 150px !important;
  }
}
</style>
