import { LoginForm } from "../../src/pages/Account.tsx";

describe("LoginForm", () => {
  beforeEach(() => {
    cy.intercept("/database-users.json", {
      body: [
        {
          id: 1,
          email: "Albert Einstein",
          password: "secret",
        },
        {
          id: 2,
          email: "Per",
          password: "123",
        },
        {
          id: 3,
          email: "Olof",
          password: "password",
        },
      ],
    }).as("users");

    const setUser = cy.spy().as("setUser");
    cy.mount(<LoginForm setUser={setUser} />);
    cy.wait("@users");
  });

  it("The form sends a valid user if user is registered", () => {
    cy.get('[data-test="login-email-input"]')
      .type("Per")
      .should("have.value", "Per");
    cy.get('[data-test="login-password-input"]')
      .type("123")
      .should("have.value", 123);
    cy.get('[data-test="login-submit-input"]').click();

    cy.get("@setUser").should("have.been.calledWith", {
      id: 2,
      email: "Per",
      password: "123",
    });
  });

  it("The form sends null if information is wrong", () => {
    cy.get('[data-test="login-email-input"]')
      .type("Pe")
      .should("have.value", "Pe");
    cy.get('[data-test="login-password-input"]')
      .type("123")
      .should("have.value", 123);
    cy.get('[data-test="login-submit-input"]').click();

    cy.get("@setUser").should("not.have.been.calledWith", {
      id: 2,
      email: "Pe",
      password: "123",
    });
  });
});
