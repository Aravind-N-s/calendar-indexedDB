/* eslint-disable indent */
import { format, addDays } from "date-fns";

const month = format(new Date(), "MMMM yyy");
const day = format(new Date(), "cccccc");
describe("[Cypress] Calendar", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe("Calendar UI Test", () => {
    it("Initial Test", () => {
      cy.log("Testing Landing Page of the Application");
      cy.get("h6").first().should("contain", "Calendar");
      cy.get("h6").eq(1).should("contain", month);
      cy.get("table").should("exist");
      cy.get("th")
        .eq(1)
        .within(() => {
          cy.get("span").should("contain", `${day}`).should("contain", "Today");
        });
    });

    it("First Column Test Case", () => {
      cy.log("Testing Column of the current Date");
      cy.get("th")
        .eq(1)
        .within(() => {
          cy.get("span").should("contain", `${day}`).should("contain", "Today");
        });
    });

    it("Week Header Test Case", () => {
      cy.log("Testing Column of the week Date");
      for (let i = 1; i < 7; i++) {
        const newDay = format(addDays(new Date(), i), "cccccc");
        const newDate = format(addDays(new Date(), i), "dd");
        cy.get("th")
          .eq(i + 1)
          .within(() => {
            cy.get("span")
              .should("contain", `${newDay}`)
              .should("contain", `${newDate}`);
          });
      }
    });

    it("Row Time Series Test Case", () => {
      cy.log("Testing Row having time");
      cy.get("tbody").within(() => {
        cy.get("tr").should("have.length", 23);
        for (let i = 1; i <= 23; i++) {
          cy.get("tr").should("contain", `${i}:00`);
        }
      });
    });
  });

  describe("Previous Button", () => {
    it("First Column Test Case", () => {
      const prevDay = format(addDays(new Date(), -7), "cccccc");
      const prevDate = format(addDays(new Date(), -7), "dd");
      cy.log("Testing Previous Button");
      cy.get(".MuiButtonGroup-root").within(() => {
        cy.get("span").contains("Previous Week").click();
      });
      cy.get("th")
        .eq(1)
        .within(() => {
          cy.get("span")
            .should("contain", `${prevDay}`)
            .should("contain", `${prevDate}`);
        });
    });

    it("Week Header Test Case", () => {
      cy.log("Testing Previous Button headers");
      cy.get(".MuiButtonGroup-root").within(() => {
        cy.get("span").contains("Previous Week").click();
      });
      for (let i = 1; i < 7; i++) {
        const newDay = format(addDays(new Date(), i - 7), "cccccc");
        const newDate = format(addDays(new Date(), i - 7), "dd");
        cy.get("th")
          .eq(i + 1)
          .within(() => {
            cy.get("span").should("contain", newDay).should("contain", newDate);
          });
      }
    });

    it("Month Header Test Case", () => {
      const prevMonth = format(addDays(new Date(), -31), "MMMM yyy");
      cy.log("Testing Previous Button App Month Name");
      for (let i = 0; i < 4; i++) {
        cy.get(".MuiButtonGroup-root").within(() => {
          cy.get("span").contains("Previous Week").click();
        });
      }
      cy.get("h6").eq(1).should("contain", prevMonth);
    });
  });

  describe("Forward Button", () => {
    it("First Column Test Case", () => {
      const nextDay = format(addDays(new Date(), 7), "cccccc");
      const nextDate = format(addDays(new Date(), 7), "dd");
      cy.log("Testing Previous Button");
      cy.get(".MuiButtonGroup-root").within(() => {
        cy.get("span").contains("Next Week").click();
      });
      cy.get("th")
        .eq(1)
        .within(() => {
          cy.get("span")
            .should("contain", `${nextDay}`)
            .should("contain", `${nextDate}`);
        });
    });

    it("Week Header Test Case", () => {
      cy.log("Testing Previous Button headers");
      cy.get(".MuiButtonGroup-root").within(() => {
        cy.get("span").contains("Next Week").click();
      });
      for (let i = 1; i < 7; i++) {
        const newDay = format(addDays(new Date(), i + 7), "cccccc");
        const newDate = format(addDays(new Date(), i + 7), "dd");
        cy.get("th")
          .eq(i + 1)
          .within(() => {
            cy.get("span").should("contain", newDay).should("contain", newDate);
          });
      }
    });

    it("Month Header Test Case", () => {
      const nextMonth = format(addDays(new Date(), 31), "MMMM yyy");
      cy.log("Testing Previous Button Monthf headers");
      for (let i = 0; i < 4; i++) {
        cy.get(".MuiButtonGroup-root").within(() => {
          cy.get("span").contains("Next Week").click();
        });
      }
      cy.get("h6").eq(1).should("contain", nextMonth);
    });
  });

  describe("Back To Today Test", () => {
    it("First Column Test Case", () => {
      const nextDay = format(addDays(new Date(), 7), "cccccc");
      const nextDate = format(addDays(new Date(), 7), "dd");
      const prevDay = format(addDays(new Date(), -7), "cccccc");
      cy.log("Testing Forward then backward check");
      cy.get(".MuiButtonGroup-root").within(() => {
        cy.get("span").contains("Next Week").click();
      });
      cy.get("th")
        .eq(1)
        .within(() => {
          cy.get("span")
            .should("contain", `${nextDay}`)
            .should("contain", `${nextDate}`);
        });

      cy.get(".MuiButtonGroup-root").within(() => {
        cy.get("span").contains("Previous Week").click();
      });
      cy.get("th")
        .eq(1)
        .within(() => {
          cy.get("span")
            .should("contain", `${prevDay}`)
            .should("contain", "Today");
        });
    });

    it("First Column Test Case", () => {
      const nextDay = format(addDays(new Date(), 7), "cccccc");
      const prevDate = format(addDays(new Date(), -7), "dd");
      const prevDay = format(addDays(new Date(), -7), "cccccc");
      cy.log("Testing backward then forward check");
      cy.get(".MuiButtonGroup-root").within(() => {
        cy.get("span").contains("Previous Week").click();
      });
      cy.get("th")
        .eq(1)
        .within(() => {
          cy.get("span")
            .should("contain", `${prevDay}`)
            .should("contain", prevDate);
        });

      cy.get(".MuiButtonGroup-root").within(() => {
        cy.get("span").contains("Next Week").click();
      });
      cy.get("th")
        .eq(1)
        .within(() => {
          cy.get("span")
            .should("contain", `${nextDay}`)
            .should("contain", "Today");
        });
    });
  });

  describe("Testing Calendar Day", () => {
    it("Data of Previous Month Test Case", () => {
      cy.log("Testing Previous Button without data");
      cy.get(".MuiButtonGroup-root").within(() => {
        cy.get("span").contains("Previous Week").click();
      });
      cy.get("tr").within(() => {
        cy.get("span").should("contain", "");
      });
    });

    it("First Column Test Case", () => {
      cy.log("Testing Column of the current Date");
      cy.get(".MuiButtonGroup-root").within(() => {
        cy.get("span").contains("Previous Week").click();
      });
      cy.get("th")
        .eq(1)
        .within(() => {
          cy.get("span").should("not.contain", "Today");
        });
    });
  });
});
