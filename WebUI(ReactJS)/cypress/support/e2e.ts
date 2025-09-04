import '@testing-library/cypress/add-commands';

Cypress.on('uncaught:exception', () => {
  // prevent Cypress from failing tests on unrelated app errors in dev
  return false;
});
