import { useState } from "react";
import type { BooksType } from "../../lib/type";
import { BookContext } from "./BookContext";

type BookContextProviderProps = {
  children: React.ReactNode;
};

function BookContextProvider({ children }: BookContextProviderProps) {
  const [books, setBooks] = useState<BooksType[] | null>(null);

  const value = {
    books,
    setBooks,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export default BookContextProvider;
