<script setup>
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { adminStore } from "@/stores/admin.store";
import { accountsStore } from "@/stores/accounts.store";
import * as yup from "yup";
import { Field, Form, ErrorMessage } from "vee-validate";
import { ref } from "vue";
const useAdmin = adminStore();
const useAcc = accountsStore();
const toast = useToast();

const runStore = async () => {
  await useAdmin.onGetUser();
};

runStore();

const detailsLog = ref(false);

const banUserLog = ref(false);
const sendMessLog = ref(false);
const removeUserLog = ref(false);

const openDetail = async (id) => {
  await useAcc.getOneAcc(id);
  detailsLog.value = true;
};

const openBan = async (id) => {
  await useAcc.getOneAcc(id);
  banUserLog.value = true;
};
const openSend = async (id) => {
  await useAcc.getOneAcc(id);
  sendMessLog.value = true;
};
const openRemove = async (id) => {
  await useAcc.getOneAcc(id);
  removeUserLog.value = true;
};
// actions
const ban_user = async () => {
  const id = useAcc.userP.id;
  await useAdmin.onBanUser(id);
  if (useAdmin.checkData === true)
    toast.add({
      severity: "success",
      detail: useAdmin.mess,
      life: 3000,
    });
  else {
    toast.add({
      severity: "success",
      detail: useAdmin.mess,
      life: 3000,
    });
  }
  await useAdmin.onGetUser();
  banUserLog.value = false;
};

const sendMess = yup.object().shape({
  content: yup.string().required().min(5),
  image: yup.string(),
});

const newImg = ref(null);
const showImgCreate = (e) => {
  const file = e.target.files[0];
  newImg.value = URL.createObjectURL(file);
};

const send_mess = async (values) => {
  const id = useAcc.userP.id;
  await useAdmin.onSendMess(id, values);
  sendMessLog.value = false;

  if (useAdmin.mess)
    return toast.add({
      severity: "success",
      detail: useAdmin.mess,
      life: 3000,
    });
};

const removeAcc = async () => {
  const id = useAcc.userP.id;
  await useAdmin.onDeleteUser(id);
  removeUserLog.value = false;

  if (useAdmin.mess)
    toast.add({
      severity: "success",
      detail: useAdmin.mess,
      life: 3000,
    });
  await useAdmin.onGetUser();
};
</script>

