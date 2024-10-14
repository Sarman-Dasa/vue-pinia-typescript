<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="400px">
      <VBannerText class="text-center py-2">Sign Up</VBannerText>
      <v-form v-model="isValid" @submit.prevent="onSubmit">
        <v-text-field
          v-model="formInput.userName"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="User name"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="formInput.email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="Email"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="formInput.password"
          :readonly="loading"
          :rules="[required]"
          label="Password"
          placeholder="Enter your password"
          type="password"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="formInput.confirmPassword"
          :readonly="loading"
          :rules="[required]"
          label="Confirm Password"
          placeholder="Enter your password"
          type="password"
          clearable
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!isValid"
          :loading="loading"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import type { Register } from "@/types/user";

const isValid = ref(false);
const formInput = reactive<Register>({
  id: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const loading = ref(false);
const userStore = useUserStore();

const router = useRouter();

const onSubmit = async () => {
  if (!isValid.value) return;

  loading.value = true;
  await userStore.registerUser(formInput);
  loading.value = false;

  router.push("/");
};

const required = (v: any) => {
  return !!v || "Field is required";
};
</script>
<style scoped></style>
