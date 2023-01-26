import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Auth, db } from "../firebase/config";
import { useDocument } from "./useDocument";

export const useHeart = () => {
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  // const { document: userDoc, error } = useDocument(
  //   "users",
  //   Auth.currentUser.uid
  // );

  const like = async (user, quote) => {
    setIsPending(false);

    try {
      //   const { document: quote, error } = useDocument("quotes", id);
      const userRef = doc(db, "users", Auth.currentUser.uid);
      const quoteRef = doc(db, "quotes", quote.id);
      
      //   const results = user.favorites.push(quote.id);
      
      await setDoc(quoteRef, { ...quote, hearts: (quote.hearts += 1) });
      
      //   await setDoc(userRef, {
          //     ...user,
          //     favorites: results,
          //   });
          
        //   console.log(quote)
      console.log("increased heart count");
    } catch (err) {
      console.log(err.message);
    }
  };

  const unlike = async () => {};

  return { like, unlike };
};
