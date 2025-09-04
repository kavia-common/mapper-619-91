describe('Authentication', () => {
  it('Shows login page and validates form', () => {
    cy.visit('/login');
    cy.findByRole('heading', { name: /sign in to your account/i }).should('exist');
    cy.findByRole('button', { name: /sign in/i }).click();
    cy.findByText(/username is required/i).should('exist');
    cy.findByText(/password is required/i).should('exist');
  });
});
