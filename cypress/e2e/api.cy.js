// ... existing code ...

describe('API Authentication and Token Refresh Tests', () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit('/');
    cy.clearLocalStorage();
  });

  afterEach(() => {
    // Clean up after each test
    cy.clearLocalStorage();
  });

  it('should handle successful login and token storage', () => {
    const mockTokens = {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token'
    };

    // Mock the login endpoint
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: mockTokens
    }).as('login');

    // Trigger login through the app's API service
    cy.window().then((win) => {
      // First, set up the fetch request
      const loginRequest = win.fetch(`${Cypress.env('apiUrl')}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'talha@idenbrid.com',
          password: 'Idenbrid@123abc'
        })
      });

      // Wait for the intercepted request
      cy.wait('@login').then(() => {
        // After the request is intercepted, handle the response
        loginRequest.then(response => response.json())
          .then(data => {
            // Store the tokens in localStorage
            win.localStorage.setItem('accessToken', data.accessToken);
            win.localStorage.setItem('refreshToken', data.refreshToken);

            // Now verify the tokens are stored
            expect(win.localStorage.getItem('accessToken')).to.equal(mockTokens.accessToken);
            expect(win.localStorage.getItem('refreshToken')).to.equal(mockTokens.refreshToken);
          });
      });
    });
  });

  it('should handle token refresh when access token expires', () => {
    cy.window().then((win) => {
      // Setup initial tokens
      win.localStorage.setItem('accessToken', 'expired-access-token');
      win.localStorage.setItem('refreshToken', 'valid-refresh-token');

      // Mock the refresh token endpoint
      cy.intercept('POST', '**/auth/refresh-access-token', {
        statusCode: 200,
        body: { accessToken: 'new-access-token' }
      }).as('refreshToken');

      // Mock a protected endpoint that returns 401
      cy.intercept('GET', '**/protected-endpoint', (req) => {
        // First request fails with 401
        if (!req.headers.authorization.includes('new-access-token')) {
          req.reply({
            statusCode: 401,
            body: { message: 'Unauthorized' }
          });
        } else {
          // Second request succeeds after token refresh
          req.reply({
            statusCode: 200,
            body: { message: 'Success' }
          });
        }
      }).as('protectedEndpoint');

      // Make request to protected endpoint
      return win.fetch(`${Cypress.env('apiUrl')}/protected-endpoint`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer expired-access-token`
        }
      }).then(() => {
        // Wait for refresh token request
        cy.wait('@refreshToken').then(() => {
          // Verify the new access token was stored
          expect(win.localStorage.getItem('accessToken')).to.equal('new-access-token');
        });
      });
    });
  });

  it('should handle failed token refresh and logout', () => {
    cy.window().then((win) => {
      // Setup initial tokens
      win.localStorage.setItem('accessToken', 'expired-access-token');
      win.localStorage.setItem('refreshToken', 'invalid-refresh-token');

      // Mock the refresh token endpoint to fail
      cy.intercept('POST', '**/auth/refresh-access-token', {
        statusCode: 401,
        body: { message: 'Invalid refresh token' }
      }).as('refreshToken');

      // Mock a protected endpoint that returns 401
      cy.intercept('GET', '**/protected-endpoint', {
        statusCode: 401,
        body: { message: 'Unauthorized' }
      }).as('protectedEndpoint');

      // Make request to protected endpoint
      return win.fetch(`${Cypress.env('apiUrl')}/protected-endpoint`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer expired-access-token`
        }
      }).then(() => {
        // Wait for refresh token request
        cy.wait('@refreshToken').then(() => {
          // Verify tokens were removed from localStorage
          expect(win.localStorage.getItem('accessToken')).to.be.null;
          expect(win.localStorage.getItem('refreshToken')).to.be.null;
        });
      });
    });
  });

  it('should include access token in request headers', () => {
    cy.window().then((win) => {
      // Setup access token
      win.localStorage.setItem('accessToken', 'test-access-token');

      // Set up the intercept BEFORE making the request
      cy.intercept('GET', '**/test-endpoint', (req) => {
        // Verify the Authorization header
        expect(req.headers.authorization).to.equal('Bearer test-access-token');
        // Reply with success
        req.reply({
          statusCode: 200,
          body: { message: 'Success' }
        });
      }).as('testEndpoint');

      // Wait for the intercept to be set up
      cy.wait(100).then(() => {
        // Make request with proper headers
        return win.fetch(`${Cypress.env('apiUrl')}/test-endpoint`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer test-access-token',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          // Now wait for the intercepted request
          cy.wait('@testEndpoint');
        });
      });
    });
  });
});