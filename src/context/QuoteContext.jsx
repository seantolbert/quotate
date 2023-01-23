import { createContext, useReducer } from "react";

export const QuoteContext = createContext();

export const quoteReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_QUOTE":
      return { ...state, updatingQuote: action.payload };
    case "UPDATE_COMPLETE":
      return { ...state, updatingQuote: null };
    default:
      return updatingQuote;
  }
};

export const QuoteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quoteReducer, {
    updatingQuote: null,
  });

  return (
    <QuoteContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuoteContext.Provider>
  );
};
