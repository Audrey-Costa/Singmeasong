describe("Test the upvote", ()=>{
    it("Click in the uparrow", ()=>{
        cy.visit('http://localhost:3000/');
        cy.get('[data-icon="down1"]').click();
    })
})