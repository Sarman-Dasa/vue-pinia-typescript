<template>
  <v-container>
    <v-row>
      <!-- List of Books -->
      <v-col v-for="(book, i) in bookStore.books" :key="i" cols="12" md="3">
        <v-card :color="color" variant="tonal" class="mx-auto">
          <v-card-item>
            <div>
              <div class="text-overline mb-1"></div>
              <div class="text-h6 mb-1">
                {{ book.title }}
              </div>
              <div class="text-caption">{{ book.author }}</div>
              <div class="text-end">{{ book.publishedDate }}</div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn icon @click="editBook(book)"> <v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn icon @click="deleteBook(book.id)"> <v-icon>mdi-delete</v-icon> </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <Edit v-if="showModal" :showModal="showModal" :book="book" @update="updateBook" @close="closeModal"/>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useBookStore } from "@/stores/book";
import type Book from "@/helper/bookType";
import Edit from "./Edit.vue";

const bookStore = useBookStore();
const showModal = ref(false);
const color = ref("secondary");
const book = ref<Book>();

// Validation rules


// Edit book method
const editBook = (bookToEdit: Book) => {
  book.value = { ...bookToEdit }; // Copy book details for editing
  showModal.value = true;
};


const updateBook = (data:Book) => {
    bookStore.updateBook(data);
    showModal.value = false;
}

const closeModal = () => {
    showModal.value = false;
}
// Delete book method
const deleteBook = (bookId: String) => {
  bookStore.deleteBook(bookId);
};
</script>

<style scoped></style>
