describe("Fields Validation Check", function () {
  it("shows reset password form", function () {
    cy.visit("http://localhost:3001/auth/login");

    cy.contains("パスワードをお忘れの場合").click();
    cy.contains("下記よりパスワード変更の手続きを行えます").should(
      "be.visible"
    );
    cy.get('input[name="email"]').type("talha@idenbrid.com");
    cy.get('button[type="submit"]').click();
    cy.contains("新規パスワード作成").should("be.visible");
  });
  it("show validation error on empty form", function () {
    cy.visit("http://localhost:3001/auth/login");

    cy.contains("パスワードをお忘れの場合").click();
    cy.contains("下記よりパスワード変更の手続きを行えます").should(
      "be.visible"
    );
    cy.get('input[name="email"]').type("talha@idenbrid.com");
    cy.get('button[type="submit"]').click();
    cy.contains("新規パスワード作成").should("be.visible");
    cy.get('button[type="submit"]').click();
    cy.get(".border-red-500").should("be.visible");
    cy.contains("パスワードは必須です").should("be.visible");
    cy.contains("パスワードの確認は必須です").should("be.visible");
  });
  it("show validation error on empty Password field", function () {
    cy.visit("http://localhost:3001/auth/login");

    cy.contains("パスワードをお忘れの場合").click();
    cy.contains("下記よりパスワード変更の手続きを行えます").should(
      "be.visible"
    );
    cy.get('input[name="email"]').type("talha@idenbrid.com");
    cy.get('button[type="submit"]').click();
    cy.contains("新規パスワード作成").should("be.visible");
    cy.get("#otp-0").type("1");
    cy.get("#otp-1").type("2");
    cy.get("#otp-2").type("3");
    cy.get("#otp-3").type("4");
    cy.get("#otp-4").type("5");
    cy.get('button[type="submit"]').click();
    cy.contains("パスワードは必須です").should("be.visible");
    cy.contains("パスワードの確認は必須です").should("be.visible");
  });
  it("show weak password error", function () {
    cy.visit("http://localhost:3001/auth/login");

    cy.contains("パスワードをお忘れの場合").click();
    cy.contains("下記よりパスワード変更の手続きを行えます").should(
      "be.visible"
    );
    cy.get('input[name="email"]').type("talha@idenbrid.com");
    cy.get('button[type="submit"]').click();
    cy.contains("新規パスワード作成").should("be.visible");
    cy.get("#otp-0").type("1");
    cy.get("#otp-1").type("2");
    cy.get("#otp-2").type("3");
    cy.get("#otp-3").type("4");
    cy.get("#otp-4").type("5");
    cy.get('input[name="password"]').type("123@");
    cy.get('input[name="confirmPassword"]').type("123@");
    cy.get('button[type="submit"]').click();
    cy.get(".text-red-500")
      .contains("パスワードは8文字以上である必要があります")
      .should("be.visible");
  });
  it("show password format error", function () {
    cy.visit("http://localhost:3001/auth/login");

    cy.contains("パスワードをお忘れの場合").click();
    cy.contains("下記よりパスワード変更の手続きを行えます").should(
      "be.visible"
    );
    cy.get('input[name="email"]').type("talha@idenbrid.com");
    cy.get('button[type="submit"]').click();
    cy.contains("新規パスワード作成").should("be.visible");
    cy.get("#otp-0").type("1");
    cy.get("#otp-1").type("2");
    cy.get("#otp-2").type("3");
    cy.get("#otp-3").type("4");
    cy.get("#otp-4").type("5");
    cy.get('input[name="password"]').type("1234567");
    cy.get('input[name="confirmPassword"]').type("1234567");
    cy.get('button[type="submit"]').click();
    cy.get(".text-red-500")
      .contains("パスワードは8文字以上である必要があります")
      .should("be.visible");
  });
  it("show password mismatch", function () {
    cy.visit("http://localhost:3001/auth/login");

    cy.contains("パスワードをお忘れの場合").click();
    cy.contains("下記よりパスワード変更の手続きを行えます").should(
      "be.visible"
    );
    cy.get('input[name="email"]').type("talha@idenbrid.com");
    cy.get('button[type="submit"]').click();
    cy.contains("新規パスワード作成").should("be.visible");
    cy.get("#otp-0").type("1");
    cy.get("#otp-1").type("2");
    cy.get("#otp-2").type("3");
    cy.get("#otp-3").type("4");
    cy.get("#otp-4").type("5");
    cy.get('input[name="password"]').type("123456789@Abc");
    cy.get('input[name="confirmPassword"]').type("123456789@A");
    cy.get('button[type="submit"]').click();
    cy.get(".text-red-500")
      .contains("パスワードが一致しません")
      .should("be.visible");
  });
});

describe("Reset Password Attempt", function () {
    // it("form will be submitted after successfully reset password", function () {
    //   cy.visit("http://localhost:3001/auth/login");

    //   cy.contains("パスワードをお忘れの場合").click();
    //   cy.contains("下記よりパスワード変更の手続きを行えます").should(
    //     "be.visible"
    //   );
    //   cy.get('input[name="email"]').type("talha@idenbrid.com");
    //   cy.get('button[type="submit"]').click();
    //   cy.get("#otp-0").type("7");
    //   cy.get("#otp-1").type("6");
    //   cy.get("#otp-2").type("5");
    //   cy.get("#otp-3").type("6");	
    //   cy.get("#otp-4").type("9");
    //   cy.get('input[name="password"]').type("Idenbrid@123abc");
    //   cy.get('input[name="confirmPassword"]').type("Idenbrid@123abc");
    //   cy.get('button[type="submit"]').click();
    //   cy.get(".toasty-msg")
    //     .contains("Your password has been reset successfully.")
    //     .should("be.visible");
    // });
  it("show error toaster for invalid otp", function () {
    cy.visit("http://localhost:3001/auth/login");

    cy.contains("パスワードをお忘れの場合").click();
    cy.contains("下記よりパスワード変更の手続きを行えます").should(
      "be.visible"
    );
    cy.get('input[name="email"]').type("talha@idenbrid.com");
    cy.get('button[type="submit"]').click();
    cy.get("#otp-0").type("7");
    cy.get("#otp-1").type("6");
    cy.get("#otp-2").type("5");
    cy.get("#otp-3").type("6");
    cy.get("#otp-4").type("9");
    cy.get('input[name="password"]').type("Idenbrid@123abc");
    cy.get('input[name="confirmPassword"]').type("Idenbrid@123abc");
    cy.get('button[type="submit"]').click();
    cy.get(".toasty-msg")
      .contains("The OTP provided is invalid. Please check and try again.")
      .should("be.visible");
  });
});
