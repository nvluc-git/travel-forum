<script setup>
import Sidebar from "primevue/sidebar";
import Dialog from "primevue/dialog";
import * as yup from "yup";
import { Field, Form, ErrorMessage } from "vee-validate";
import Editor from "primevue/editor";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { categoriesStore } from "@/stores/categories.store";
import { typesStore } from "@/stores/type.store";
import { articlesStore } from "@/stores/articles.store";
import { useAuthenStore } from "@/stores/authen.store";
import { accountsStore } from "@/stores/accounts.store";
import { NotiStore } from "@/stores/notis.store";
import { ref } from "vue";
import router from "@/routers";
const useAuthen = useAuthenStore();
const useCats = categoriesStore();
const useTypes = typesStore();
const useArticles = articlesStore();
const useAccount = accountsStore();
const useNoti = NotiStore();
const toast = useToast();

const runStore = async () => {
  await useCats.getCats();
  await useTypes.getTypes();
  await useArticles.onGetAll();
  await useAccount.getAccounts();
  await useNoti.onGetNoti(useAccount.currentUser.id);
};
runStore();
const personalPage = () => {
  router.push({ name: "personal", params: { id: useAccount.currentUser.id } });
};
const contentPage = () => {
  router.push({ name: "content" });
};
const accountPage = () => {
  router.push({ name: "account" });
};
const adminPage = () => {
  router.push({ name: "admin" });
};

const onGoTo = (values) => {
  router.push({ name: values });
};
const visible = ref(false);
const menuBar = ref(false);
const newArticleLog = ref(false);

const newArticle = yup.object().shape({
  title: yup.string().required().min(15).max(50),
  subTitle: yup.string().required().min(15),
  content: yup.string().required().min(15),
  typeId: yup.string().required(),
  categoryId: yup.number().required(),
  image: yup.string().required(),
});
const newImg = ref(null);
const showImg = (e) => {
  const file = e.target.files[0];
  newImg.value = URL.createObjectURL(file);
};

const new_article = async (values) => {
  await useArticles.onNewData(values);
  newArticleLog.value = false;

  if (useArticles.mess) {
    toast.add({
      severity: "success",
      detail: useArticles.mess,
      life: 3000,
    });
  }
  newImg.value = null;

  await useArticles.onGetAll();
  await useArticles.getArticlePost();
  await useArticles.getArticleQuestion();
};
</script>

