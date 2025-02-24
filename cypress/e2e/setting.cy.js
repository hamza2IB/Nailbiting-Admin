describe('Settings Page', () => {
  beforeEach(() => {
    cy.visit("/auth/login");
    cy.get('input[name="email"]').type("talha@idenbrid.com");
    cy.get('input[name="password"]').type("NewPass123!");
    cy.get('button[type="submit"]').click();
    cy.contains('設定').click();
    cy.url().should("include", "/setting");
  });


  // it('should validate email input', () => {
  //   cy.get('input[name="email"]').type('invalid-email');
  //   cy.contains('保存').click();
  //   cy.contains('無効なメールアドレスです').should('be.visible');
  // });

  // it('should update email successfully', () => {
  //   cy.get('input[name="email"]').clear().type('talha@idenbrid.com');
  //   cy.contains('保存').click();
  //   cy.url().should('include', '/auth/register/confirm');
  // });

  // it('should validate password input', () => {
  //   cy.get('input[name="password"]').type('short');
  //   cy.get('input[name="newPassword"]').type('short');
  //   cy.get('input[name="confirmPassword"]').type('mismatch');
  //   cy.contains('パスワード更新').click();
  //   cy.contains('パスワードは8文字以上である必要があります').should('be.visible');
  //   cy.contains('パスワードが一致しません').should('be.visible');
  // });

  it('should update password successfully', () => {
    cy.get('input[name="password"]').type('CurrentPass123!');
    cy.get('input[name="newPassword"]').type('NewPass123!');
    cy.get('input[name="confirmPassword"]').type('NewPass123!');
    cy.contains('パスワード更新').click();
    cy.contains('パスワードが正常に更新されました').should('be.visible');
  });

  // it('should toggle password visibility', () => {
  //   cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  //   cy.get('input[name="newPassword"]').should('have.attr', 'type', 'password');
  //   cy.get('input[name="confirmPassword"]').should('have.attr', 'type', 'password');
    
  //   cy.get('input[name="password"]').parent().find('img').click();
  //   cy.get('input[name="password"]').should('have.attr', 'type', 'text');
  // });
});