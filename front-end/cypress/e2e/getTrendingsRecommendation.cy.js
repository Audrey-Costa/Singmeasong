describe('Test the get of the trendings recommendations', () => {
    it('Click in the trendings icon', () => {
      cy.visit('http://localhost:3000/');
        cy.get('[data-icon="trendings"]').click();
    });
});