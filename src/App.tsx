import Router from "./router/Router";
import BookContextProvider from "./context/BookContextProvider";
import QuouteContextProvider from "./context/QuoteContextProvider";
import "./App.css";
import UserContextProvider from "./context/UserContextProvider";
import ThemeContextProvider from "./context/ThemeContextProvider";

function App() {
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <QuouteContextProvider>
          <BookContextProvider>
            <Router />
          </BookContextProvider>
        </QuouteContextProvider>
      </UserContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
