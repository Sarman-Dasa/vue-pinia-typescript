<template>
  <v-container>
    <v-form ref="bookForm" v-model="valid" @submit.prevent="submitForm">
      <!-- Book Title -->
      <v-text-field
        v-model="formData.title"
        label="Title"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <!-- Author -->
      <v-text-field
        v-model="formData.author"
        label="Author"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <!-- Published Date -->
      <v-text-field
        v-model="formData.publishedDate"
        label="Published Date"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <!-- Price -->
      <v-text-field
        v-model="formData.price"
        label="Price"
        type="number"
        :rules="[rules.required, rules.positiveNumber]"
        required
      ></v-text-field>

      <!-- Page Count -->
      <v-text-field
        v-model="formData.pageCount"
        label="Page Count"
        type="number"
        :rules="[rules.required, rules.positiveNumber]"
        required
      ></v-text-field>

      <!-- Stock Quantity -->
      <v-text-field
        v-model="formData.stockQuantity"
        label="Stock Quantity"
        type="number"
        :rules="[rules.required, rules.positiveNumber]"
        required
      ></v-text-field>

      <!-- Submit Button -->
      <v-btn :disabled="!valid" color="primary" type="submit"> Add Book </v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useBookStore } from "@/stores/book";
import type Book from "@/helper/bookType";
import { v4 as uuidv4 } from 'uuid';
const valid = ref(false);

const formData = ref<Book>({
  id: "",
  title: "",
  author: "",
  publishedDate: "",
  price: 0,
  pageCount: 0,
  stockQuantity: 0,
});


// Pinia store for books
const bookStore = useBookStore();

// Validation rules
const rules = {
  required: (value: Book) => !!value || "Required.",
  positiveNumber: (value: number) => value > 0 || "Must be a positive number.",
};

const submitForm = () => {
  if (valid.value) {
    let id = uuidv4();
    bookStore.addNewBook({...formData.value,id:id});

    formData.value = {
      id: '',
      title: '',
      author: '',
      publishedDate: '',
      price: 0,
      pageCount: 0,
      stockQuantity: 0,
    };
  }
};
</script>

<style scoped></style>
