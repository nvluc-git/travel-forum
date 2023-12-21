<script setup>
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { adminStore } from "@/stores/admin.store";
import * as yup from "yup";
import { Field, Form, ErrorMessage } from "vee-validate";
import { ref } from "vue";

const useAdmin = adminStore();
const newSerLog = ref(false);
const updateSerLog = ref(false);
const deleteSerLog = ref(false);

const toast = useToast();

const runStore = async () => {
  await useAdmin.getSers();
};
runStore();
const newImg = ref(null);
const showImgCreate = (e) => {
  const file = e.target.files[0];
  newImg.value = URL.createObjectURL(file);
};

const newSer = yup.object().shape({
  title: yup.string().required().min(5).max(10),
  linkTo: yup.string().required().min(5),
  image: yup.string().required(),
});
const newService = async (values) => {
  await useAdmin.newSer(values);
  if (useAdmin.mess)
    toast.add({
      severity: "success",
      detail: useAdmin.mess,
      life: 3000,
    });
  newSerLog.value = false;
  await useAdmin.getSers();
};

const updateSer = yup.object().shape({
  title: yup.string().required().min(5).max(10),
  linkTo: yup.string().required().min(5),
  image: yup.string(),
});
const openUpdateSer = async (id) => {
  await useAdmin.oneSer(id);
  updateSerLog.value = true;
};

const updateImg = (e) => {
  const file = e.target.files[0];
  useAdmin.service.image = URL.createObjectURL(file);
};
const updateService = async (values) => {
  await useAdmin.updateSer(values);
  if (useAdmin.mess)
    toast.add({
      severity: "success",
      detail: useAdmin.mess,
      life: 3000,
    });
  await useAdmin.getSers();
  updateSerLog.value = false;
};

const openDeleteSer = async (id) => {
  await useAdmin.oneSer(id);
  deleteSerLog.value = true;
};

const deteleService = async () => {
  const id = useAdmin.service.id;
  await useAdmin.deleteSer(id);
  if (useAdmin.mess)
    toast.add({
      severity: "success",
      detail: useAdmin.mess,
      life: 3000,
    });
  await useAdmin.getSers();
  deleteSerLog.value = false;
};
</script>

<template>
  <Toast />
  <div class="mt-5 p-2">
    <div style="background-color: white" class="rounded p-2">
      <div class="">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="useAdmin.searchService"
            placeholder="search by title"
            style="width: 400px"
          />
        </span>
        <button class="btn btn-primary ms-2" @click="newSerLog = true">
          new service
        </button>
      </div>

      <div
        class="d-flex justify-content-start align-items-start gap-5 pt-5 flex-wrap ps-5 box-data"
      >
        <div v-for="(item, index) in useAdmin.filterSer" :key="index">
          <div class="ser-card">
            <a :href="item.linkTo" target="_blank">
              <img :src="item.image" class="img-ser" />
            </a>
            <div
              class="title-ser mt-2 d-flex justify-content-between align-items-center ps-2 pe-2"
            >
              <h4>{{ item.title }}</h4>
              <div>
                <button
                  class="btn btn-sm btn-outline-info me-2"
                  @click="openUpdateSer(item.id)"
                >
                  <i class="pi pi-file-edit"></i>
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="openDeleteSer(item.id)"
                >
                  <i class="pi pi-trash"></i>
                </button>
              </div>
            </div>
          </div>
          <Dialog
            v-model:visible="deleteSerLog"
            modal
            header="Delete Service"
            :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
          >
            <div>Are you sure you want to delete this post?</div>
            <template #footer>
              <div>
                <button
                  class="btn btn-danger me-2"
                  @click="deteleService(item.id)"
                >
                  confirm
                </button>
                <button class="btn btn-secondary" @click="deleteSerLog = false">
                  cancel
                </button>
              </div>
            </template>
          </Dialog>
          <Dialog
            v-model:visible="updateSerLog"
            modal
            header="update Service"
            :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
          >
            <div>
              <Form
                :validation-schema="updateSer"
                @submit="updateService"
                v-slot="{ isSubmitting }"
              >
                <Field
                  name="id"
                  :value="useAdmin.service.id"
                  style="display: none"
                />
                <div class="mb-2">
                  <label for="title">Title</label>
                  <Field
                    id="title"
                    name="title"
                    type="text"
                    class="form-control"
                    :value="useAdmin.service.title"
                  />
                  <ErrorMessage class="err-mess" name="title" />
                </div>
                <div class="mb-2">
                  <label for="linkTo">Link</label>
                  <Field
                    id="linkTo"
                    name="linkTo"
                    type="text"
                    class="form-control"
                    :value="useAdmin.service.linkTo"
                  />
                  <ErrorMessage class="err-mess" name="linkTo" />
                </div>
                <div>
                  <label for="image">Image</label>
                  <div class="mb-2 mt-2 text-center" style="overflow: hidden">
                    <img
                      :src="useAdmin.service.image"
                      style="height: 400px; border-radius: 5px"
                    />
                  </div>
                  <Field
                    id="image"
                    name="image"
                    type="file"
                    class="form-control"
                    @change="updateImg"
                  />
                  <ErrorMessage class="err-mess" name="image" />
                </div>
                <div class="mt-5 text-center">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="isSubmitting"
                  >
                    <span
                      v-show="isSubmitting"
                      class="spinner-border spinner-border-sm mr-1"
                    ></span>
                    Update Service
                  </button>
                </div>
              </Form>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="newSerLog"
    modal
    header="New Service"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div>
      <Form
        :validation-schema="newSer"
        @submit="newService"
        v-slot="{ isSubmitting }"
      >
        <div class="mb-2">
          <label for="title">Title</label>
          <Field id="title" name="title" type="text" class="form-control" />
          <ErrorMessage class="err-mess" name="title" />
        </div>
        <div class="mb-2">
          <label for="linkTo">Link</label>
          <Field id="linkTo" name="linkTo" type="text" class="form-control" />
          <ErrorMessage class="err-mess" name="linkTo" />
        </div>
        <div>
          <label for="image">Image</label>
          <div
            class="mb-2 mt-2 text-center"
            v-if="newImg"
            style="overflow: hidden"
          >
            <img :src="newImg" style="height: 400px; border-radius: 5px" />
          </div>
          <Field
            id="image"
            name="image"
            type="file"
            class="form-control"
            @change="showImgCreate"
          />
          <ErrorMessage class="err-mess" name="image" />
        </div>
        <div class="mt-5 text-center">
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="isSubmitting"
          >
            <span
              v-show="isSubmitting"
              class="spinner-border spinner-border-sm mr-1"
            ></span>
            New Service
          </button>
        </div>
      </Form>
    </div>
  </Dialog>
</template>

<style scoped>
.box-data {
  height: 550px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.ser-card {
  border-radius: 5px;
}

.img-ser {
  height: 150px;
  width: 230px;
  border: 1px solid gainsboro;
  border-radius: 10px;
  cursor: pointer;
  object-fit: cover;
}
.img-ser:hover {
  transition: all 0.5s;
  transform: scale(1.05);
}
</style>
