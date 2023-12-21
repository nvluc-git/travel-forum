<script setup>
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import { bookmarkStore } from "@/stores/bookmark.store";
import router from "@/routers";
import { ref } from "vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const useBookmark = bookmarkStore();

const runStore = async () => {
  await useBookmark.onGetBookmark();
};
runStore();

const visible = ref(false);

const onGo = (id) => {
  router.push({ name: "detail", params: { id: id } });
};

const actionBm = async (articleId) => {
  await useBookmark.actionBookmark(articleId);
  visible.value = false;
  toast.add({
    severity: "success",
    detail: "Removed the article from the list successfully",
    life: 3000,
  });
  await useBookmark.onGetBookmark();
};
</script>

<template>
  <div class="container">
    <Toast />
    <h1 class="text-dark mt-5 mb-2">Bookmark Management</h1>
    <div class="mb-5 mt-5">
      <span class="p-input-icon-left">
        <i class="pi pi-search"></i>
        <InputText
          placeholder="Search"
          id="search"
          name="search"
          v-model="useBookmark.searchArticle"
        />
      </span>
    </div>

    <div
      v-if="useBookmark.searchArticles <= 0"
      class="text-secondary text-center"
      style="height: 100vh"
    >
      There is nothing here.
    </div>

    <div
      v-else
      class="d-flex justify-content-start align-items-start flex-wrap gap-5 box-card"
    >
      <div
        class="card item-card"
        v-for="(item, index) in useBookmark.searchArticles"
        :key="index"
      >
        <img :src="item.image" class="card-img-top" style="height: 200px" />
        <div class="card-body">
          <p class="card-title text-truncate text-capitalize">
            {{ item.title }}
          </p>

          <div class="d-flex justify-content-between align-items-center gap-2">
            <button
              class="btn btn-primary btn-sm w-100"
              @click="onGo(item.idArticle)"
            >
              See more
            </button>
            <button class="btn btn-danger btn-sm w-100" @click="visible = true">
              Remove
            </button>
            <Dialog
              v-model:visible="visible"
              modal
              header="Remove article"
              :style="{ width: '50rem' }"
              :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            >
              <div>
                <p>
                  Are you sure you want to remove this article from your
                  bookmarks list?
                </p>
              </div>
              <template #footer>
                <button
                  class="btn btn-danger"
                  @click="actionBm(item.idArticle)"
                >
                  Remove
                </button>
                <button class="ms-2 btn btn-secondary" @click="visible = false">
                  Cancel
                </button>
              </template>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-card {
  width: 300px;
}
@media only screen and (max-width: 1400px) {
  .item-card {
    width: 350px;
  }
}
@media only screen and (max-width: 1200px) {
  .item-card {
    width: 290px;
  }
}

@media only screen and (max-width: 992px) {
  .item-card {
    width: 320px;
  }
}
@media only screen and (max-width: 768px) {
  .item-card {
    width: 240px;
  }
}
@media only screen and (max-width: 576px) {
  .box-card {
    flex-direction: column !important;
    align-items: center !important;
  }
  .item-card {
    width: 350px;
  }
}
</style>
