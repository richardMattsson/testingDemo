import { createContext, useContext } from "react";
import type { BooksType } from "../../lib/type";

type BookContextType = {
  books: BooksType[] | null;
  setBooks: React.Dispatch<React.SetStateAction<BooksType[] | null>>;
};

export const BookContext = createContext<BookContextType | null>(null);

export function useBookContext() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("This should not be use outside BookContextProvider");
  }
  return context;
}
