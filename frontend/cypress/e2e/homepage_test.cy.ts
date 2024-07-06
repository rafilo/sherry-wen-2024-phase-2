beforeEach(() => {
  cy.visit('/')
});

describe('homepage test', () => {
  it('check google login icon', () => {
    cy.get('.google-login').should('be.visible')
  })
})