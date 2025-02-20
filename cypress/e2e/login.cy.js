describe('Fields Validation Check', function () {
	it('shows login form', function () {
		cy.visit('/auth/login') 
		cy.contains('ログインページ').should('be.visible')
	})
	it('show validation error on empty form', function () {
		cy.visit('/auth/login')
		cy.get('button[type="submit"]').click()
    cy.contains('メールアドレスは必須です').should('be.visible');
    cy.contains('パスワードは必須です').should('be.visible');
	})
	it('show validation error on empty email field', function () {
		cy.visit('/auth/login')
		cy.get('input[name="password"]').type('Something@123')
		cy.get('button[type="submit"]').click()
    cy.contains('メールアドレスは必須です').should('be.visible');
	})
	it('show validation error on invalid email and Password field', function () {
		cy.visit('/auth/login')
		cy.get('input[name="email"]').type('invalidEmail@gmail.com')
		cy.get('input[name="password"]').type('Something@123')
		cy.get('button[type="submit"]').click()
    cy.get('.toasty-msg').contains('No user found with the provided information.').should('be.visible')
	})

	it('show validation error on empty password field', function () {
		cy.visit('/auth/login')
		cy.get('input[name="email"]').type('email@gmail.com')
		cy.get('button[type="submit"]').click()
    cy.contains('パスワードは必須です').should('be.visible');
	})
})

describe("Login Successfully", function () {
  it("form will be submitted after successfully login", function () {
    cy.visit("/auth/login");
    cy.get('input[name="email"]').type("talha@idenbrid.com");
    cy.get('input[name="password"]').type("Idenbrid@123abc");
    cy.get('button[type="submit"]').click();  
    cy.url().should("eq", "http://localhost:3000/users");
  });

  it("show error toaster for not existable user", function () {
    cy.visit("/auth/login");
    cy.get('input[name="email"]').type("admin2@idenbrid.jp");
    cy.get('input[name="password"]').type("Idenbrid@123ab");
    cy.get('button[type="submit"]').click();
    cy.get(".toasty-msg")
      .contains("No user found with the provided information.")
      .should("be.visible");
  });
  it("shows loading spinner during login", function () {
    cy.visit("/auth/login");
    cy.get('input[name="email"]').type("talha@idenbrid.com");
    cy.get('input[name="password"]').type("Idenbrid@123abc");
    cy.get('button[type="submit"]').click();
    cy.contains('ログイン中...').should('be.visible');
  });
});

describe("Login check Api Successfully ", function () {
  it("logs in with correct credentials", () => {
    cy.visit("auth/login");

    cy.intercept("POST", "**/auth/login", (req) => {
      req.reply({
        statusCode: 200,
        body: { user: { accessToken: "mockToken", refreshToken: "mockRefreshToken" } },
      });
    }).as("loginRequest");

   
    cy.get('input[name="email"]').should("be.visible").type("talha@idenbrid.com");
    cy.get('input[name="password"]').should("be.visible").type("Idenbrid@123abc");
    cy.get('button[type="submit"]').should("be.visible").click();


    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    cy.url().should("eq", "http://localhost:3000/users");
  });
});




