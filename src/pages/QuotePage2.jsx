import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateQuoteForm,CommentForm, CommentList } from "../components";
import { useDocument } from "../hooks/useDocument";
import { useFirestore } from "../hooks/useFirestore";

import BookSummary from "../components/BookSummary";
import QuotePageButtons from "../components/QuotePageButtons";

const QuotePage2 = () => {
  const { id } = useParams();
  const { error, document: quote } = useDocument("quotes", id);

  const navigate = useNavigate();

  const { deleteDocument, updateDocument } = useFirestore("quotes");

  const handleDelete = async () => {
    await deleteDocument(quote.id);
    navigate("/dashboard");
  };

  const [newQuoteContent, setNewQuoteContent] = useState("");

  const [isUpdating, setIsUpdating] = useState(false);

  const handleSwitch = () => {
    setNewQuoteContent(quote.quoteContent);
    setIsUpdating(!isUpdating);
  };

  const handleUpdate = async () => {
    await updateDocument(quote.id, { quoteContent: newQuoteContent });
    setIsUpdating(false);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!quote) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-5 px-2 min-h-screen">
      <UpdateQuoteForm
        quoteContent={quote.quoteContent}
        isUpdating={isUpdating}
        handleUpdate={handleUpdate}
        setIsUpdating={setIsUpdating}
        setNewQuoteContent={setNewQuoteContent}
        newQuoteContent={newQuoteContent}
      />

      <BookSummary quote={quote} />

      <QuotePageButtons
        handleDelete={handleDelete}
        handleSwitch={handleSwitch}
      />

      <CommentForm quote={quote} />

      <CommentList quote={quote} />
    </div>
  );
};
export default QuotePage2;
