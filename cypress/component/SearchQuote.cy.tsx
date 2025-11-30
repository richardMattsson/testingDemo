import SearchQuote from "../../src/components/SearchQuote.tsx";

const quotes = [
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
];

describe("Testing SearchQuote component", () => {
  it("Mount and show result", () => {
    cy.mount(
      <SearchQuote
        text=""
        handleChange={() => {}}
        handleClick={() => {}}
        displayQuote={null}
        quotes={quotes}
      />
    );

    cy.get("[data-cy=filter]").should("have.value", "").should("be.visible");
    cy.get("[data-cy=filter]").type("Albert");
    cy.get('[data-test="test-quotebutton-1"]')
      .contains("Albert Einstein")
      .should("have.length", 1);
  });

  it("renders a loading message when quotes are null", () => {
    cy.mount(
      <SearchQuote
        text=""
        handleChange={() => {}}
        handleClick={() => {}}
        displayQuote={null}
        quotes={null}
      />
    );

    cy.get('[data-cy="loading-quotes-message"]')
      .contains("Laddar citat")
      .should("be.visible");
  });

  it("takes a text prop that sets the filter value", () => {
    cy.mount(
      <SearchQuote
        text="Albert"
        handleChange={() => {}}
        handleClick={() => {}}
        displayQuote={null}
        quotes={quotes}
      />
    );
    cy.get("[data-cy=filter]").should("have.value", "Albert");
  });

  it("button is disabled when displayQuote.name === quote.name", () => {
    cy.mount(
      <SearchQuote
        text=""
        handleChange={() => {}}
        handleClick={() => {}}
        quotes={quotes}
        displayQuote={quotes[0]}
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
    cy.mount(
      <SearchQuote
        text=""
        handleChange={() => {}}
        handleClick={onClickSpy}
        quotes={[quote]}
        displayQuote={null}
      />
    );
    cy.get('[data-test="test-quotebutton-1"]').click();
    cy.get("@onClickSpy").should("have.been.calledWith", quote);
  });
});
