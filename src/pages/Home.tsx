import { useState, useEffect } from "react";
import QuoteSection from "../components/QuoteSection";
import Books from "../components/Books";

import type { QuoteType } from "../../lib/type";
import { useQuoteContext } from "../context/QuoteContext";
import SearchQuote from "../components/SearchQuote";

function Home() {
  const [quotes, setQuotes] = useState<QuoteType[] | null>(null);
  const { setQuoteDisplay } = useQuoteContext();
  const [text, setText] = useState("");
  const [quote, setQuote] = useState<QuoteType | null>(null);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const response = await fetch("/database.json");
        const quotes: QuoteType[] | null = await response.json();
        setQuotes(quotes);
        setQuoteDisplay(quotes ? quotes[0] : null);
      } catch (error) {
        console.log(error);
      }
    }
    fetchQuotes();
  }, [setQuoteDisplay]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function handleClick(quote: QuoteType) {
    setQuote(quote);
  }

  return (
    <>
      <div
        style={{ display: "flex", marginBottom: "2rem", minHeight: "450px" }}
      >
        <section
          style={{
            display: "grid",
            gap: 5,
            alignItems: "start",
            padding: "2rem",
            borderRight: "1px solid white",
            borderBottom: "1px solid white",
          }}
        >
          <SearchQuote
            text={text}
            handleChange={handleChange}
            handleClick={handleClick}
            quotes={
              quotes &&
              quotes.filter((quote) =>
                quote.name.toLowerCase().startsWith(text.toLowerCase())
              )
            }
            displayQuote={quote}
          />
        </section>
        <QuoteSection
          quotes={quotes}
          setQuotes={setQuotes}
          quote={quote}
          setQuote={setQuote}
        />
      </div>
      <Books />
    </>
  );
}
export default Home;
