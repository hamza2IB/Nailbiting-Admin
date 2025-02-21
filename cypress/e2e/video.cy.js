describe('ExercisesPage Tests', function () {
  beforeEach(() => {
    // Log in and navigate to the ExercisesPage
    cy.visit('http://localhost:3000/auth/login')
    cy.get('input[name="email"]').type('talha@idenbrid.com')
    cy.get('input[name="password"]').type('Idenbrid@123abc')
    cy.get('button[type="submit"]').click()
    cy.url().should('eq', 'http://localhost:3000/users')
    cy.visit('http://localhost:3000/videos')
  })

  // it('should load the page and display the table or empty state message', () => {
  //   cy.contains('動画管理').should('exist'); // Check for the page title
  //   cy.contains('このページから動画の登録や削除などができます').should('exist'); // Check for description

  //   // If no videos exist, check for the empty state message
  //   cy.get('table').then(($table) => {
  //     if ($table.length === 0) {
  //       cy.contains('動画が見つかりませんでした。').should('exist');
  //     } else {
  //       cy.get('table tbody tr').should('have.length.gt', 0); // Ensure rows exist
  //     }
  //   });
  // });

  // it('should display error messages for invalid or empty fields', () => {
  //   // Open the add video modal
  //   cy.contains('新規追加')
  //     .should('be.visible')
  //     .click();

  //   // Submit empty form
  //   cy.get('[data-testid="save-video-button"]')
  //     .should('be.visible')
  //     .click({ force: true });

  //   // Check error messages appear in the correct places
  //   cy.get('input[name="youtubeLink"]')
  //     .should('have.class', 'border-red-500')
  //     .parent()
  //     .find('p.text-red-500')
  //     .should('contain', 'リンクは必須です');

  //   cy.get('input[name="title"]')
  //     .should('have.class', 'border-red-500')
  //     .parent()
  //     .find('p.text-red-500')
  //     .should('contain', 'タイトルは必須です');

  //   cy.get('textarea[name="description"]')
  //     .should('have.class', 'border-red-500')
  //     .parent()
  //     .find('.text-red-500')
  //     .should('contain', '説明は必須です');

  //   // Test invalid URL validation
  //   cy.get('input[name="youtubeLink"]')
  //     .type('invalid-url')
  //     .blur();

  //   cy.get('input[name="youtubeLink"]')
  //     .parent()
  //     .find('p.text-red-500')
  //     .should('contain', '有効なURLを入力してください');

  //   // Verify error styling is applied
  //   cy.get('input[name="youtubeLink"]').should('have.class', 'border-red-500');
  //   cy.get('input[name="title"]').should('have.class', 'border-red-500');
  //   cy.get('textarea[name="description"]').should('have.class', 'border-red-500');
  // })

  // it('should allow adding a new video', () => {
  //   // First verify we're on the correct page
  //   cy.url().should('include', '/videos');

  //   // Check if the add button exists and is clickable
  //   cy.contains('新規追加')
  //     .should('be.visible')
  //     .should('not.be.disabled')
  //     .click();

  //   // Verify the modal is open and form fields are visible
  //   cy.get('input[name="youtubeLink"]')
  //     .should('be.visible')
  //     .type('https://www.youtube.com/watch?v=YwVM_A8iR4I');

  //   cy.get('input[name="title"]')
  //     .should('be.visible')
  //     .type('Test Video Title');

  //   cy.get('textarea[name="description"]')
  //     .should('be.visible')
  //     .type('This is a test video description.');

  //   // Verify save button exists and click it
  //   cy.get('[data-testid="save-video-button"]')
  //     .should('be.visible')
  //     .should('not.be.disabled')
  //     .click({ force: true });

  //   // Verify the modal is closed
  //   cy.contains('動画の追加').should('not.exist');

  //   // Wait for the POST request and verify response
  //   cy.intercept('POST', '**/api/videos').as('addVideo');

  //   // Reload and verify the new video appears
  //   cy.reload();

  //   // Wait for the table and verify content
  //   cy.get('table').should('exist');
  //   cy.get('tbody tr').should('have.length.at.least', 1);

  //   // Look for the video title in the table
  //   cy.contains('tbody tr', 'Test Video Title')
  //     .should('exist')
  //     .within(() => {
  //       cy.get('[data-testid="video-title"]')
  //         .should('be.visible')
  //         .and('contain', 'Test Video Title');
  //     });
  // });

  // it('should close modal when clicking cancel button or outside modal', () => {
  //   // Open the modal
  //   cy.contains('新規追加')
  //     .should('be.visible')
  //     .click();

  //   // Verify modal is open by checking for modal content
  //   cy.get('#modal-content').should('be.visible');
  //   cy.contains('動画追加').should('be.visible');

  //   // Test closing with cancel button
  //   cy.contains('キャンセル').click();
  //   cy.get('#modal-content').should('not.exist');

  //   // Reopen modal
  //   cy.contains('新規追加').click();
  //   cy.get('#modal-content').should('be.visible');

  //   // Test closing by clicking outside
  //   cy.get('.bg-black.bg-opacity-50') // Modal overlay
  //     .click('topLeft'); // Click outside the modal content
  //   cy.get('#modal-content').should('not.exist');

  //   // Reopen modal and fill some data
  //   cy.contains('新規追加').click();
  //   cy.get('input[name="title"]').type('Test Title');
  //   cy.get('textarea[name="description"]').type('Test Description');

  //   // Close with cancel button and verify data is cleared
  //   cy.contains('キャンセル').click();

  //   // Reopen and verify fields are empty
  //   cy.contains('新規追加').click();
  //   cy.get('input[name="title"]').should('have.value', '');
  //   cy.get('textarea[name="description"]').should('have.value', '');
  // });

  // it('should delete the video at index 4 using video ID', () => {
  //   cy.wait(5000)
  //   cy.contains('table tr', 'Test Video Title').within(() => {
  //     cy.get('.rounded.p-2').click() // Replace with actual class or data attribute
  //   })
  //   // Delete the video at index 4 (5th video, since index is 0-based)
  //   cy.get('[data-testid="delete-button"]')

  //     .click()

  //   // Verify delete confirmation modal appears
  //   cy.contains('動画の削除').should('be.visible')
  //   cy.contains('実行してよろしいですか？このアクションは取り消すことができません。').should('be.visible')
  // })

  it('should shuffle existing video rows and save', () => {
    // Visit the video management page
    cy.visit('http://localhost:3000/videos') // Adjust the URL as needed

    // Verify that there are existing videos
    cy.get('table tbody tr').should('have.length.gte', 1) // Ensure there is at least one video

    // Log the current state of the DOM
    cy.get('body').then(($body) => {
      cy.log('Current DOM:', $body.html())
    })

    // Wait for the shuffle button to be visible
    cy.get('[data-testid="shuffle-button"]', { timeout: 15000 }) // Increase timeout if necessary
      .should('be.visible')
      .click() // Click the shuffle button

    // Verify that the rows have been shuffled
    cy.get('table tbody tr').then(($rows) => {
      const titlesBeforeShuffle = $rows.map((index, row) => Cypress.$(row).find('td').eq(0).text()).get() // Assuming title is in the first column
      cy.log('Titles Before Shuffle:', titlesBeforeShuffle)

      // Click the shuffle button again to get the new order
      cy.get('[data-testid="shuffle-button"]').click() // Click the shuffle button again

      cy.get('table tbody tr').then(($newRows) => {
        const titlesAfterShuffle = $newRows.map((index, row) => Cypress.$(row).find('td').eq(0).text()).get()
        cy.log('Titles After Shuffle:', titlesAfterShuffle)

        // Check that the order has changed
        expect(titlesBeforeShuffle).not.to.deep.equal(titlesAfterShuffle)
      })
    })

    // Click the 保存 button to save the shuffled order
    cy.get('[data-testid="save-button"]').click() // Adjust the selector as needed

    // Verify that the save action was successful
    cy.intercept('POST', '**/api/videos/save').as('saveVideos') // Adjust the endpoint as needed
    cy.wait('@saveVideos').then((interception) => {
      expect(interception.response.statusCode).to.eq(200) // Check for successful save
    })

    // Optionally, verify that the order is preserved after saving
    cy.get('table tbody tr').then(($rows) => {
      const titlesAfterSave = $rows.map((index, row) => Cypress.$(row).find('td').eq(0).text()).get()
      cy.log('Titles After Save:', titlesAfterSave)
      // You can add assertions here to check if the order is as expected
    })
  })
})
