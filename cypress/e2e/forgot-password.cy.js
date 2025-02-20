describe('Fields Validation Check', () => {
  beforeEach(() => {
    cy.visit('/auth/forgot-password');
  });
 
  it('should display an error message for an invalid email', () => {
    cy.visit('/auth/forgot-password');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.contains('無効なメールアドレスです');
  });
  it('should display an error message for an empty Field', () => {
    cy.visit('/auth/forgot-password');
    cy.get('button[type="submit"]').click()
    cy.contains('メールアドレスは必須です').should('be.visible');
  });

  it('should successfully submit the form with a valid email', () => {
    cy.visit('/auth/forgot-password');
    cy.intercept('POST', '**/auth/forgot-password', { statusCode: 200 }).as('forgotPassword');
    
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('button[type="submit"]').click();
    
    cy.wait('@forgotPassword');
    cy.contains('パスワードリセットのメールを送信しました');
  });

  it('should display an error message when API returns an error', () => {
    cy.visit('/auth/forgot-password');
    cy.intercept('POST', '**/auth/forgot-password', {
      statusCode: 400,
      body: { message: 'このメールアドレスは登録されていません' },
    }).as('forgotPasswordError');

    cy.get('input[name="email"]').type('unknown@example.com');
    cy.get('button[type="submit"]').click();
    
    cy.wait('@forgotPasswordError');
    cy.contains('このメールアドレスは登録されていません');
  });

  it('should navigate back to the login page when clicking the link', () => {
    cy.visit('/auth/forgot-password');
    cy.contains('ログインページに戻る').click();
    cy.url().should('include', '/auth/login');
  });
});