<template>
  <div>
    <Sidebar v-model:visible="menuBar">
      <div class="d-flex justify-content-start align-items-center mb-3">
        <img
          src="../../assets/imgs/logo.png"
          style="width: 45px; height: 45px"
        />
        <div class="logo-text text-nowrap">VIVU</div>
      </div>
      <div
        class="d-flex flex-column justify-content-between align-items-start gap-2"
      >
        <button class="item-link" @click="onGoTo('home')">Home</button>
        <button class="item-link" @click="onGoTo('posts')">Posts</button>
        <button class="item-link" @click="onGoTo('questions')">
          Questions
        </button>
        <button class="item-link" @click="onGoTo('services')">Services</button>
      </div>
    </Sidebar>

    <nav class="navbar bg-body" style="border-bottom: 1px solid gainsboro">
      <div class="container d-flex justify-content-between align-items-center">
        <button class="my-sideBar m-0 p-0" @click="menuBar = true">
          <i class="pi pi-bars" style="font-size: 1.5em"></i>
        </button>
        <!-- left nav -->
        <div class="left-nav">
          <router-link :to="{ name: 'home' }" style="text-decoration: none">
            <div class="d-flex justify-content-start align-items-center">
              <img
                src="../../assets/imgs/logo.png"
                style="width: 45px; height: 45px"
              />
              <div class="logo-text text-nowrap">VIVU</div>
            </div></router-link
          >
        </div>

        <!-- right nav -->
        <div class="d-flex justify-content-end align-items-center gap-3">
          <!-- links -->
          <div
            class="d-flex justify-content-between align-items-center gap-3 my-links"
          >
            <button class="navLink" @click="onGoTo('posts')">Posts</button>
            <button class="navLink" @click="onGoTo('questions')">
              Questions
            </button>
          </div>
          <!-- actions -->
          <div class="d-flex justify-content-between align-items-center gap-5">
            <button class="btn-icon" @click="visible = true">
              <i class="bi bi-search icon-search"></i>
            </button>

            <button class="btn-icon" @click="newArticleLog = true">
              <i class="bi bi-pen-fill"></i>
            </button>

            <div class="dropdown">
              <i
                class="bi bi-bell btn-icon"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                @click="runStore()"
              ></i>

              <div class="dropdown-menu p-1 box-notis">
                <h1>Notifications</h1>
                <div v-if="useNoti.notis <= 0">
                  <div class="text-center mt-5 text-secondary">
                    There is nothing here.
                  </div>
                </div>
                <div class="notis" v-else>
                  <div
                    v-for="(item, index) in useNoti.notis"
                    :key="index"
                    class="notis-item"
                  >
                    <div class="content-noti" v-html="item.content"></div>
                    <div class="date-noti">{{ item.createdAt }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="dropdown">
              <div
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                class="user-cir"
              >
                <img
                  :src="useAccount.currentUser.avatar"
                  style="width: 100%; height: 100%; object-fit: cover"
                />
              </div>

              <div class="dropdown-menu p-1">
                <h6
                  class="p-2 text-center m-0"
                  style="border-bottom: 1px solid gainsboro"
                >
                  {{ useAccount.currentUser.username }}
                </h6>
                <div class="d-flex flex-column">
                  <div>
                    <button @click="personalPage()" class="btn-user">
                      <i class="bi bi-person-fill me-2"></i> Profile
                    </button>
                  </div>
                  <div>
                    <button @click="contentPage()" class="btn-user">
                      <i class="bi bi-postcard-fill me-2"></i> My Content
                    </button>
                  </div>
                  <div>
                    <button @click="accountPage()" class="btn-user">
                      <i class="bi bi-gear-fill me-2"></i> Account
                    </button>
                  </div>

                  <div v-if="useAccount.currentUser.role === 'Admin'">
                    <button @click="adminPage()" class="btn-user">
                      <i class="bi bi-person-vcard-fill me-2"></i> Admin
                    </button>
                  </div>
                </div>
                <div
                  class="text-center"
                  style="border-top: 1px solid gainsboro"
                >
                  <button class="dropdown-item" @click="useAuthen.onSignOut()">
                    <i class="bi bi-box-arrow-in-right"></i> Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- search box -->
    <div class="flex justify-content-center">
      <Dialog
        v-model:visible="visible"
        modal
        header="Seach Articles"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <div class="mt-2">
          <input
            type="search"
            placeholder="Search articles in here..."
            class="form-control"
            v-model="useArticles.searchAll"
          />
        </div>
        <div
          class="d-flex flex-column justify-content-evenly align-items-start"
        >
          <div
            class="mt-3 mb-2 articles"
            v-for="(item, index) in useArticles.searching"
            :key="index"
          >
            <div
              class="col-3 img-article"
              :style="{ backgroundImage: 'url(' + item.image + ')' }"
            ></div>
            <div
              class="col-9 d-flex flex-column justify-content-between align-items-start gap-2 info-article"
            >
              <div
                class="d-flex justify-content-between align-items-center w-100"
              >
                <div class="d-flex justify-content-start align-items-center">
                  <div class="author">by {{ item.user }}</div>
                  <div class="ms-2 me-2">-</div>
                  <div class="createAt">1/1/2023</div>
                </div>
              </div>
              <router-link
                :to="{
                  name: 'detail',
                  params: { id: item.id },
                }"
                class="my-title"
                :title="item.title"
                >{{ item.title }}</router-link
              >
              <div
                class="d-flex justify-content-start align-items-center gap-3"
              >
                <div class="tag">{{ item.category }}</div>
                <div class="tag">{{ item.type }}</div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>

    <!-- new article -->
    <div>
      <Dialog
        v-model:visible="newArticleLog"
        modal
        header="Create new article"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <div>
          <Form
            :validation-schema="newArticle"
            @submit="new_article"
            v-slot="{ isSubmitting }"
          >
            <div class="mb-4">
              <h6>Title</h6>
              <Field type="text" class="form-control" name="title" />
              <ErrorMessage class="err-mess" name="title" />
            </div>

            <div class="mb-4">
              <h6>Subtitle</h6>
              <Field type="text" name="subTitle" v-slot="{ field }">
                <textarea
                  v-bind="field"
                  type="text"
                  class="form-control"
                  id="subTitle"
                  style="min-height: 100px"
                ></textarea>
              </Field>
              <ErrorMessage class="err-mess" name="subTitle" />
            </div>

            <div class="mb-4">
              <h6>Type</h6>
              <Field name="typeId" as="select" class="form-select">
                <option
                  v-for="(item, index) in useTypes.types"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </Field>
              <ErrorMessage class="err-mess" name="typeId" />
            </div>

            <div class="mb-4">
              <h6>Category</h6>
              <Field name="categoryId" as="select" class="form-select">
                <option
                  v-for="(item, index) in useCats.cats"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </Field>
              <ErrorMessage class="err-mess" name="categoryId" />
            </div>

            <div class="mb-4">
              <h6>Image</h6>
              <div
                class="mb-2 text-center"
                v-if="newImg"
                style="overflow: hidden"
              >
                <img :src="newImg" style="height: 350px; border-radius: 5px" />
              </div>

              <Field
                type="file"
                class="form-control"
                name="image"
                id="myImg"
                @change="showImg"
              />
              <ErrorMessage class="err-mess" name="image" />
            </div>

            <div class="mb-4">
              <h6>Content</h6>
              <Field type="text" name="content" v-slot="{ field }">
                <Editor v-bind="field" editorStyle="height: 320px" id="content">
                  <template v-slot:toolbar>
                    <span class="ql-formats">
                      <button class="ql-header" value="1"></button>
                      <button class="ql-header" value="2"></button>
                    </span>

                    <span class="ql-formats">
                      <button class="ql-bold"></button>
                      <button class="ql-italic"></button>
                      <button class="ql-underline"></button>
                    </span>

                    <span class="ql-formats">
                      <select class="ql-color"></select>
                      <select class="ql-background"></select>
                    </span>

                    <span class="ql-formats">
                      <button class="ql-list" value="ordered"></button>
                      <button class="ql-list" value="bullet"></button>
                      <select class="ql-align"></select>
                    </span>

                    <span class="ql-formats">
                      <button class="ql-link"></button>
                    </span>

                    <span class="ql-formats">
                      <select class="ql-font"></select>
                    </span> </template
                ></Editor>
              </Field>

              <ErrorMessage class="err-mess" name="content" />
            </div>
            <button
              type="submit"
              class="btn btn-primary w-100 mt-2"
              :disabled="isSubmitting"
            >
              <span
                v-show="isSubmitting"
                class="spinner-border spinner-border-sm mr-1"
              ></span>
              New Article
            </button>
          </Form>
        </div>
      </Dialog>
    </div>
    <Toast position="top-right" />
  </div>
