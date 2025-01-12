describe("homepage", () => {
  beforeEach(() => {
    cy.visit("https://cheery-chimera-131b01.netlify.app/#/");
  });

  it("all graphs load", () => {
    cy.get(".DonutChart");
    cy.get(".ProgressBar-static");
    cy.get(".PaceCalculator-text");
  });

  it("pace calculator works", () => {
    cy.get(".PaceCalculator-input").type(1);
    cy.get(".PaceCalculator-control-minus").click();
    cy.get(".PaceCalculator-control-plus").click().click();
  });
});

describe("all books page", () => {
  beforeEach(() => {
    cy.visit("https://cheery-chimera-131b01.netlify.app/#/all-books");
    cy.wait(3000);
  });

  it("books list loads with images", () => {
    cy.get(".AllBooksList").find("li").should("have.length.greaterThan", 2);
    //looking for al least one image
    cy.get(".AllBooksList").find(".AllBooksListRow-cover").should("exist");
  });

  it("filter loads and works", () => {
    cy.get("#selectedGenre").select("Classic Fiction");
    cy.get(".AllBooksList").find("li").should("have.length.greaterThan", 9);
  });

  it("pagination works", () => {
    //Find which is the last page
    cy.get(".Pagination-page")
      .last()
      .invoke("text")
      .then((text) => {
        cy.wrap(text).as("lastPage");
      });

    //Go to the last page and check books load
    cy.get("@lastPage").then((lastPage) => {
      cy.get(".Pagination-page").contains(lastPage).click();
      cy.get(".AllBooksList").find("li").should("have.length.greaterThan", 2);
    });

    //Go back to the first page
    cy.get(".Pagination-page").contains(1).click();

    //Find "AllBooksListRow-title"
    cy.get("@lastPage").then((lastPage) => {
      for (let page = 1; page < lastPage; ++page) {
        cy.log(page);
        cy.get(".Pagination-forward-back").last().click();
        //last page should have 3 books only
        //something is a bit weird here
      }
    });
  });
});

describe("handle lists", () => {
  beforeEach(() => {
    cy.visit("https://cheery-chimera-131b01.netlify.app/#/all-books");
    cy.wait(3000);
  });

  it("mark/unmark a book as 'to read'", () => {
    //Find a book that's not on the list, add it and keep the title
    cy.get(".AllBooksListRow-label")
      .contains("Add to list")
      .first()
      .parent()
      .find(".AllBooksListRow-icon-wrapper")
      .click() //Mark the book as to read
      .parent()
      .parent()
      .find(".AllBooksListRow-title")
      .invoke("text")
      .then((text) => {
        cy.wrap(text).as("selectedBook");
      });

    //Find the book in my-books and remove it
    cy.get("@selectedBook").then((selectedBook) => {
      cy.visit("https://cheery-chimera-131b01.netlify.app/#/my-books");
      cy.wait(1000);
      cy.get(".books-to-read")
        .find("strong")
        .contains(selectedBook)
        .parent()
        .parent()
        .parent()
        .find(".IconButton")
        .eq(2) //3rd button to remove from list
        .click();
    });
  });

  it("mark/unmark a book as 'read'", () => {
    //Find a book that's not on the list, add it and keep the title
    cy.get(".AllBooksListRow-label")
      .contains("Mark as read")
      .first()
      .parent()
      .find(".AllBooksListRow-icon-wrapper")
      .click() //Mark the book as read
      .parent()
      .parent()
      .find(".AllBooksListRow-title")
      .invoke("text")
      .then((text) => {
        cy.wrap(text).as("selectedBook");
      });

    //Find the book in my-books and remove it
    cy.get("@selectedBook").then((selectedBook) => {
      cy.visit("https://cheery-chimera-131b01.netlify.app/#/my-books");
      cy.wait(1000);
      cy.get(".books-read")
        .find("strong")
        .contains(selectedBook)
        .parent()
        .parent()
        .parent()
        .find(".IconButton") //only one button for read books
        .click();
    });
  });
});

describe.only("update pages", () => {
  it("ToRead >> Reading >> UpdatePage >> Remove ", () => {
    cy.visit("https://cheery-chimera-131b01.netlify.app/#/all-books");
    cy.wait(3000);

    //Find a book that's not on the list, add it and keep the title
    cy.get(".AllBooksListRow-label")
      .contains("Add to list")
      .first()
      .parent()
      .find(".AllBooksListRow-icon-wrapper")
      .click() //Mark the book as to read
      .parent()
      .parent()
      .find(".AllBooksListRow-title")
      .invoke("text") // Get the title of the book just marked as to read
      .then((text) => {
        cy.wrap(text).as("selectedBook");
      });

    //Move the book to reading
    cy.visit("https://cheery-chimera-131b01.netlify.app/#/my-books");
    cy.get("@selectedBook").then((selectedBook) => {
      //Find the book in to read and move it to reading
      cy.visit("https://cheery-chimera-131b01.netlify.app/#/my-books");
      cy.wait(1000);
      cy.get(".books-to-read")
        .find("strong")
        .contains(selectedBook)
        .parent()
        .parent()
        .parent()
        .find(".AllBooksListRow-icon-wrapper")
        .first() //1st button moves to reading
        .click();
    });

    /*

    //Update the page
    cy.get("@selectedBook").then((selectedBook) => {
      cy.get(".books-to-read")
        .find("strong")
        .contains(selectedBook)
        .parent()
        .click();
      cy.get("input").type("5");
      cy.get("button").click();
      cy.reload();
      cy.get("input").should("have.value", "5");
    });

    //Delete book from reading
    cy.get("@selectedBook").then((selectedBook) => {
      //Find the book in my-books and remove it
      cy.visit("https://cheery-chimera-131b01.netlify.app/#/my-books");
      cy.wait(1000);
      cy.get(".books-reading")
        .find("strong")
        .contains(selectedBook)
        .parent()
        .parent()
        .parent()
        .find(".IconButton")
        .eq(2) //3rd button to remove from list
        .click();
    }); */
  });
});