<template>
  <Toast />
  <div
    class="actions-mgt mb-2 mt-5 d-flex justify-content-between align-items-center"
  >
    <div class="">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText
          v-model="useAdmin.searchUser"
          placeholder="search by email"
        />
      </span>
    </div>
    <div>
      <select v-model="useAdmin.selected" class="form-select">
        <option
          v-for="(option, index) in useAdmin.options"
          :key="index"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
  </div>
  <div class="p-1 rounded" style="background-color: white">
    <div class="mt-2 rounded box-data" style="overflow-x: hidden">
      <div
        class="d-flex justify-content-start align-items-start gap-2 header-data"
      >
        <div class="col-2">Joining date</div>
        <div class="col-1">id</div>
        <div class="col-2">Email</div>
        <div class="col-2">Username</div>
        <div class="col-1">Status</div>
        <div class="col">Actions</div>
      </div>
      <div class="body-data">
        <div
          v-for="(item, index) in useAdmin.filterUser"
          :key="index"
          class="d-flex justify-content-start align-items-start gap-2 item-data"
        >
          <div class="col-2">
            <span>{{ item.createdAt }}</span>
          </div>
          <div class="col-1">
            <span>{{ item.id }}</span>
          </div>
          <div class="col-2">
            <span>{{ item.email }}</span>
          </div>
          <div class="col-2">
            <span>{{ item.username }}</span>
          </div>
          <div class="col-1">
            <span v-if="item.status === false" style="color: red">Banned</span>
            <span v-else style="color: green">Active</span>
          </div>
          <div class="col">
            <button
              class="btn btn-sm btn-outline-secondary me-3"
              v-tooltip.top="'details'"
              @click="openDetail(item.id)"
            >
              <i class="pi pi-info-circle"></i>
            </button>

            <button
              class="btn btn-sm btn-outline-secondary me-3"
              v-tooltip.top="'ban user'"
              @click="openBan(item.id)"
            >
              <i class="pi pi-ban"></i>
            </button>
            <button
              class="btn btn-sm btn-outline-secondary me-3"
              v-tooltip.top="'send notification'"
              @click="openSend(item.id)"
            >
              <i class="pi pi-send"></i>
            </button>
            <button
              class="btn btn-sm btn-outline-secondary"
              v-tooltip.top="'remove user'"
              @click="openRemove(item.id)"
            >
              <i class="pi pi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section>
    <!-- details -->
    <div>
      <Dialog
        v-model:visible="detailsLog"
        modal
        header="User Details"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <div class="d-flex justify-content-start align-items-start">
          <div>
            <img :src="useAcc.userP.avatar" class="avatar-details" />
          </div>
          <div class="d-flex justify-content-around align-items-start col">
            <div
              class="d-flex flex-column justify-content-start align-items-start gap-2"
            >
              <div><span class="fw-bold">Id:</span> {{ useAcc.userP.id }}</div>
              <div>
                <span class="fw-bold">Email:</span>
                {{ useAcc.userP.email }}
              </div>
              <div>
                <span class="fw-bold">Username:</span>
                {{ useAcc.userP.username }}
              </div>
              <div>
                <span class="fw-bold">First name:</span>
                {{ useAcc.userP.firstname }}
              </div>
              <div>
                <span class="fw-bold">Last name:</span>
                {{ useAcc.userP.lastname }}
              </div>
            </div>
            <div
              class="d-flex flex-column justify-content-between align-items-start gap-2"
            >
              <div>
                <span class="fw-bold">Date of birth:</span>
                {{ useAcc.userP.age }}
              </div>
              <div>
                <span class="fw-bold">Gender:</span>
                {{ useAcc.userP.gender }}
              </div>
              <div>
                <span class="fw-bold">Phone number:</span>
                {{ useAcc.userP.phonenumber }}
              </div>
              <div>
                <span class="fw-bold">Address:</span>
                {{ useAcc.userP.address }}
              </div>
              <div>
                <span class="fw-bold">Status: </span>
                <span v-if="useAcc.userP.status === true">Active</span>
                <span v-else>Banned</span>
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="info-activities">
            <div v-if="useAcc.userP.Articles">
              Total articles {{ useAcc.userP.Articles.length }}
            </div>
            <div v-if="useAcc.userP.Likes">
              Total likes {{ useAcc.userP.Likes.length }}
            </div>
            <div v-if="useAcc.userP.Comments">
              Total comments {{ useAcc.userP.Comments.length }}
            </div>
          </div>
        </template>
      </Dialog>
    </div>

    <!-- ban user -->
    <div>
      <Dialog
        v-model:visible="banUserLog"
        modal
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <div v-if="useAcc.userP.status === true">
          <div>
            <span class="fw-bold"
              >{{ useAcc.userP.username }} ({{ useAcc.userP.email }})</span
            >
            will be <span class="text-danger fw-bold">banned</span> from
            accessing the application
          </div>
        </div>
        <div v-else>
          <span class="fw-bold"
            >{{ useAcc.userP.username }} ({{ useAcc.userP.email }})</span
          >
          will be <span class="text-danger fw-bold">unbanned</span> from
          accessing the application
        </div>
        <template #footer>
          <button @click="ban_user" class="btn btn-primary me-2">
            confirm
          </button>
          <button class="btn btn-secondary" @click="banUserLog = false">
            cancel
          </button>
        </template>
      </Dialog>
    </div>
    <!-- send message -->
    <div>
      <Dialog
        v-model:visible="sendMessLog"
        modal
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <div>
          <div class="text-center text-primary">
            <h5>
              Send notification to {{ useAcc.userP.username }} ({{
                useAcc.userP.email
              }})
            </h5>
          </div>
          <Form
            :validation-schema="sendMess"
            @submit="send_mess"
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
              <div class="mb-2 text-center" v-if="newImg">
                <img :src="newImg" style="height: 200px; border-radius: 5px" />
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
                Send
              </button>
              <button
                class="btn btn-secondary ms-2"
                @click="sendMessLog = false"
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
        <template #footer></template>
      </Dialog>
    </div>
    <!-- remove user -->
    <div>
      <Dialog
        v-model:visible="removeUserLog"
        modal
        header="Remove User"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <div>
          This account ({{ useAcc.userP.email }}) will be removed from the
          application
        </div>
        <template #footer>
          <button class="btn btn-danger me-2" @click="removeAcc()">
            remove
          </button>
          <button class="btn btn-secondary" @click="removeUserLog = false">
            cancel
          </button>
        </template>
      </Dialog>
    </div>
  </section>
</template>

<style scoped>
.header-data {
  font-size: 1em;
  font-weight: bold;
  text-transform: capitalize;
  padding: 5px 5px;
  border-bottom: 1px solid gainsboro;
}
.body-data {
  padding: 5px;
  height: 500px;
  overflow-y: scroll;
}
.item-data {
  padding: 5px 0;
  font-size: 0.9em;
  border-bottom: 1px solid gainsboro;
}
.avatar-details {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  object-fit: cover;
}
.info-activities {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid gainsboro;
  border-bottom: 1px solid gainsboro;
  padding: 5px 0;
}
</style>
