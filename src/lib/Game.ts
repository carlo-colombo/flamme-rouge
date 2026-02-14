import { Card } from './deck.js'
import { Player } from './player.js'

import { typestate } from 'typestate'

interface Cyclist {
  readonly card: Card
}

interface Lane {
  readonly cyclist: Cyclist | null
}

interface Square {
  readonly left: Lane
  readonly right: Lane
}

type PlayersCount =
  | readonly [Player, Player]
  | readonly [Player, Player, Player]
  | readonly [Player, Player, Player, Player]

enum Phase {
  Setup,
  Energy,
  Movement,
  EndPhas,
  Finished,
}

interface Game {
  readonly players: PlayersCount
  readonly track: ReadonlyArray<Square>
  readonly state: typestate.FiniteStateMachine<Phase>
}

export { Game }
