import { useState } from "react";
import BookCard from "./BookCard";
import { useBookContext } from "../context/BookContext";

function Books() {
  const [inputValue, setInputValue] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const { books, setBooks } = useBookContext();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    async function getBooks() {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${inputValue}`
        );
        const books = await response.json();
        setBooks(books.items);
      } catch {
        console.log("Something went wrong fetching books");
      }
    }
    getBooks();
  }
  return (
    <>
      <section className={"Home-header"} aria-labelledby="search-heading">
        <h2
          data-cy="book-search-header"
          id="search-heading"
          className="Home-h1"
        >
          Hitta en bok
        </h2>
        <form onSubmit={handleSubmit} method="post" className="Home-form">
          <input
            data-test="test-booksearch"
            style={{ fontSize: "20px" }}
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            placeholder="title, författare"
            className="Home-input"
          />

          <button
            data-test="test-submitbutton"
            type="submit"
            style={{ width: "100px" }}
          >
            Sök
          </button>
        </form>
      </section>

      <article className={"Home-article"} data-test="test-bookArticle">
        {books &&
          books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              volumeInfo={book.volumeInfo}
              showDetails={showDetails}
              setShowDetails={setShowDetails}
            />
          ))}
      </article>
    </>
  );
}
export default Books;
