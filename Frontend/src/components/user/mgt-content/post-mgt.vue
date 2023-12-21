<script setup>
import Dialog from "primevue/dialog";
import Editor from "primevue/editor";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import InputText from "primevue/inputtext";

import * as yup from "yup";
import { Field, Form, ErrorMessage } from "vee-validate";
import { ref } from "vue";

import { articlesStore } from "@/stores/articles.store";
import { categoriesStore } from "@/stores/categories.store";
import { typesStore } from "@/stores/type.store";

const newArticle = yup.object().shape({
  title: yup.string().required().min(15).max(50),
  subTitle: yup.string().required().min(15),
  content: yup.string().required().min(15),
  typeId: yup.string().required(),
  categoryId: yup.number().required(),
  image: yup.string().required(),
});

const updateArticle = yup.object().shape({
  title: yup.string().required().min(15).max(50),
  subTitle: yup.string().required().min(15),
  content: yup.string().required().min(15),
  typeId: yup.string().required(),
  categoryId: yup.number().required(),
  image: yup.string(),
});
const useArticles = articlesStore();
const useCats = categoriesStore();
const useTypes = typesStore();
const toast = useToast();
const runStore = async () => {
  await useCats.getCats();
  await useTypes.getTypes();
  await useArticles.onGetPostUser();
};
runStore();
const visible = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
// update
const getOneArticle = async (id) => {
  await useArticles.onGetOne(id);
  visible.value = true;
};

const update_Article = async (values) => {
  console.log(values);
  await useArticles.updateData(values);
  visible.value = false;
  if (useArticles.mess === "Updated successfully") {
    toast.add({
      severity: "success",
      detail: useArticles.mess,
      life: 3000,
    });
  }
  await useArticles.onGetPostUser();
};
//  delete
const getOneArticle2 = async (id) => {
  await useArticles.onGetOne(id);
  visible2.value = true;
};

const delete_Article = async (id) => {
  console.log(id);
  await useArticles.deleteData(id);
  visible2.value = false;
  if (useArticles.mess === "Deleted successfully") {
    toast.add({
      severity: "success",
      detail: useArticles.mess,
      life: 3000,
    });
  }
  await useArticles.onGetPostUser();
};

const showImg = (e) => {
  const file = e.target.files[0];
  useArticles.currentValue.image = URL.createObjectURL(file);
};

// create
const newImg = ref(null);
const showImgCreate = (e) => {
  const file = e.target.files[0];
  newImg.value = URL.createObjectURL(file);
};
const new_Article = async (values) => {
  await useArticles.onNewData(values);

  if (useArticles.mess === "Added successfully")
    toast.add({
      severity: "success",
      detail: "New article added successfully",
      life: 3000,
    });
  visible3.value = false;
  newImg.value = null;
  await useArticles.onGetPostUser();
};
</script>

