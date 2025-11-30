describe("Home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  context("Navbar header", () => {
    it("Navbar elements are showing correct", () => {
      cy.get('[data-test="home-heading"]')
        .contains("Quotes & Books")
        .should("be.visible");
      cy.get("[data-test=toggle-theme-icon]").should("be.visible");
      cy.get("[data-test=account-icon]").should("be.visible");
    });
  });

  context("Quote section", () => {
    it("Elements are showing correct", () => {
      cy.get('[data-test="test-quotebuttons"]')
        .find("button")
        .should("have.length", 3);

      cy.get("[data-cy=input-buttons-container]")
        .find("button")
        .should("have.length", 3);
    });
  });
  context("Book section", () => {
    it("Elements are showing correct", () => {
      cy.get("[data-cy=book-search-header]")
        .contains("Hitta en bok")
        .should("be.visible");
      cy.get("[data-test=test-booksearch]")
        .type("J.R.R Tolkien")
        .should("have.value", "J.R.R Tolkien");
    });
  });
});
