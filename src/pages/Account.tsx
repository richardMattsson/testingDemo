import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

type UsersType = {
  id: number;
  email: string;
  password: string;
};

function Account() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  function onSubmit(user: UsersType | null) {
    if (user) {
      setUser(user);
      navigate(`/${user.email}`);
    } else {
      setError(true);
    }
  }

  function handleLogout() {
    setUser(null);
    navigate("/account");
  }

  return (
    <>
      <article
        data-cy="account-article"
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {error && (
          <p data-test="login-error-message">
            Något verkar vara fel med dina inloggningsuppgifter
          </p>
        )}
        {!user && (
          <section
            data-cy="account-section"
            style={{
              display: "grid",
              justifyContent: "center",
              border: "1px solid white",
              borderRadius: "6px",
              alignItems: "center",
              gap: 5,
              padding: "3rem",
            }}
          >
            <h2
              data-cy="login-header"
              style={{ textAlign: "center", margin: 0 }}
            >
              Logga in
            </h2>
            <LoginForm setUser={onSubmit} />
          </section>
        )}
        {user && (
          <button
            data-test="logout-button"
            onClick={handleLogout}
            style={{ cursor: "pointer", marginTop: "15px" }}
          >
            Logga ut
          </button>
        )}
      </article>
    </>
  );
}

type SetUser = { setUser: (user: UsersType | null) => void };

export function LoginForm({ setUser }: SetUser) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [users, setUsers] = useState<UsersType[]>();

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch("/database-users.json");
        const users = await response.json();
        setUsers(users);
        console.log(users);
      } catch {
        console.log("Some error fetching users");
      }
    }
    getUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (users) {
      const user = users.find(
        (user) => user.email === form.email && user.password === form.password
      );
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      data-test="login-form"
      style={{
        display: "grid",
        gap: 2,
        padding: "1rem",
      }}
    >
      <label htmlFor="email" style={{ textAlign: "center" }}>
        email
      </label>
      <input
        onChange={handleChange}
        value={form.email}
        name="email"
        data-test="login-email-input"
        type="text"
        placeholder="email"
      />
      <label htmlFor="password" style={{ textAlign: "center" }}>
        lösenord
      </label>
      <input
        onChange={handleChange}
        value={form.password}
        name="password"
        data-test="login-password-input"
        type="password"
        placeholder="lösenord"
      />
      <input
        data-test="login-submit-input"
        type="submit"
        value="Logga in"
        style={{ cursor: "pointer", marginTop: "15px" }}
      />
    </form>
  );
}

export default Account;
