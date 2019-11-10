import { Deck, newDeck, Rouler, Sprinteur } from './deck'

type Color = 'red' | 'black' | 'green' | 'blue'

interface Player {
  readonly color: Color
  readonly decks: {
    readonly rouler: Deck
    readonly sprinteur: Deck
  }
}

function newPlayer(color: Color): Player {
  return {
    color,
    decks: {
      rouler: newDeck<Rouler>(3, 4, 5, 6, 7),
      sprinteur: newDeck<Sprinteur>(2, 3, 4, 5, 9)
    }
  }
}

export { newPlayer, Player }