<template>
  <Toast position="top-right" />

  <div class="container pb-5 pt-5">
    <h1 class="text-dark">Post Management</h1>

    <div class="mb-5 mt-5 actions-bar">
      <div>
        <span class="p-input-icon-left">
          <i class="pi pi-search"></i>
          <InputText
            placeholder="Search"
            name="search"
            id="search"
            v-model="useArticles.search_PostUser"
          />
        </span>
        <button
          class="btn btn-primary ms-2 btn-newData"
          @click="visible3 = true"
        >
          New post <i class="bi bi-vector-pen"></i>
        </button>
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
    <div
      v-if="useArticles.articlePostUser <= 0"
      class="text-secondary text-center"
      style="height: 100vh"
    >
      There is nothing here.
    </div>
    <div class="box-post gap-5 flex-wrap">
      <div
        class="card item-post"
        v-for="(item, index) in useArticles.searchPostUser"
        :key="index"
      >
        <img :src="item.image" class="card-img-top" style="height: 250px" />
        <div class="card-body">
          <h6 class="text-uppercase text-primary">
            {{ item.category }}
          </h6>
          <h4 class="card-title fw-bold text-truncate">
            {{ item.title }}
          </h4>
          <p class="text-body-emphasis sub-title">{{ item.subTitle }}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="tag text-secondary">Created {{ item.createdAt }}</span>
            <span class="tag text-secondary">Updated {{ item.updatedAt }}</span>
          </div>
        </div>
        <div
          class="d-flex justify-content-between align-items-center gap-2 p-2"
          style="border-radius: 0 0 5px 5px; border-top: 1px solid gainsboro"
        >
          <button
            class="btn btn-sm btn-primary w-100"
            @click="getOneArticle(item.id)"
          >
            <i class="bi bi-pencil-square"></i> update
          </button>
          <button
            class="btn btn-sm btn-danger w-100"
            @click="getOneArticle2(item.id)"
          >
            <i class="bi bi-trash2"></i> delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- update -->
  <section>
    <Dialog
      v-model:visible="visible"
      modal
      :style="{ width: '70%' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <template #header>
        <h1>Update Post</h1>
      </template>
      <div>
        <Form
          :validation-schema="updateArticle"
          @submit="update_Article"
          v-slot="{ isSubmitting }"
        >
          <Field
            type="text"
            name="articleId"
            disabled
            :value="useArticles.currentValue.articleId"
            style="display: none"
          />
          <div class="mb-4">
            <h6>Title</h6>

            <Field
              type="text"
              class="form-control"
              name="title"
              :value="useArticles.currentValue.title"
            />

            <ErrorMessage class="err-mess" name="title" />
          </div>

          <div class="mb-4">
            <h6>Subtitle</h6>
            <Field
              type="text"
              name="subTitle"
              v-slot="{ field }"
              :value="useArticles.currentValue.subTitle"
            >
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
            <Field
              name="typeId"
              as="select"
              class="form-select"
              :value="useArticles.currentValue.typeId"
            >
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
            <Field
              name="categoryId"
              :value="useArticles.currentValue.categoryId"
              as="select"
              class="form-select"
            >
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

          <div class="mb-4" style="overflow: hidden">
            <h6>Image</h6>
            <div class="text-center mt-2 mb-2">
              <img
                :src="useArticles.currentValue.image"
                style="height: 450px; border-radius: 5px"
              />
            </div>
            <Field type="file" name="image" id="myImg" @change="showImg" />

            <ErrorMessage class="err-mess mt-2" name="image" />
          </div>

          <div class="mb-4">
            <h6>Content</h6>
            <Field
              type="text"
              name="content"
              v-slot="{ field }"
              :value="useArticles.currentValue.content"
            >
              <Editor
                v-bind="field"
                editorStyle="height: 320px"
                id="content"
                :model-value="useArticles.currentValue.content"
              >
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

            <ErrorMessage class="err-mess mt-2" name="content" />
          </div>
          <div class="d-flex justify-content-center align-items-center gap-5">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="isSubmitting"
            >
              <span
                v-show="isSubmitting"
                class="spinner-border spinner-border-sm mr-1"
              ></span>
              Update
            </button>
            <button class="btn btn-secondary" @click="visible = false">
              Cancel
            </button>
          </div>
        </Form>
      </div>
      <template #footer> </template>
    </Dialog>
  </section>
  <!-- delete -->
  <section>
    <Dialog
      v-model:visible="visible2"
      modal
      header="Delete Post"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div>
        <h6>
          Are you sure you want to delete this post?
          <span class="fw-bold text-info">
            {{ useArticles.article.title }}</span
          >
        </h6>
      </div>
      <template #footer>
        <div>
          <button
            class="btn btn-sm btn-danger me-3"
            @click="delete_Article(useArticles.article.id)"
          >
            Delete
          </button>
          <button class="btn btn-sm btn-secondary" @click="visible2 = false">
            Cancel
          </button>
        </div>
      </template>
    </Dialog>
  </section>
  <!-- create -->
  <section>
    <Dialog
      v-model:visible="visible3"
      modal
      header="New Article"
      :style="{ width: '70%' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <Toast position="top-right" />
      <div class="container">
        <Form
          :validation-schema="newArticle"
          @submit="new_Article"
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

          <div class="mb-4" style="display: none">
            <h6>Type</h6>
            <Field name="typeId" class="form-select" value="1" />
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
            <div class="mb-2 text-center" v-if="newImg">
              <img :src="newImg" style="height: 450px; border-radius: 5px" />
            </div>

            <Field
              type="file"
              class="form-control"
              name="image"
              id="myImg"
              @change="showImgCreate"
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
      <template #footer> </template>
    </Dialog>
  </section>
</template>

<style scoped>
.err-mess {
  color: red;
  font-size: 0.9em;
}
.sub-title {
  overflow: hidden;
  display: -webkit-box;
  /* display 2 lines only */
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.tag {
  font-size: 0.9em;
}
.actions-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-post {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.item-post {
  width: 410px;
}
@media only screen and (max-width: 1400px) {
  .item-post {
    width: 350px;
  }
}
@media only screen and (max-width: 1200px) {
  .item-post {
    width: 450px;
  }
}

@media only screen and (max-width: 992px) {
  .item-post {
    width: 330px;
  }
}
@media only screen and (max-width: 768px) {
  .actions-bar {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
  .btn-newData {
    margin: 10px 0;
  }
  .item-post {
    width: 100%;
  }
}
</style>
