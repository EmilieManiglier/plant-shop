describe('Public routes', () => {
  it('displays email and password placeholder fields', () => {
    cy.visit('/');

    cy.contains('Email');
    cy.contains('Mot de passe');
  });
});
