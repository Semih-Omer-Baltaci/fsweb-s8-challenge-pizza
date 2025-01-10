describe('Pizza Order Form', () => {
  beforeEach(() => {
    // Visit the order page before each test
    cy.visit('/order')
  })

  it('should allow entering text in the name input', () => {
    // Test name input
    cy.get('input[name="name"]')
      .type('Test User')
      .should('have.value', 'Test User')
  })

  it('should allow selecting multiple toppings', () => {
    // Test selecting multiple toppings (4 selections)
    cy.get('input[type="checkbox"]').then($checkboxes => {
      // Select first 4 toppings
      for (let i = 0; i < 4; i++) {
        cy.wrap($checkboxes[i]).click()
      }
    })

    // Verify that 4 toppings are selected
    cy.get('input[type="checkbox"]:checked').should('have.length', 4)
  })

  it('should submit the form with valid data', () => {
    // Fill in required fields
    cy.get('input[name="name"]').type('Test User')
    
    // Select pizza size
    cy.get('input[type="radio"][value="medium"]').click()
    
    // Select toppings
    cy.get('input[type="checkbox"]').then($checkboxes => {
      for (let i = 0; i < 4; i++) {
        cy.wrap($checkboxes[i]).click()
      }
    })
    
    // Add notes
    cy.get('textarea[name="notes"]').type('Test order notes')
    
    // Submit form
    cy.get('button[type="submit"]').click()
    
    // Verify redirect to success page
    cy.url().should('include', '/success')
  })
})
