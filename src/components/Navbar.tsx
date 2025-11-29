import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import type { ThemeType } from "../../lib/type";

import ToggleTheme from "./ToggleTheme";
import { useThemeContext } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { theme, setTheme } = useThemeContext();

  function updateTheme(theme: React.SetStateAction<ThemeType>) {
    setTheme(theme);
  }

  return (
    <>
      <section
        className={theme === "dark" ? "navbar" : "navbar-light"}
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          alignItems: "center",
          justifyContent: "end",
          borderBottom: "1px solid white",
        }}
      >
        <h1
          data-test="home-heading"
          style={{
            textAlign: "start",
            cursor: "pointer",
            marginLeft: "20px",
            // border: "1px solid white",
          }}
          onClick={() => navigate(`/${user ? user.email : ""}`)}
        >
          Quotes & Books
        </h1>
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 40,
            height: "100%",
            // border: "1px solid white",
          }}
        >
          <ToggleTheme theme={theme} updateTheme={updateTheme} />
          <i
            onClick={() => navigate(`/account/${user ? user.email : ""}`)}
            className={`fa-solid ${user ? "fa-user-check" : "fa-user"} fa-2xl`}
            data-test="account-icon"
            style={{
              cursor: "pointer",
              textAlign: "end",
              marginRight: "40px",

              // border: "1px solid white",
            }}
          ></i>
        </section>
      </section>
    </>
  );
}
export default Navbar;
