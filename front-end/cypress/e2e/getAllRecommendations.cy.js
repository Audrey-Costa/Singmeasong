describe('Test the get all recommendations', () => {
    it('Click in the home icon', () => {
      cy.visit('http://localhost:3000/');
        cy.get('[data-icon="home"]').click();
    });
});