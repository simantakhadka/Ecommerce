describe('Login Functionality Tests for Foodmandu', () => {
  
    // This runs before each individual test in the block
    beforeEach(() => {
      // Navigate to the Foodmandu login page before each test
      cy.visit('https://foodmandu.com/');
      // Locate the 'Login' button and click it
      cy.contains('button', 'Login').click();  
    });
  
    // Test to check if an error message is shown with invalid credentials
    it('Display error message with invalid credentials', () => {
      // Type invalid email and password
      cy.get('[name="Email"]').type('invalidUser@gmail.com');
      cy.get('[name="Password"]').type('invalidPassword');
      cy.contains('button', 'Login').click();
      // Check if the error message is visible
      cy.contains("Invalid login attempt. Register if you don't have an account yet.").should('be.visible');
      // Ensure that the URL navigates to Account/Login page
      cy.url().should('include', '/Account/Login');
    });
  
    // Test to check if validation message appears when the Email field is empty
    it('Display validation message for empty Email field', () => {
      // Type a password (Email is left empty)
      cy.get('[name="Password"]').type('1232134324@#$');
      cy.contains('button', 'Login').click();
      // Ensure that the validation message "Please fill out this field" is displayed
      cy.get('[name="Email"]').invoke('prop', 'validationMessage').should('equal', 'Please fill out this field.').wait(1000);
    });
  
    // Test to check if a validation message appears when the password field is empty
    it('Display validation message for empty Password field', () => {
      // Type a email (Password is left empty)
      cy.get('[name="Email"]').type('valid@gmail.com.np');
      cy.contains('button', 'Login').click();
      // Ensure that the validation message "Please fill out this field" is displayed
      cy.get('[name="Password"]').invoke('prop', 'validationMessage').should('equal', 'Please fill out this field.').wait(1000);
    });
  
    // Test to check if an invalid email format displays the required validation message
    it('Display validation message for invalid email format', () => {
      // Type an invalid email format (missing @)
      cy.get('[name="Email"]').type('invalidemailformat.com');
      cy.contains('button', 'Login').click();
      // Ensure the email field shows the expected validation message about missing '@'
      cy.get('[name="Email"]').invoke('prop', 'validationMessage').should('equal', "Please include an '@' in the email address. 'invalidemailformat.com' is missing an '@'.").wait(1000);
    });
  
    // Test to check if the email validation works for incorrect positioning of '.' in the domain
    it('Display validation message for incorrect email . position', () => {
      // Type an invalid email with an incorrect position for the period
      cy.get('[name="Email"]').type('invalidemail@com.');
      cy.contains('button', 'Login').click();
      // Ensure the email field shows the expected validation message about incorrect positioning of '.'
      cy.get('[name="Email"]').invoke('prop', 'validationMessage').should('equal', "'.' is used at a wrong position in 'com.'.").wait(1000);
    });
  
    // Test to check if the password is masked while typing
    it('Ensure password is masked while typing', () => {
      cy.get('[name="Password"]').type('ValidPassword123');
      cy.get('[name="Password"]').should('have.attr', 'type', 'password').wait(1000);
    });
});
