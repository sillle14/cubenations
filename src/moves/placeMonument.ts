import { Move } from 'boardgame.io'
import { Coord } from '../models/board'

import CNState from '../models/state'
import { endAction } from "./helpers/endAction"
import { safeRemoveTile } from './helpers/utility'

const placeMonument: Move<CNState> = ({G, ctx, events}, position: Coord, idx: number) => {

    const monument = G.monuments[idx]
    // Position is the top left of the monument.
    const coords = [
        position,
        {x: position.x + 1, y: position.y},
        {x: position.x + 1, y: position.y + 1},
        {x: position.x, y: position.y + 1},
    ]

    coords.forEach(c => {
        safeRemoveTile(c, G.board, G.players)
        G.board[c.x][c.y].occupant = monument
    })
    monument.position = position

    delete G.availableMonumentColor
    delete G.possibleMonuments
    events.endStage!()
    endAction(G, ctx, events)
}

export default placeMonument
