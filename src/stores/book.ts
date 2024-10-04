import type Book from "@/types/bookType";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useBookStore = defineStore("books", () => {
  const books = ref<Book[]>([]);

  const addNewBook = (newBook: Book) => {
    books.value.push(newBook);
  };

  const getBooks = () => {
    return books.value;
  };

  // Update an existing book
  const updateBook = (updatedBook: Book) => {
    const index = books.value.findIndex((book) => book.id === updatedBook.id);
    if (index !== -1) {
      books.value[index] = updatedBook;
    }
  };

  // Delete a book by id
  const deleteBook = (bookId: String) => {
    books.value = books.value.filter((book) => book.id !== bookId);
  };

  return { addNewBook, getBooks, deleteBook, updateBook, books };
});
