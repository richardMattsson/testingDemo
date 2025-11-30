describe("Account page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/#/account");
  });
  it("page loads and elements are showing correct", () => {
    cy.get("[data-cy=login-header]").contains("Logga in").should("be.visible");
    cy.get("[data-cy=account-section]").find("form").should("exist");

    cy.get("[data-test=login-email-input]").should(
      "have.attr",
      "name",
      "email"
    );
    cy.get("[data-test=login-password-input]").should(
      "have.attr",
      "name",
      "password"
    );
    cy.get("[data-test=login-submit-input]").should(
      "have.attr",
      "type",
      "submit"
    );
  });
});
