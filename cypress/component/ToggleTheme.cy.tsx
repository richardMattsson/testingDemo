import ToggleTheme from "../../src/components/ToggleTheme.tsx";

describe("ToggleTheme.cy.jsx", () => {
  beforeEach(() => {
    cy.mount(<ToggleTheme theme={"dark"} updateTheme={() => {}} />);
  });
  it("exists", () => {
    cy.get('[data-test="toggle-theme-icon"]').should("exist");
  });

  it("changes color when toggled", () => {
    cy.get('[data-test="toggle-path"]').as("path");
    cy.get("@path").should("have.attr", "fill", "#fff");
    cy.get('[data-test="toggle-theme-icon"]').click();
    cy.get("@path").should("have.attr", "fill", "#000");
  });
});
