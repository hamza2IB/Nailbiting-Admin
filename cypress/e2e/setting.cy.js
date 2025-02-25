  describe('Settings Page', () => {
    beforeEach(() => {
      cy.visit("/auth/login");
      cy.get('input[name="email"]').type("talha@idenbrid.com");
      cy.get('input[name="password"]').type("Idenbrid@123abc");
      cy.get('button[type="submit"]').click();
      cy.contains('設定').click();  
      cy.wait(1000);
    });


        // it('should Invalid Validate email input', () => {
        //   cy.get('input[name="email"]').type('invalid-email');
        //   cy.contains('保存').click();
        //   cy.contains('無効なメールアドレスです').should('be.visible');
        // });



      // it("should update email successfully", function () {
  
      //   cy.contains("メールアドレス").should(
      //     "be.visible"
      //   );
      //   cy.get('input[name="email"]').clear().type('talha@idenbrid.com');
      //   cy.contains('保存').click();
    
      //   cy.window().then((win) => {
      //     let attempts = 0;
      //     function getOtp() {
      //       return new Cypress.Promise((resolve, reject) => {
      //         const checkOtp = () => {
      //           const otp = win.localStorage.getItem("otp");
      //           console.log("Attempt", attempts, "Retrieved OTP:", otp);
    
      //           if (otp && otp.length >= 5) {
      //             resolve(otp);
      //           } else if (attempts < 10) {
      //             attempts++;
      //             setTimeout(checkOtp, 500);
      //           } else {
      //             reject(
      //               new Error("OTP not found in local storage or invalid format.")
      //             );
      //           }
      //         };
      //         checkOtp();
      //       });
      //     }
      //     return getOtp().then((otp) => {
      //       cy.get("#otp-0").type(otp[0]);
      //       cy.get("#otp-1").type(otp[1]);
      //       cy.get("#otp-2").type(otp[2]);
      //       cy.get("#otp-3").type(otp[3]);
      //       cy.get("#otp-4").type(otp[4]);
      //     });
      //   });
        
      //   cy.get('button[type="submit"]').click();
      //   cy.contains("パスワードリセット").should("be.visible");
      // });
    
      it("form will be submitted after successfully resetting the password", function () {
  
  
        cy.get('input[name="email"]').type("kashif@idenbrid.com");
        cy.contains('メールアドレス').should('be.visible');
        cy.contains('保存').click();
        cy.window().then((win) => {
          let attempts = 0;
          function getOtp() {
            return new Cypress.Promise((resolve, reject) => {
              const checkOtp = () => {
                const otp = win.localStorage.getItem("otp");
                console.log("Attempt", attempts, "Retrieved OTP:", otp);
    
                if (otp && otp.length >= 5) {
                  resolve(otp);
                } else if (attempts < 10) {
                  attempts++;
                  setTimeout(checkOtp, 500);
                } else {
                  reject(
                    new Error("OTP not found in local storage or invalid format.")
                  );
                }
              };
              checkOtp();
            });
          }
          return getOtp().then((otp) => {
            cy.get("#otp-0").type(otp[0]);
            cy.get("#otp-1").type(otp[1]);
            cy.get("#otp-2").type(otp[2]);
            cy.get("#otp-3").type(otp[3]);
            cy.get("#otp-4").type(otp[4]);
          });
        });
    
        cy.get('input[name="password"]').type("Idenbrid@123abc");
        cy.get('input[name="confirmPassword"]').type("Idenbrid@123abc");
        cy.get('button[type="submit"]').click();
        cy.contains("パスワードリセット").should("be.visible");
      });
    
      

      // it('should Invalidate password input', () => {
      //   cy.get('input[name="password"]').type('Idenbrid@123abc');
      //   cy.get('input[name="newPassword"]').type('short');
      //   cy.get('input[name="confirmPassword"]').type('mismatch');
      //   cy.contains('パスワード更新').click();z
      //   cy.contains('パスワードは8文字以上である必要があります').should('be.visible');
      //   cy.contains('パスワードが一致しません').should('be.visible');
      // });

      //   it('should update password successfully', () => {
      //     cy.get('input[name="password"]').type('Idenbrid@123abc');
      //     cy.get('input[name="newPassword"]').type('Idenbrid@123abc');
      //     cy.get('input[name="confirmPassword"]').type('Idenbrid@123abc');
      //     cy.contains('パスワード更新').click();
      //     cy.contains('パスワードが正常に更新されました').should('be.visible');
      //   });

  });

