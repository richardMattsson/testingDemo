describe("User Journey Quote", () => {
  it("A user visits the app and integrates with the quote-section", () => {
    cy.visit("http://localhost:5173");
    cy.intercept("/database.json", {
      body: [
        {
          id: 1,
          name: "Albert Einstein",
          quote:
            "Life is like riding a bicycle. To keep your balance, you must keep moving.",
        },
        {
          id: 2,
          name: "Oscar Wilde",
          quote: "Be yourself; everyone else is already taken.",
        },
        {
          id: 3,
          name: "William Shakespeare",
          quote: "To be or not to be, that is the question.",
        },
      ],
    }).as("quotes");

    cy.wait("@quotes");

    cy.get('[data-test="test-quotebutton-1"]').click();
    cy.get('[data-test="test-quote"]').should("exist").should("be.visible");

    cy.get('[data-cy="filter"]').type("osc");
    cy.get('[data-test="test-quotebuttons"]').children().eq(0).click();
    cy.get('[data-test="test-quote"]').should("exist").should("be.visible");

    cy.get('[data-test="input-button-add"]').click();
    cy.get('[data-test="input-name-add"]').type("Wayne Gretzky");
    cy.get('[data-test="textarea-quote-add"]').type(
      "You miss 100% of all the shots you dont take."
    );
    cy.get('[data-test="submit-form-add"]').click();
    cy.get('[data-test="test-quote"]')
      .contains("Wayne Gretzky")
      .should("be.visible");
  });
});
