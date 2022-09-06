
describe('First Page Test', () => {
  it('Vist tictac toe page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy="x-letter"]').click()
    cy.contains('NEW GAME (VS PLAYER)').click()
  })
  
})

describe('Second page test', () => {
  it('Play the game', () => {
    cy.get('[data-cy="game-board"]').click()
  })
  
})

describe('Game against each other', () => {
  it('Play the game', () => {
    cy.get('[data-cy="click-o"]').click()
  })
  
})

describe('Restart game', () => {
  it('Clicks the restart button', () => {
    cy.get('[data-testid="restart-game"]').click()
  })
  
})

describe('Choose restart options', () => {
  it('Restarts the game', () => {
    cy.contains('YES, RESTART').click()
  })
  
})
