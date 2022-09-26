describe('Test the insertion of a recommendation', () => {
  it('Digit in the inputs e continue', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-input="Name"]').type("Billie Eilish Special Acoustic Show");
    cy.get('[data-input="Link"]').type("https://www.youtube.com/watch?v=bwbaZ9qCSAE");
    cy.get('[data-button="enter"]').click();
  })
})