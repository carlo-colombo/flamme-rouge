import { Card } from './deck'
import { Player } from './player'

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
  | [Player, Player]
  | [Player, Player, Player]
  | [Player, Player, Player, Player]

enum Phase {
  Setup,
  Energy,
  Movement,
  EndPhas,
  Finished
}

const fsm = new typestate.FiniteStateMachine<Phase>(Phase.Setup)

interface Game {
  readonly players: PlayersCount
  readonly track: ReadonlyArray<Square>
  readonly state: typestate.FiniteStateMachine<Phase>
}

export { Game }
