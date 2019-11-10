type Rouler = 3 | 4 | 5 | 6 | 7
type Sprinteur = 2 | 3 | 4 | 5 | 9
type Fatigue = 2

type Card = Rouler | Sprinteur | Fatigue
type Cards<T extends Rouler | Sprinteur> = [T, T, T, T, T]

interface Deck {
  readonly cards: ReadonlyArray<Card>
  readonly recycled: ReadonlyArray<Card>
}

function shuffle(cards: ReadonlyArray<Card>): ReadonlyArray<Card> {
  return [...cards].sort(() => Math.random() - 0.5)
}

function newDeck<T extends Rouler | Sprinteur>(...cards: Cards<T>): Deck {
  return {
    cards: shuffle([...cards, ...cards, ...cards]),
    recycled: []
  }
}

function draw(deck: Deck): [Deck, ReadonlyArray<Card>] {
  const { recycled, cards } = deck
  return cards.length === 0 && recycled.length === 0
    ? [{ recycled, cards }, [2]]
    : cards.length < 4
      ? _draw({ cards: [], ...deck }, cards)
      : [
          {
            ...deck,
            cards: deck.cards.slice(4)
          },
          deck.cards.slice(0, 4)
        ]
}

function _draw(
  deck: Deck,
  drawnCards: ReadonlyArray<Card>
): [Deck, ReadonlyArray<Card>] {
  return [
    {
      cards: shuffle(deck.recycled.slice(4 - drawnCards.length)),
      recycled: []
    },
    [...drawnCards, ...deck.recycled.slice(0, 4 - drawnCards.length)]
  ]
}

function recycle(deck: Deck, cards: ReadonlyArray<Card>): Deck {
  return {
    ...deck,
    recycled: deck.recycled.concat(cards)
  }
}

function addFatigue(deck: Deck): Deck {
  return {
    ...deck,
    recycled: deck.recycled.concat(2)
  }
}

export { addFatigue, recycle, draw, newDeck, Deck, Rouler, Sprinteur, Card }
