describe("Dashboard User Management", () => {
  beforeEach(() => {
    cy.visit("/auth/login");
    cy.get('input[name="email"]').type("talha@idenbrid.com");
    cy.get('input[name="password"]').type("Idenbrid@123abc");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/users");
  });

  it("Navigates to the Users page and checks user list", () => {
    cy.contains("ユーザー管理").click();
    cy.url().should("include", "/users");
    cy.get("table").should("exist");
    cy.get("table tbody tr").should("have.length.greaterThan", 0);
  });

  it("Searches for a user", () => {
    cy.visit("/users");
    cy.get('input[placeholder="検索する"]').type("kashif@idenbrid.com");
    cy.wait(500);
    cy.get("table tbody tr").should("contain", "kashif@idenbrid.com");
  });

  it("Paginates through users", () => {
    cy.visit("/users");
    cy.get("button").contains("次").click();
    cy.url().should("include", "/users");
  });

  it("should delete the user", () => {
    cy.wait(10000);
    cy.get("#trash-icon-btn").click();

    cy.get("table tbody tr");
    cy.get(".delete-btn").click();
  });
  it("should View the user", () => {
   
    cy.get("#eye-icon-btn").click();
    cy.wait(5000);
    cy.contains("ユーザー詳細").should("be.visible");
    cy.contains("自己評価").should("be.visible");
  });
  it("should View the user in self Valuation Tab", () => {
  
    cy.get("#eye-icon-btn").click();
    cy.wait(10000);
    cy.contains("ユーザー詳細").should("be.visible");
    cy.wait(5000);
    cy.get(".self-btn").click();
    cy.contains("月の選択").should("be.visible");
    cy.wait(5000);
    cy.get(".other-photo").click();
  });
});
