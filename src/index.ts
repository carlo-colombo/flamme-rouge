type Rouler = 3 | 4 | 5 | 6 | 7;
type Sprinteur = 2|3|4|5 | 9;
type Fatigue = 2

type Card = Rouler | Sprinteur | Fatigue
type Cards<T extends Rouler | Sprinteur> = [T, T, T, T, T]

function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

class Deck<T extends Card> {
  cards: Array<Card>
  recycled: Array<Card>
  constructor( ...cards: Cards<T>) {
    this.cards = shuffle([
      ...cards,
      ...cards,
      ...cards
    ])
  }
  draw(): Array<Card> {
    return [
      this.cards.pop(),
      this.cards.pop(),
      this.cards.pop(),
      this.cards.pop(),
    ]
  }
  recycle(cards: Array<Card>): void {
    this.recycled = [...this.recycled, ...cards]
  }
  addFatigue():void {
    this.recycled = [...this.recycled, 2]
  }
}

type Color = "red" | "black" | "green" | "blue"

class Player {
  decks: {
    "rouler": Deck<Rouler>,
      "sprinteur": Deck<Sprinteur>
  }
  constructor(color: Color) {
    this.decks = {
      "rouler":    new Deck<Rouler>(3,4,5,6,7),
      "sprinteur":    new Deck<Sprinteur>(2,3,4,5,9),
    }
  }
}

const blue: Player = new Player("blue")

const hand = blue.decks.rouler.draw()
console.log(hand)
console.log(hand.pop())
blue.decks.rouler.recycle(hand)
console.log(blue.decks.rouler.cards)

