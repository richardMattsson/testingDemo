import type { QuoteType } from "../../lib/type";

type SearchQuoteProps = {
  text: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: (quote: QuoteType) => void;
  quotes: QuoteType[] | null;
  displayQuote: QuoteType | null;
};

function SearchQuote({
  text,
  handleChange,
  handleClick,
  quotes,
  displayQuote,
}: SearchQuoteProps) {
  return (
    <>
      <section style={{ display: "grid", gap: 15 }}>
        <label htmlFor="searchQuote">Filtrera citat:</label>
        <input
          data-cy="filter"
          name="searchQuote"
          type="text"
          placeholder="Filtrera citat"
          defaultValue={text}
          onChange={handleChange}
        />
      </section>

      <div
        data-test="test-quotebuttons"
        style={{
          display: "grid",
          gap: 15,
        }}
      >
        {!quotes && <p data-cy="loading-quotes-message">"Laddar citat..."</p>}
        {quotes &&
          quotes.map((quote) => (
            <button
              data-test={`test-quotebutton-${quote.id}`}
              key={quote.id}
              className="button"
              style={{
                border: "1px solid grey",
                borderRadius: "5px",
                textAlign: "center",
                padding: "0 10px",
                cursor: "pointer",
              }}
              onClick={() => handleClick(quote)}
              disabled={displayQuote?.name === quote.name}
            >
              <p>{quote.name}</p>
            </button>
          ))}
      </div>
    </>
  );
}

export default SearchQuote;