</template>

<style scoped>
.err-mess {
  color: red;
}
.logo-text {
  font-size: 1.1em;
  font-weight: bold;
  margin-left: 10px;
  color: #27374d;
}
.navLink {
  text-decoration: none;
  color: black;
  font-size: 1em;
  padding: 3px 15px;
  border-radius: 10px;
  transition: background-color 0.5s;
  cursor: pointer;
}
.navLink:hover {
  background: white;
}

.user-cir {
  border-radius: 50%;
  height: 45px;
  width: 45px;
  overflow: hidden;
  /* border: 1px solid gainsboro; */
}

.dropdown-menu[data-bs-popper] {
  right: 0 !important;
  left: unset;
}

.btn-icon {
  border-radius: 50%;
  color: #394867;
  font-size: 1.2em;
  border: none;
  background-color: unset;
}
.navLink {
  border: none;
  background-color: unset;
}
.navLink:hover {
  transition: all 0.5s;
  background-color: gainsboro;
}

/* search box */
.articles {
  border-radius: 5px;
  width: 100%;
  height: 100px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.tag {
  padding: 5px;
  border-radius: 5px;
  background-color: #f1efef;
  color: black;
  font-size: 0.6em;
  text-transform: uppercase;
  cursor: default;
  white-space: nowrap;
}
.my-title {
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: start;
  font-size: 1em;
  font-weight: bold;
  text-transform: capitalize;
  cursor: pointer;
  transition: all 0.5s;
  color: #272829;
  text-decoration: none;
}
.my-title:hover {
  color: #27374d;
}
.info-article {
  padding: 10px;
}
.img-article {
  height: 100%;
  background-position: center;
  background-size: cover;
  border-radius: 5px 0 0 5px;
}
.author {
  font-size: 0.8em;
  color: #116d6e;
}
.createAt {
  font-size: 0.7em;
  color: #61677a;
}
.box-notis {
  width: 350px;
  height: 400px;
  overflow: hidden;
}
.notis {
  width: 100%;
  height: 320px;
  overflow-y: scroll;
  padding: 0 5px;
}

.notis-item {
  width: 100%;
  line-height: 25px;
  text-align: start;
  border-bottom: 1px solid gainsboro;
}

.content-noti {
  font-size: 0.9em;
}
.date-noti {
  font-size: 0.7em;
  color: grey;
}
.btn-user {
  width: 100%;
  border: none;
  background-color: white;
  text-align: start;
  margin: 5px 0;
}
.my-sideBar {
  display: none;
  border: none;
  background-color: unset;
}

.item-link {
  border: none;
  background-color: unset;
  width: 100%;
  cursor: pointer;
  border-radius: 5px;
  text-align: start;
  padding: 5px 0;
}
.item-link:hover {
  color: #116d6e;
}
@media only screen and (max-width: 768px) {
  .my-sideBar {
    display: block;
  }
  .my-links {
    display: none !important;
  }
  .left-nav {
    display: none;
  }
  .box-notis {
    width: 200px;
  }
}
</style>
