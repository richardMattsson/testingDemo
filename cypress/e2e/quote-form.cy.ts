describe("Quote form add, update, delete", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });
  it("add a quote using the form", () => {
    cy.get('[data-test="input-button-add"]').click();
    cy.get('[data-test="input-name-add"]').type("Wayne Gretzky");
    cy.get('[data-test="textarea-quote-add"]').type(
      "Yo miss 100% of all the shots you dont take."
    );
    cy.get('[data-test="submit-form-add"]').click();
  });

  it("update a quote using the form", () => {
    cy.get('[data-test="test-quotebutton-1"]').click();
    cy.get('[data-test="input-button-update"]').click();
    cy.get('[data-test="input-name-update"]').type("Albert Einstein");
    cy.get('[data-test="textarea-quote-update"]').type(
      "Imagination is more important than knowledge."
    );
    cy.get('[data-test="submit-form-update"]').click();
  });

  it("delete a quote using the form", () => {
    cy.get('[data-test="test-quotebutton-1"]').click();
    cy.get('[data-test="input-button-delete"]').click();
    cy.get('[data-test="test-quotebuttons-1"]').should("not.exist");
  });
});
