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

  // it('should load the page and display the table or empty state message',()=>{
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

  //   // Verify save button exists and click it.
  //   cy.get('[data-testid="save-video-button"]')
  //     .should('be.visible')
  //     .should('not.be.disabled')
  //     .click({ force: true });

  //   // Verify the modal is closed
  //   cy.contains('動画の追加').should('not.exist');

  //   // Look for the video title in the table
  //   cy.contains('tbody tr', 'Test Video Title')
  //     .should('exist')
  //     .within(() => {
  //       cy.get('[data-testid="video-title"]')
  //         .should('be.visible')
  //         .and('contain', 'Test Video Title');
  //     });
  // });

  // it('should close delete modal when clicking cancel button or outside modal', () => {
  //   // Wait for the page to load and ensure the video exists
  //   cy.wait(5000);

  //   // Locate the video row with the title 'Test Video Title' and click the delete button
  //   cy.contains('table tr', 'Test Video Title').within(() => {
  //     cy.get('[data-testid="delete-video-button"]').click(); // Click the delete button
  //   });

  //   // Verify the delete confirmation modal is open
  //   cy.get('[data-testid="delete-modal"]').should('be.visible');

  //   // Test closing the modal using the cancel button
  //   cy.contains('キャンセル').click(); // Click the cancel button
  //   cy.get('[data-testid="delete-modal"]').should('not.exist'); // Verify the modal is closed

  //   // Reopen the delete modal
  //   cy.contains('table tr', 'Test Video Title').within(() => {
  //     cy.get('[data-testid="delete-video-button"]').click(); // Click the delete button again
  //   });

  //   // Verify the modal is open again
  //   cy.get('[data-testid="delete-modal"]').should('be.visible');

  //   // Test closing the modal by clicking outside (on the overlay)
  //   cy.get('[data-testid="delete-modal-overlay"]') // Modal overlay
  //     .click('topLeft', { force: true }); // Click outside the modal content
  //   cy.get('[data-testid="delete-modal"]').should('not.exist'); // Verify the modal is closed
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
  //   cy.contains('動画管理').should('be.visible')
  //   cy.contains('このページから動画の登録や削除などができます').should('be.visible')
  // })

  // it('should allow dragging and dropping a video row', () => {
  //   // Wait for the page to load and ensure the table is rendered
  //   cy.wait(5000); // Adjust the wait time as needed
  //   cy.get('table tbody tr').should('have.length.gt', 0);

  //   // Get the first and second video rows
  //   const draggableItem = cy.get('table tbody tr').eq(0); // First row
  //   const dropTarget = cy.get('table tbody tr').eq(1); // Second row

  //   // Simulate drag-and-drop
  //   draggableItem.trigger('mousedown', { which: 1, button: 0 });
  //   dropTarget.trigger('mousemove').trigger('mouseup', { force: true });

  //   // Verify that the rows have been reordered
  //   cy.get('table tbody tr').eq(0).should('contain', 'Test'); // Assuming "Video 2" is the title of the second video
  //   cy.get('table tbody tr').eq(1).should('contain', '3rd'); // Assuming "Video 1" is the title of the first video
  // });

  // it('should move video up and down when dragging', () => {
  //   cy.get('[data-testid^="video-row-"]')
  //     .first()
  //     .invoke('attr', 'data-testid')
  //     .then((firstVideoId) => {
  //       cy.get('[data-testid^="video-row-"]')
  //         .eq(1)
  //         .invoke('attr', 'data-testid')
  //         .then((secondVideoId) => {
  //           cy.get(`[data-testid="${firstVideoId}"]`).trigger('dragstart');
  //           cy.get(`[data-testid="${secondVideoId}"]`).trigger('drop');
  //           cy.get('button').contains('保存').click();
  //           cy.get(`[data-testid="${firstVideoId}"]`).should('not.have.text', 'Test');
  //         });
  //     });
  // });
})
