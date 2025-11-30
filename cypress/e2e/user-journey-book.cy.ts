describe("User Journey Book", () => {
  it("A user visits the app and search for a book", () => {
    cy.visit("http://localhost:5173");

    cy.get('[data-test="test-booksearch"]').type("Harry Potter");
    cy.get('[data-test="test-submitbutton"]').click();
    cy.wait(2000);
    cy.get('[data-test="test-bookArticle"]').find("h2").eq(0).click();
    cy.location("href").should(
      "include",
      "http://localhost:5173/#/bookDetails/"
    );

    cy.get('[data-test="home-heading"]').click();
    cy.location("href").should("equal", "http://localhost:5173/#/");
  });
});
