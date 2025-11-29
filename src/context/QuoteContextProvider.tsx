import { useState } from "react";

import type { QuoteType } from "../../lib/type";

import { QuoteContext } from "./QuoteContext";

type QuoteContextProviderProps = {
  children: React.ReactNode;
};

function QuouteContextProvider({ children }: QuoteContextProviderProps) {
  const [quoteDisplay, setQuoteDisplay] = useState<QuoteType | null>(null);
  const value = {
    quoteDisplay,
    setQuoteDisplay,
  };

  return (
    <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
  );
}

export default QuouteContextProvider;
