// tslint:disable:no-expression-statement
import { addFatigue, draw, newDeck, recycle, Rouler } from './deck'

describe('deck', () => {
  describe('addFatigue', () => {
    it('add a card of value 2 to the recycled', () => {
      expect(addFatigue({ cards: [], recycled: [] })).toEqual({
        cards: [],
        recycled: [2]
      })
    })
  })
  
  describe('recycle', () => {
    it('puts card in the recycled', () => {
      expect(recycle({ cards: [], recycled: [2] }, [3, 4, 5])).toEqual({
        cards: [],
        recycled: [2, 3, 4, 5]
      })
    })
  })

  describe('newDeck', () => {
    it('create a deck', () => {
      const { cards, recycled } = newDeck<Rouler>(3, 4, 5, 6, 7)
      expect(recycled).toEqual([])
      expect(cards.length).toBe(15)
      expect(cards).not.toEqual([3, 4, 5, 6, 7, 3, 4, 5, 6, 7, 3, 4, 5, 6, 7])
    })
  })

  describe('draw', () => {
    it('returns 4 cards from the deck', () => {
      const [deck, cards] = draw({ cards: [2, 3, 4, 5, 6], recycled: [] })
      expect(cards).toEqual([2, 3, 4, 5])
      expect(deck).toEqual({ recycled: [], cards: [6] })
    })
    it('returns a fatigue card if there are no available cards', () => {
      const [deck, cards] = draw({ cards: [], recycled: [] })
      expect(cards).toEqual([2])
      expect(deck).toEqual({ recycled: [], cards: [] })
    })
    describe('when there are not enough card to draw', () => {
      it('returns all the cards if there are no recycled cards', () => {
        const [deck, cards] = draw({ cards: [3, 4], recycled: [] })
        expect(cards).toEqual([3, 4])
        expect(deck).toEqual({ recycled: [], cards: [] })
      })
      it('returns available cards and cards from the recycled', () => {
        const [deck, cards] = draw({ cards: [3, 4], recycled: [5, 6] })
        expect(cards.includes(3)).toBeTruthy()
        expect(cards.includes(4)).toBeTruthy()
        expect(cards.includes(5)).toBeTruthy()
        expect(cards.includes(6)).toBeTruthy()
        expect(cards.length).toEqual(4)
        expect(deck).toEqual({ recycled: [], cards: [] })
      })
      it('returns 4 cards and put cards recycled back in the deck', () => {
        const [deck, cards] = draw({ cards: [2, 3, 4], recycled: [5, 6] })
        expect(cards.includes(2)).toBeTruthy()
        expect(cards.includes(3)).toBeTruthy()
        expect(cards.includes(4)).toBeTruthy()
        expect(cards.length).toEqual(4)

        expect(deck.recycled).toEqual([])
        expect(deck.cards.length).toEqual(1)
        expect([5,6].includes(deck.cards[0])).toBeTruthy()
        
        expect(deck.cards.concat(cards).sort()).toEqual([2, 3, 4, 5, 6])
      })
    })
  })
})
