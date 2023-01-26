import { useReducer, useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  Timestamp,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { document: null, isPending: true, error: null, success: false };
    case "ADDED_DOC":
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case "DELETED_DOC":
      return { document: null, isPending: false, error: null, success: true };
    case "UPDATED_DOC":
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case "ERROR":
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const useFirestore = (c) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = collection(db, c);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //   CREATE

  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const addedDoc = await addDoc(ref, doc);
      dispatchIfNotCancelled({ type: "ADDED_DOC", payload: addedDoc });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await deleteDoc(doc(ref, id));
      dispatchIfNotCancelled({ type: "DELETED_DOC" });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "failed to delete" });
    }
  };

  const updateDocument = async (id, updates) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const updatedDocument = await updateDoc(doc(ref, id), updates);
      dispatchIfNotCancelled({ type: "UPDATED_DOC", payload: updatedDocument });
      return updatedDocument;
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};
