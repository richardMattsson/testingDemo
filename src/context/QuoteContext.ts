import { createContext, useContext } from "react";
import type { QuoteType } from "../../lib/type";

type QuoteContextType = {
  quoteDisplay: QuoteType | null;
  setQuoteDisplay: React.Dispatch<React.SetStateAction<QuoteType | null>>;
};

export const QuoteContext = createContext<QuoteContextType | null>(null);

export function useQuoteContext() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error(
      "This element must be used inside the QuoteContextProvider"
    );
  }
  return context;
}
