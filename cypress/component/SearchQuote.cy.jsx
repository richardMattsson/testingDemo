import SearchQuote from "../../src/components/SearchQuote";

describe("Testing SearchQuote component", () => {
  it("Mount and show result", () => {
    cy.mount(
      <SearchQuote
        quotes={[
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
        ]}
      />
    );

    cy.get("[data-cy=filter]").should("have.value", "");
    cy.get("[data-cy=filter]").should("exist").type("Albert");
    cy.get('[data-test="test-quotebutton-1"]').contains("Albert Einstein");
  });

  it("takes a text prop that sets the filter value", () => {
    cy.mount(<SearchQuote text="Albert" />);
    cy.get("[data-cy=filter]").should("have.value", "Albert");
  });

  it("button is disabled when displayQuote.name === quote.name", () => {
    cy.mount(
      <SearchQuote
        handleClick={() => {}}
        quotes={[
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
        ]}
        displayQuote={{
          id: 1,
          name: "Albert Einstein",
          quote:
            "Life is like riding a bicycle. To keep your balance, you must keep moving.",
        }}
      />
    );
    cy.get('[data-test="test-quotebutton-1"]').should("be.disabled");
  });

  it("when a button is clicked it sends a quote", () => {
    const quote = {
      id: 1,
      name: "Albert Einstein",
      quote:
        "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    };
    const onClickSpy = cy.spy().as("onClickSpy");
    cy.mount(<SearchQuote handleClick={onClickSpy} quotes={[quote]} />);
    cy.get('[data-test="test-quotebutton-1"]').click();
    cy.get("@onClickSpy").should("have.been.calledWith", quote);
  });
});
