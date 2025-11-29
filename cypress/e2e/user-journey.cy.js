describe("User Journey", () => {
  it("A user visits the app and navigates through the content", () => {
    cy.visit("http://localhost:5173");

    cy.get('[data-test="test-quotebutton-1"]').click();
    cy.get('[data-test="test-quote"]').should("exist").should("be.visible");

    cy.get('[data-cy="filter"]').type("osc");
    cy.get('[data-test="test-quotebuttons"]').children().eq(0).click();
    cy.get('[data-test="test-quote"]').should("exist").should("be.visible");

    cy.get('[data-test="input-button-add"]').click();
    cy.get('[data-test="input-name-add"]').type("Wayne Gretzky");
    cy.get('[data-test="textarea-quote-add"]').type(
      "Yo miss 100% of all the shots you dont take."
    );
    cy.get('[data-test="submit-form-add"]').click();
    cy.get('[data-test="test-quote"]')
      .contains("Wayne Gretzky")
      .should("be.visible");

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
