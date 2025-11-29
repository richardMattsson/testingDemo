import ToggleTheme from "../../src/components/ToggleTheme";

describe("ToggleTheme.cy.jsx", () => {
  it("exists", () => {
    cy.mount(<ToggleTheme theme={"dark"} updateTheme={() => {}} />);
    cy.get('[data-test="toggle-theme-icon"]').should("exist");
  });

  it("changes color when toggled", () => {
    cy.mount(<ToggleTheme theme={"dark"} updateTheme={() => {}} />);
    cy.get('[data-test="toggle-path"]').as("path");
    cy.get("@path").should("have.attr", "fill", "#fff");
    cy.get('[data-test="toggle-theme-icon"]').click();
    cy.get("@path").should("have.attr", "fill", "#000");
  });
});
