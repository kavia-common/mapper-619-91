describe('Protected Routing', () => {
  it('Redirects unauthenticated user to /login', () => {
    cy.clearLocalStorage();
    cy.visit('/dashboard');
    cy.location('pathname').should('eq', '/login');
  });
});
