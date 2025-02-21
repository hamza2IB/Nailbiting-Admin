describe('Dashboard User Management', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type('talha@idenbrid.com');
    cy.get('input[name="password"]').type('Idenbrid@123abc');
    cy.get('button[type="submit"]').click();
    
    // Verify successful login and redirection to dashboard
    cy.url().should('include', '/users');
  });

  // it('Navigates to the Users page and checks user list', () => {
  //   // Navigate to Users Page
  //   cy.contains('ユーザー管理').click();
  //   cy.url().should('include', '/users');

  //   // Ensure users are listed
  //   cy.get('table').should('exist');
  //   cy.get('table tbody tr').should('have.length.greaterThan', 0);
  // });
  
  // it('Searches for a user', () => {
  //   cy.visit('/users');
  //   cy.get('input[placeholder="検索する"]').type('kashif@idenbrid.com');
  //   cy.wait(500); 
  //   cy.get('table tbody tr').should('contain', 'kashif@idenbrid.com');
  // });

  // it('Paginates through users', () => {
  //   cy.visit('/users');
  //   cy.get('button').contains('次').click();
  //   cy.url().should('include', '/users');
  // });
  
  it('Deletes a user', () => {
    cy.visit('/users');
    cy.get('button>svg').contains('削除').first().click();
    cy.get('button').contains('確認').click();
    cy.wait(500);
    cy.get('table tbody tr').should('have.length.lessThan', 10); // Ensure a user is removed
  });
});
