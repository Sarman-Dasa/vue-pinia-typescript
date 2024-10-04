<template>
  <!-- Dialog for Editing Book -->
  <v-dialog v-model="isDialogOpen" max-width="500px">
    <v-card>
      <v-card-title>Edit Book</v-card-title>
      <v-card-text>
        <v-form v-model="valid" @submit.prevent="submitEditForm">
          <!-- Same fields as in the Add Book Form -->
          <v-text-field
            v-model="book.title"
            label="Title"
            :rules="[rules.required]"
            required
          ></v-text-field>
          <v-text-field
            v-model="book.author"
            label="Author"
            :rules="[rules.required]"
            required
          ></v-text-field>
          <v-text-field
            v-model="book.publishedDate"
            label="Published Date"
            :rules="[rules.required]"
            required
          ></v-text-field>
          <v-text-field
            v-model="book.price"
            label="Price"
            type="number"
            :rules="[rules.required, rules.positiveNumber]"
            required
          ></v-text-field>
          <v-text-field
            v-model="book.pageCount"
            label="Page Count"
            type="number"
            :rules="[rules.required, rules.positiveNumber]"
            required
          ></v-text-field>
          <v-text-field
            v-model="book.stockQuantity"
            label="Stock Quantity"
            type="number"
            :rules="[rules.required, rules.positiveNumber]"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="btn btn-primary" @click="closeDialog">Cancel</v-btn>
        <v-btn :disabled="!valid" color="primary" @click="submitEditForm"
          >Update</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type Book from '@/types/bookType';
import { ref,watch } from 'vue';
import type { PropType } from 'vue'

const props = defineProps({
    book: {
        type: Object as PropType<Book>,
        required:true
    },
    showModal: {
        type:Boolean,
        default:false
    }
});

const emit = defineEmits<{
  update: [value: Book],
  close:any,
}>()

// Book object to hold form data for editing
const book = ref<Book>(props.book);
const isDialogOpen  = ref(props.showModal);
const valid = ref(false);

const rules = {
  required: (value: Book) => !!value || "Required.",
  positiveNumber: (value: number) => value > 0 || "Must be a positive number.",
};

// Close the edit dialog
const closeDialog = () => {
    emit('close');
};




// watch(() => props.showModal,(nv) => {

// })

// Submit the edit form
const submitEditForm = () => {
  if (valid.value) {
    // bookStore.updateBook(book.value);
    // isDialogOpen.value = false;
    emit("update",book.value);
  }
};

</script>

<style scoped></style>
