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
    cy.intercept("https://www.googleapis.com/books/v1/volumes?q=*", {
      body: {
        items: [
          {
            id: "qzcQCwAAQBAJ",
            volumeInfo: {
              title: "Harry Potter och De Vises Sten",
              authors: ["J.K. Rowling"],
              imageLinks: {
                smallThumbnail:
                  "http://books.google.com/books/content?id=qzcQCwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
              },
              publishedDate: "2015-12-08",
              description:
                "Plötsligt händer det märkliga ting i den lilla staden! Mystiska stjärnskott på himlen och svärmar av ugglor mitt på dagen, katter som läser kartor och underliga människor som står i gathörnen och viskar. De viskar om en viss Harry Potter ... Föräldralöse Harry Potter bor hos sina elaka styvföräldrar och deras vidrige son. En helt ny värld öppnar sig för Harry när det visar sig att han egentligen är en trollkarl och börjar Hogwarths Skola för Häxkonster och Trolldom, en värld full av magi och spännande äventyr!",
              previewLink:
                "http://books.google.se/books?id=qzcQCwAAQBAJ&printsec=frontcover&dq=Harry+Potter&hl=&cd=1&source=gbs_api",
            },
          },
        ],
      },
    }).as("bookSearch");
    cy.get('[data-test="test-submitbutton"]').click();
    cy.wait("@bookSearch");
    cy.get('[data-test="test-bookTitle-qzcQCwAAQBAJ"]').click();
    cy.location("href").should(
      "equal",
      "http://localhost:5173/#/bookDetails/qzcQCwAAQBAJ"
    );

    cy.get('[data-test="home-heading"]').click();
    cy.location("href").should("equal", "http://localhost:5173/#/");
  });
});
