describe('Homepage', () => {
  it('finds the content "description"', () => {
    cy.visit('http://localhost:4200/');

    cy.get('.description').should('exist');
  });
});
