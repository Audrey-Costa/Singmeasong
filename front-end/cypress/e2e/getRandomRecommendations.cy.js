describe('Test the get of a random recommendation', () => {
    it('Click in the random icon', () => {
      cy.visit('http://localhost:3000/');
        cy.get('[data-icon="random"]').click();
    });
});