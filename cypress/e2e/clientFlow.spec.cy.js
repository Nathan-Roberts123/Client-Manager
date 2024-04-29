describe('Create update delete client', () => {
  it('Does it metch', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Add').click()

    cy.url().should('include', '/add-client')

    cy.get('[data-cy="name-filed"]').type('Test Client')
    cy.get('[data-cy="name-filed"]').should('have.value', 'Test Client')

    cy.get('[data-cy="email-filed"]').type('testclient@gmail.com')
    cy.get('[data-cy="email-filed"]').should(
      'have.value',
      'testclient@gmail.com'
    )

    cy.get('[data-cy="phone-filed"]').type('78788833')
    cy.get('[data-cy="phone-filed"]').should('have.value', '78788833')

    cy.get('[data-cy="address-filed"]').type('123 Test RD')
    cy.get('[data-cy="address-filed"]').should('have.value', '123 Test RD')

    cy.get('[data-cy="company-filed"]').type('space-test')
    cy.get('[data-cy="company-filed"]').should('have.value', 'space-test')

    cy.get('[data-cy="notes-filed"]').type(
      'Client for space-test, making a million doller deal'
    )
    cy.get('[data-cy="notes-filed"]').should(
      'have.value',
      'Client for space-test, making a million doller deal'
    )

    cy.get('[type="submit"]').click()
    cy.contains('Test Client successfully added')

    cy.get('[data-cy="Clients-link"]').click()

    cy.get('[name="edit Test Client"]').click()
    cy.contains('Delete').click()

    cy.contains('Test Client successfully deleted')
  })
})
