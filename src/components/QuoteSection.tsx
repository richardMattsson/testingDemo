import { useState } from "react";
import InputButtons from "./InputButtons";
import Form from "./Form";

import type { QuoteType } from "../../lib/type";
import type { FormButtonType } from "../../lib/type";

type QuoteSectionProps = {
  quotes: QuoteType[] | null;
  setQuotes: React.Dispatch<React.SetStateAction<QuoteType[] | null>>;
  quote: QuoteType | null;
  setQuote: React.Dispatch<React.SetStateAction<QuoteType | null>>;
};

function QuoteSection({
  quotes,
  setQuotes,
  quote,
  setQuote,
}: QuoteSectionProps) {
  const [form, setForm] = useState<QuoteType>({
    id: 0,
    name: "",
    quote: "",
  });
  const [inProgress, setInProgress] = useState<number | boolean | null>(null);
  const [formButton, setFormButton] = useState<FormButtonType>({
    add: false,
    update: false,
  });

  function resetProcess(button: "add" | "update"): void {
    setInProgress(null);
    setForm({ id: 0, name: "", quote: "" });
    setFormButton({ ...formButton, [button]: false });
  }

  function handleQuoteForm(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    async function postQuote() {
      try {
        const response = await fetch("/api/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        const result = await response.json();
        setQuotes((prev) => [...(prev || []), result[0]]);
        setQuote(result[0]);
        resetProcess("add");
      } catch (error) {
        if (quotes) {
          const id = quotes.length + 1;
          const updatedForm = { ...form, id: id };
          setQuotes([...quotes, updatedForm]);
          setQuote(updatedForm);
          resetProcess("add");
        }
        console.log(
          "Det finns ingen databas att koppla upp till, inga ändringar sparas",
          error
        );
      }
    }
    postQuote();
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  function sendUpdate(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    async function updateQuote() {
      try {
        const response = await fetch(`/api/put/${quote?.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        const result = await response.json();
        setQuotes(result[0]);
        resetProcess("update");
      } catch (error) {
        if (quotes) {
          const quoteToUpdate = quotes.find(
            (quoteToUpdate) => quoteToUpdate.name === quote?.name
          );
          if (quoteToUpdate) {
            quoteToUpdate.quote = form.quote;
            quoteToUpdate.name = form.name;

            const updatedArray = quotes.filter(
              (quote) => quote.id !== quoteToUpdate.id
            );

            updatedArray.push(quoteToUpdate);
            setQuotes(updatedArray);
            resetProcess("update");
          }
        }
        resetProcess("update");
        console.log(
          "Det finns ingen databas att koppla upp till, inga ändringar sparas",
          error
        );
      }
    }

    updateQuote();
  }

  function handleDelete(): void {
    setInProgress(quote ? quote.id : null);

    async function deleteQuote() {
      const response = await fetch(`/api/delete/${quote?.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setInProgress(null);
        setQuote(null);
        const updatedArray = quotes
          ? quotes.filter((quotesToFilter) => quotesToFilter.id !== quote?.id)
          : [];
        setQuotes(updatedArray);
      } else {
        setInProgress(null);

        const updatedArray = quotes
          ? quotes.filter((quotesToFilter) => quotesToFilter.id !== quote?.id)
          : [];
        setQuotes(updatedArray);
        setQuote(null);
        console.log("error, response not ok. ", response);
        console.log(
          "Det finns ingen databas att koppla upp till, inga ändringar sparas"
        );
      }
    }
    deleteQuote();
  }

  return (
    <>
      <section
        data-test="quote-section-container"
        style={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          justifyContent:
            formButton.add || formButton.update ? "space-between" : "center",
          alignItems: "center",
          borderBottom: "1px solid white",
          borderRight: "1px solid white",
          padding: "2rem",
        }}
      >
        <div className={formButton.add ? "showForm" : "hideForm"}>
          <Form
            formButton={formButton}
            handleQuoteForm={handleQuoteForm}
            handleChange={handleChange}
            form={form}
            setInProgress={setInProgress}
            inProgress={inProgress}
            addText="Lägg till"
          />
        </div>

        <div className={formButton.update ? "showUpdate" : "hideUpdate"}>
          <Form
            formButton={formButton}
            sendUpdate={sendUpdate}
            handleChange={handleChange}
            form={form}
            setInProgress={setInProgress}
            inProgress={inProgress}
            addText="Uppdatera"
          />
        </div>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontStyle: "italic", textAlign: "center" }}>
            {quote && `"${quote.quote}"`}
          </p>
          <p data-test="test-quote">{quote && quote.name}</p>
        </section>
      </section>

      <InputButtons
        inProgress={inProgress}
        setFormButton={setFormButton}
        formButton={formButton}
        handleDelete={handleDelete}
        setQuote={setQuote}
      />
    </>
  );
}

export default QuoteSection;
