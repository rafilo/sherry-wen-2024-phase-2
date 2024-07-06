beforeEach(() => {
  cy.visit('/')
});

describe('homepage test', () => {
  it('check google login icon', () => {
    cy.getTestDom('google-login').should('be.visible')
  })
})