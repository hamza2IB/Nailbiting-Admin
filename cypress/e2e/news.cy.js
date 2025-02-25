describe('News Page Tests', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/login')
    cy.get('input[name="email"]').type('talha@idenbrid.com')
    cy.get('input[name="password"]').type('Idenbrid@123abc')
    cy.get('button[type="submit"]').click()
    cy.url().should('eq', 'http://localhost:3000/users')
    cy.visit('http://localhost:3000/news')
  })

  // it("should display news header with correct title and description", () => {
  //   cy.contains("お知らせ管理");
  //   cy.contains("このページからお知らせの新規作成や削除などができます");
  // });

  // it("should have a working create news button", () => {
  //   cy.get('a[href="/news/add"]')
  //     .should('exist')
  //     .and('contain', '新規作成');
  // });

  // it("should display loading shimmer while fetching news", () => {
  //   cy.get('[data-testid="news-shimmer"]').should('have.length', 4);
  // });

  // it("should display news cards when data is loaded", () => {
  //   cy.get('[data-testid="news-shimmer"]').should('not.exist');
  //   cy.get('[data-testid="news-card"]').should('have.length.at.least', 1);
  // });

  // it("should handle pagination correctly", () => {
  //   // Wait for loading to complete
  //   cy.get('[data-testid="news-shimmer"]').should('not.exist');

  //   // Test previous button disabled on first page
  //   cy.contains('button', '前へ')
  //     .should('be.disabled');

  //   // Click next page
  //   cy.contains('button', '次')
  //     .click();

  //   // Verify URL includes page parameter
  //   cy.url().should('include', 'page=2');

  //   // Previous button should be enabled on second page
  //   cy.contains('button', '前へ')
  //     .should('not.be.disabled');
  // });

  // it("should open delete modal when delete button is clicked", () => {
  //   // Wait for loading to complete
  //   cy.get('[data-testid="news-shimmer"]').should('not.exist');
  //   // Wait for news cards to be visible
  //   cy.get('[data-testid="news-card"]').should('be.visible');

  //   // Click the three dots icon to open the dropdown
  //   cy.get('img[src="/svgs/auth/threedots.svg"]')
  //     .first()
  //     .should('be.visible')
  //     .click();

  //   // Wait for dropdown to be visible
  //   cy.get('[data-testid="dropdown-menu"]').should('be.visible');

  //   // Now click the delete button in the dropdown
  //   cy.get('[data-testid="delete-button"]')
  //     .should('be.visible')
  //     .click();

  //   // Verify modal appears
  //   cy.contains('削除').should('be.visible');

  //   // Close modal
  //   cy.get('[data-testid="modal-close"]').click();
  //   cy.contains('動画の削除').should('not.exist');
  // });

  // it("should navigate to edit page when edit button is clicked", () => {
  //   // Wait for loading to complete
  //   cy.get('[data-testid="news-shimmer"]').should('not.exist');

  //   // Wait for news cards to be visible
  //   cy.get('[data-testid="news-card"]').should('be.visible');

  //   // Click the three dots icon to open the dropdown
  //   cy.get('img[src="/svgs/auth/threedots.svg"]')
  //     .first()
  //     .should('be.visible')
  //     .click();

  //   // Wait for dropdown to be visible
  //   cy.get('[data-testid="dropdown-menu"]').should('be.visible');

  //   // Click edit button in the dropdown
  //   cy.get('[data-testid="edit-button"]')
  //     .should('be.visible')
  //     .click();

  //   // Verify URL includes the news ID
  //   cy.url().should('include', '/news/add?id=');
  // });

  // it('should display empty state message when no news exists', () => {
  //   // Intercept the correct API endpoint
  //   cy.intercept('GET', 'https://nailbiting-server.vercel.app/api/v1/news/all*', {
  //     statusCode: 200,
  //     body: {
  //       success: true, // Add this if your API expects it
  //       data: {
  //         news: [],
  //         totalPages: 0,
  //       },
  //     },
  //   }).as('getEmptyNews')

  //   // Visit the news page
  //   cy.visit('http://localhost:3000/news')

  //   // Wait for the API call to complete
  //   cy.wait('@getEmptyNews')

  //   // Wait for loading state to finish
  //   cy.get('[data-testid="news-shimmer"]').should('not.exist')

  //   // Verify empty state message
  //   cy.contains('お知らせがありません。').should('be.visible')

  //   // Verify pagination is not shown
  //   cy.contains('button', '前へ').should('not.exist')
  //   cy.contains('button', '次').should('not.exist')
  // })
})

