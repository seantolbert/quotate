import axios from "axios";
import { useState, useEffect } from "react";

export const useGetBooks = (q) => {
  const [fetchError, setFetchError] = useState(null);
  const [bookList, setBookList] = useState([]);

  const key = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  const APIKey = `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${key}`;

  useEffect(() => {
    
  }, [q]);
  
  axios
    .get(APIKey)
    .then((res) => {
      setBookList(res.data.items);
    })
    .catch((err) => setFetchError(err.response.data.error.message));
  return { bookList, fetchError };
};
