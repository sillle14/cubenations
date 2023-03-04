import { Move } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'

import { safeRemoveTile } from './helpers/utility'
import { endAction } from "./helpers/endAction"
import CNState from '../models/state'
import { Catastrophe, TILE } from '../models/pieces'
import { Board, Coord } from '../models/board'


export function canPlaceCatastrophe(destination: Coord, board: Board): boolean {
    const target = board[destination.x][destination.y]

    // Can only place on empty squares and tiles without treasure.
    if (target.occupant && target.occupant.type !== TILE) return false

    if (target.treasure) return false

    return true
}


const placeCatastrophe: Move<CNState> = ({G, ctx, events}, destination: Coord) => {    
    if (!canPlaceCatastrophe(destination, G.board)) return INVALID_MOVE

    // TODO: Confirm here. Actually, this is a little weird, annoying to undo

    safeRemoveTile(destination, G.board, G.players)
    G.board[destination.x][destination.y].occupant = new Catastrophe()
    G.players[ctx.currentPlayer]!.catastrophes -= 1
    endAction(G, ctx, events)
}

export default placeCatastrophe