describe('News Update Operations', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/login')
    cy.get('input[name="email"]').type('talha@idenbrid.com')
    cy.get('input[name="password"]').type('Idenbrid@123abc')
    cy.get('button[type="submit"]').click()
    cy.url().should('eq', 'http://localhost:3000/users')
    cy.visit('http://localhost:3000/news')
  })

  // it('should successfully update a news item', () => {
  //   // Wait for loading to complete
  //   cy.get('[data-testid="news-shimmer"]').should('not.exist')
  //   cy.get('[data-testid="news-card"]').should('be.visible')

  //   // Open dropdown and click edit
  //   cy.get('img[src="/svgs/auth/threedots.svg"]').first().should('be.visible').click()

  //   cy.get('[data-testid="dropdown-menu"]').should('be.visible')
  //   cy.get('[data-testid="edit-button"]').click()

  //   // Verify we're on the edit page
  //   cy.url().should('include', '/news/add?id=')
  //   cy.contains('お知らせの編集').should('be.visible')

  //   // Update the form fields
  //   cy.get('input[name="title"]').clear().type('Updated Test Title')
  //   cy.get('.ql-editor').clear().type('Updated test content')

  //   // Initially, select field should not be visible
  //   cy.get('[data-testid="user-select"]').should('not.exist')

  //   // Test global/individual selection using the label click
  //   cy.contains('個人選択').click()

  //   // Switch back to global and verify select field disappears
  //   cy.contains('全員').click()
  //   cy.get('[data-testid="user-select"]').should('not.exist')

  //   // Intercept the update API call
  //   cy.intercept('PUT', '**/api/v1/news/update/*').as('updateNews')

  //   // Save changes
  //   cy.contains('保存変更').click()

  //   // Wait for the update request to complete
  //   // cy.wait('@updateNews')

  //   // Verify redirect back to news list
  //   cy.url().should('eq', 'http://localhost:3000/news')

  //   // Verify the update was successful
  //   cy.contains('お知らせ管理').should('be.visible')
  // })

  // it("should handle cancel during update", () => {
  //   // Wait for loading to complete
  //   cy.get('[data-testid="news-shimmer"]').should('not.exist');
  //   cy.get('[data-testid="news-card"]').should('be.visible');

  //   // Open dropdown and click edit
  //   cy.get('img[src="/svgs/auth/threedots.svg"]')
  //     .first()
  //     .should('be.visible')
  //     .click();

  //   cy.get('[data-testid="dropdown-menu"]').should('be.visible');
  //   cy.get('[data-testid="edit-button"]').click();

  //   // Verify we're on the edit page
  //   cy.url().should('include', '/news/add?id=');

  //   // Make some changes
  //   cy.get('input[name="title"]').clear().type('Cancelled Update');

  //   // Click cancel
  //   cy.contains('キャンセル').click();

  //   // Verify redirect back to news list
  //   cy.url().should('eq', 'http://localhost:3000/news');
  // });

  // it("should validate required fields during update", () => {
  //   // Wait for loading to complete
  //   cy.get('[data-testid="news-shimmer"]').should('not.exist');
  //   cy.get('[data-testid="news-card"]').should('be.visible');

  //   // Open dropdown and click edit
  //   cy.get('img[src="/svgs/auth/threedots.svg"]')
  //     .first()
  //     .should('be.visible')
  //     .click();

  //   cy.get('[data-testid="dropdown-menu"]').should('be.visible');
  //   cy.get('[data-testid="edit-button"]').click();

  //   // Clear required fields
  //   cy.get('input[name="title"]').clear();
  //   cy.get('.ql-editor').clear();

  //   // Try to save
  //   cy.contains('保存変更').click();

  //   // Verify validation messages
  //   cy.contains('タイトルは必須です').should('be.visible');
  //   cy.contains('本文は必須です').should('be.visible');
  //   cy.get('[data-testid="cancel-button"]').click();
  // })
})

