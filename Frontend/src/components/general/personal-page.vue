<script setup>
import { accountsStore } from "@/stores/accounts.store";
import { useRoute } from "vue-router";
import headerPage from "../layout/header-page.vue";
import ScrollTop from "primevue/scrolltop";
import { onBeforeRouteUpdate } from "vue-router";
import { ref } from "vue";
import Dialog from "primevue/dialog";
import * as yup from "yup";
import { Field, Form, ErrorMessage } from "vee-validate";
const useAccount = accountsStore();
const route = useRoute();
const id = route.params.id;
const runStore = async () => {
  await useAccount.getOneAcc(id);
  document.title = useAccount.userP.username;
};
runStore();

const rpLog = ref(false);
const sendRp = yup.object().shape({
  content: yup.string().required().min(5),
  image: yup.string(),
});

const imgRp = ref(null);
const showImgRp = (e) => {
  const file = e.target.files[0];
  imgRp.value = URL.createObjectURL(file);
};

const send_rp = (values) => {
  console.log(values);
};

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    await useAccount.getOneAcc(to.params.id);
    document.title = useAccount.userP.username;
  }
});
</script>

<template>
  <div class="bg-body" style="height: 100vh; overflow-y: scroll">
    <section>
      <Dialog
        v-model:visible="rpLog"
        modal
        header="Report User"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <div>
          <Form
            :validation-schema="sendRp"
            @submit="send_rp"
            v-slot="{ isSubmitting }"
          >
            <div class="mb-2">
              <label for="content">Content</label>
              <Field id="content" name="content" v-slot="{ field }">
                <textarea
                  v-bind="field"
                  type="text"
                  class="form-control"
                  id="content"
                  style="min-height: 100px"
                ></textarea>
              </Field>
              <ErrorMessage class="err-mess" name="content" />
            </div>
            <div class="mb-4">
              <h6>Image</h6>
              <div class="mb-2 text-center" v-if="imgRp">
                <img :src="imgRp" style="height: 200px; border-radius: 5px" />
              </div>

              <Field
                type="file"
                class="form-control"
                name="image"
                id="myImg"
                @change="showImgRp"
              />
              <ErrorMessage class="err-mess" name="image" />
            </div>

            <div class="text-center">
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="isSubmitting"
              >
                <span
                  v-show="isSubmitting"
                  class="spinner-border spinner-border-sm mr-1"
                ></span>
                Report
              </button>
              <button class="btn btn-secondary ms-2" @click="rpLog = false">
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </Dialog>
    </section>
    <headerPage />
    <div class="container pt-5 pb-5">
      <div class="bg-body rounded">
        <div class="d-flex justify-content-start align-items-start gap-3">
          <div>
            <img :src="useAccount.userP.avatar" class="avatar-user" />
          </div>
          <div>
            <h1>{{ useAccount.userP.username }}</h1>
            <p class="text-secondary">
              {{ useAccount.userP.email }}
            </p>
            <span
              v-if="useAccount.currentUser.id !== useAccount.userP.id"
              class="rp-user"
              @click="rpLog = true"
              ><i class="pi pi-flag"></i> Report</span
            >
          </div>
        </div>

        <div class="info-activities gap-5">
          <div v-if="useAccount.userP.Articles">
            Total articles {{ useAccount.userP.Articles.length }}
          </div>
          <div v-if="useAccount.userP.Likes">
            Total likes {{ useAccount.userP.Likes.length }}
          </div>
          <div v-if="useAccount.userP.Comments">
            Total comments {{ useAccount.userP.Comments.length }}
          </div>
        </div>
      </div>

      <div class="bg-body rounded mt-2">
        <div v-if="useAccount.articleP <= 0">
          <div class="text-center mt-5 text-secondary">
            There is nothing here.
          </div>
        </div>
        <div
          v-else
          class="box-card d-flex justify-content-start align-items-start gap-4 flex-wrap"
        >
          <div
            class="card my-card"
            v-for="(item, index) in useAccount.articleP"
            :key="index"
          >
            <img :src="item.image" class="card-img-top" style="height: 200px" />
            <div class="card-body">
              <h5
                class="card-title my-hv text-truncate"
                @click="
                  $router.push({ name: 'detail', params: { id: item.id } })
                "
              >
                {{ item.title }}
              </h5>
              <p class="text-secondary subTitle-post">{{ item.subTitle }}</p>
              <div class="footer-post gap-2">
                <span class="tag-post">{{ item.category }}</span>
                <span class="tag-post">{{ item.type }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ScrollTop />
  </div>
</template>

<style scoped>
.avatar-user {
  width: 150px;
  height: 150px;
  border: 1px solid gainsboro;
  border-radius: 50%;
}
.info-activities {
  border-top: 1px solid gainsboro;
  border-bottom: 1px solid gainsboro;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0;
}
.my-card {
  width: 300px;
}
.footer-post {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.9em;
}

.tag-post {
  padding: 5px 10px;
  background-color: #eef0e5;
  border-radius: 5px;
  font-size: 0.9em;
}
.subTitle-post {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  width: 95%;
}
.rp-user:hover {
  cursor: pointer;
  transition: all 0.5s;
  color: red;
}
.my-hv:hover {
  cursor: pointer;
  color: blue;
}
@media only screen and (max-width: 1400px) {
  .my-card {
    width: 260px;
  }
}
@media only screen and (max-width: 1200px) {
  .my-card {
    width: 290px;
  }
}
@media only screen and (max-width: 992px) {
  .my-card {
    width: 330px;
  }
}
@media only screen and (max-width: 768px) {
  .my-card {
    width: 240px;
  }
}
@media only screen and (max-width: 576px) {
  .my-card {
    width: 300px;
  }
  .box-card {
    flex-direction: column;
    align-items: center !important;
  }
}
</style>
