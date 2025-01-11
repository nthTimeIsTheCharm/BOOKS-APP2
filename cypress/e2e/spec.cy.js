describe("load all the elements on homepage", () => {
  it("homepage elements load", () => {
    cy.visit("https://cheery-chimera-131b01.netlify.app/#/");
    cy.get(".DonutChart");
    cy.get(".ProgressBar-static");
    cy.get(".PaceCalculator-text");
  });

  it("uses the pace calculator", () => {
    cy.visit("https://cheery-chimera-131b01.netlify.app/#/");
    cy.get(".PaceCalculator-input").type(1);
    cy.get(".PaceCalculator-control-minus").click();
    cy.get(".PaceCalculator-control-plus").click().click();
  });
});

describe("all books page works", () => {
  it("books load", () => {
    cy.visit("https://cheery-chimera-131b01.netlify.app/#/all-books");
    cy.wait(3000);
    cy.get(".AllBooksList").find("li").should("have.length.greaterThan", 2);
    //images are loaded
    cy.get(".AllBooksList").find(".AllBooksListRow-cover").should("exist");
    //filter loads
    cy.get("#selectedGenre").select("Classic Fiction");

    //find the last page
    cy.get(".Pagination-page")
      .last()
      .invoke("text")
      .then((text) => {
        cy.log(text);
      });

    //marks book as to read
    cy.get(".AllBooksListRow-icon-wrapper").first().click();
    //marks book as read
    cy.get(".AllBooksListRow-icon").last().click();
  });
});

/* cy.get('your selector')
  .should('have.length.greaterThan', minRows)
  // now that we know the elements have loaded, get the number
  .its('length')
  .then(n => {
     // use n if you need to  
  }) */