describe('News Delete Operations', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/login')
    cy.get('input[name="email"]').type('talha@idenbrid.com')
    cy.get('input[name="password"]').type('Idenbrid@123abc')
    cy.get('button[type="submit"]').click()
    cy.url().should('eq', 'http://localhost:3000/users')
    cy.visit('http://localhost:3000/news')
  })

  // it("should successfully delete a news item", () => {
  //   // Wait for loading to complete
  //   cy.get('[data-testid="news-shimmer"]').should('not.exist');
  //   cy.get('[data-testid="news-card"]').should('be.visible');

  //   // Store initial count of news items
  //   cy.get('[data-testid="news-card"]').then(($cards) => {
  //     const initialCount = $cards.length;

  //     // Open dropdown and click delete
  //     cy.get('img[src="/svgs/auth/threedots.svg"]')
  //       .first()
  //       .should('be.visible')
  //       .click();

  //     cy.get('[data-testid="dropdown-menu"]').should('be.visible');
  //     cy.get('[data-testid="dropdown-menu"] [data-testid="delete-button"]').first().click();

  //     // Confirm deletion in the modal
  //     cy.get('.bg-red-600[data-testid="delete-button"]').click();

  //     // Wait for the deletion to complete and verify the count has decreased
  //     cy.get('[data-testid="news-card"]').should('have.length.lessThan', initialCount);
  //   });
  // });

  // it("should cancel delete operation when clicking cancel button", () => {
  //   // Wait for loading to complete
  //   cy.get('[data-testid="news-shimmer"]').should('not.exist');
  //   cy.get('[data-testid="news-card"]').should('be.visible');

  //   // Store initial count of news items
  //   cy.get('[data-testid="news-card"]').then(($cards) => {
  //     const initialCount = $cards.length;

  //     // Open dropdown and click delete
  //     cy.get('img[src="/svgs/auth/threedots.svg"]')
  //       .first()
  //       .should('be.visible')
  //       .click();

  //     cy.get('[data-testid="dropdown-menu"]').should('be.visible');
  //     cy.get('[data-testid="delete-button"]').click();

  //     // Click cancel button
  //     cy.contains('キャンセル').click();

  //     // Verify modal is closed
  //     cy.contains('動画の削除').should('not.exist');

  //     // Verify no items were deleted
  //     cy.get('[data-testid="news-card"]').should('have.length', initialCount);
  //   });
  // });

  // it("should close delete modal when clicking outside", () => {
  //   // Wait for loading to complete
  //   cy.get('[data-testid="news-shimmer"]').should('not.exist');
  //   cy.get('[data-testid="news-card"]').should('be.visible');

  //   // Open dropdown and click delete
  //   cy.get('img[src="/svgs/auth/threedots.svg"]')
  //     .first()
  //     .should('be.visible')
  //     .click();

  //   cy.get('[data-testid="dropdown-menu"]').should('be.visible');
  //   cy.get('[data-testid="delete-button"]').click();

  //   // Click outside the modal (on the overlay)
  //   cy.get('.pr-5').click({ force: true });

  //   // Verify modal is closed
  //   cy.contains('動画の削除').should('exist');

  //   cy.get('[data-testid="modal-close"]').click();
  // });

  // it('should handle API error during deletion', () => {
  //   // Intercept all DELETE requests to catch the actual endpoint
  //   cy.intercept('DELETE', '**/news/delete/*', {
  //     delay: 500,
  //     statusCode: 500,
  //     body: {
  //       success: false,
  //       message: 'Error deleting news',
  //     },
  //   }).as('deleteNews')

  //   // Log all network requests for debugging
  //   cy.intercept('**/*', (req) => {
  //     console.log('Request:', req.method, req.url)
  //   })

  //   // Wait for loading to complete
  //   cy.get('[data-testid="news-shimmer"]').should('not.exist')
  //   cy.get('[data-testid="news-card"]').should('be.visible')

  //   // Store initial count
  //   cy.get('[data-testid="news-card"]').then(($cards) => {
  //     const initialCount = $cards.length

  //     // Open dropdown and click delete
  //     cy.get('img[src="/svgs/auth/threedots.svg"]').first().should('be.visible').click()

  //     cy.get('[data-testid="dropdown-menu"]').should('be.visible')
  //     cy.get('[data-testid="dropdown-menu"] [data-testid="delete-button"]').first().click({ force: true })

  //     // Confirm deletion
  //     cy.get('.bg-red-600[data-testid="delete-button"]').should('be.visible').click({ force: true })

  //     // Wait for API call with longer timeout
  //     cy.wait('@deleteNews', { timeout: 10000 })

  //     // Verify items still exist
  //     cy.get('[data-testid="news-card"]').should('have.length', initialCount)
  //   })
  // })
})
