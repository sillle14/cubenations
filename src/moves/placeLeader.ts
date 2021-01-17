import { Ctx } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'

import { Color } from '../static/colors'
import { getAdjacentRegions, getNeighbors, isRedTile } from './helpers'
import CNState from '../models/state'
import { Leader } from '../models/pieces'


export default function placeLeader(G: CNState, ctx: Ctx, color: Color, x: number, y: number) {
    const destination = {x: x, y: y} // TODO: Input a coord instead
    const targetSpace = G.board[destination.x][destination.y]

    // Can't place a leader if the space isn't empty.
    if (targetSpace.occupant) return INVALID_MOVE

    // Leaders can't be placed on rivers.
    if (targetSpace.river) return INVALID_MOVE

    // Leaders must have a neighboring red tile.
    const neighbors = getNeighbors(destination, G.board)
    if (!neighbors.some(c => isRedTile(c, G.board))) {
        return INVALID_MOVE
    }

    // Remove the old leader before checking for revolt.
    const oldPosition = G.players[ctx.currentPlayer]!.leaders[color]
    if (oldPosition) {
        G.board[oldPosition.x][oldPosition.y].occupant = undefined
    }

    const regions = getAdjacentRegions(destination, G.board)

    const kingdoms = regions.filter(r => r.isKingdom)

    // Can't unite kingdoms with a leader.
    if (kingdoms.length > 1) {
        // Replace the leader where it was.`
        if (oldPosition) {
            G.board[oldPosition.x][oldPosition.y].occupant = new Leader(color, ctx.currentPlayer)
        }
        return INVALID_MOVE
    }
    
    // Place the leader
    targetSpace.occupant = new Leader(color, ctx.currentPlayer)
    G.players[ctx.currentPlayer]!.leaders[color] = destination

    // If the existing kingdom contains the leader, a revolt occurs.
    if (kingdoms.length === 1 && kingdoms[0].leaders[color]) {
        console.log('revolt!') // TODO implement this
    }
}