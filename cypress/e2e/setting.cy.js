  describe('Settings Page', () => {
    beforeEach(() => {
      cy.visit("/auth/login");
      cy.get('input[name="email"]').type("talha@idenbrid.com");
      cy.get('input[name="password"]').type("Idenbrid@123abc");
      cy.get('button[type="submit"]').click();
      cy.contains('設定').click();  
      cy.wait(1000); 
    });


        it('should Invalid Validate email input', () => {
          cy.get('input[name="email"]').type('invalid-email');
          cy.contains('保存').click();
          cy.contains('無効なメールアドレスです').should('be.visible');
        });

      it("should update email successfully", function () {
  
        cy.contains("メールアドレス").should(
          "be.visible"
        );
        cy.get('input[name="email"]').clear().type('amir@idenbrid.com');
        cy.contains('保存').click();
  
      }); 

      it('should Invalidate password input', () => {
        cy.get('input[name="password"]').type('Idenbrid@123abc');
        cy.get('input[name="newPassword"]').type('short');
        cy.get('input[name="confirmPassword"]').type('mismatch');
        cy.contains('パスワード更新').click();
        cy.contains('パスワードは8文字以上である必要があります').should('be.visible');
        cy.contains('パスワードが一致しません').should('be.visible');
      });

        it('should update password successfully', () => {
          cy.get('input[name="password"]').type('Idenbrid@123abc');
          cy.get('input[name="newPassword"]').type('Idenbrid@123abc');
          cy.get('input[name="confirmPassword"]').type('Idenbrid@123abc');
          cy.contains('パスワード更新').click();
          cy.contains('パスワードが正常に更新されました').should('be.visible');
        });

  });

