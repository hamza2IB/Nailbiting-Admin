describe("Fields Validation Check", () => {
  beforeEach(() => {
    cy.visit("/auth/forgot-password");
  });

  it("should display an error message for an invalid email", () => {
    cy.visit("http://localhost:3000/auth/login");

    cy.contains("パスワードをお忘れの場合").click();
    cy.contains("下記よりパスワード変更の手続きを行えます").should(
      "be.visible"
    );
    cy.get('input[name="email"]').type("invalid-email");
    cy.get('button[type="submit"]').click();
    cy.contains("無効なメールアドレスです");
  });
  it("should display an error message for an empty Field", () => {
    cy.visit("http://localhost:3000/auth/login");

    cy.contains("パスワードをお忘れの場合").click();
    cy.contains("下記よりパスワード変更の手続きを行えます").should(
      "be.visible"
    );
    cy.get('button[type="submit"]').click();
    cy.contains("メールアドレスは必須です").should("be.visible");
  });

  it("should successfully submit the form with a valid email", () => {
    cy.visit("http://localhost:3000/auth/login");

    cy.contains("パスワードをお忘れの場合").click();
    cy.contains("下記よりパスワード変更の手続きを行えます").should(
      "be.visible"
    );
    cy.intercept("POST", "**/auth/forgot-password", { statusCode: 200 }).as(
      "forgotPassword"
    );

    cy.get('input[name="email"]').type("talha@idenbrid.com");
    cy.get('button[type="submit"]').click();

    cy.wait("@forgotPassword");
    cy.contains("パスワードリセットのメールを送信しました");
  });

  it("should display an error message when API returns an error", () => {
    cy.visit("http://localhost:3000/auth/login");

    cy.contains("パスワードをお忘れの場合").click();
    cy.contains("下記よりパスワード変更の手続きを行えます").should(
      "be.visible"
    );
    cy.intercept("POST", "**/auth/forgot-password", {
      statusCode: 400,
      body: { message: "このメールアドレスは登録されていません" },
    }).as("forgotPasswordError");

    cy.get('input[name="email"]').type("unknown@example.com");
    cy.get('button[type="submit"]').click();

    cy.wait("@forgotPasswordError");
    cy.contains("このメールアドレスは登録されていません");
  });
});
