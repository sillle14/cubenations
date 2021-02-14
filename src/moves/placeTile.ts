import { Ctx } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'

import { BLACK, BLUE, Color } from '../static/colors'
import { Board, Coord } from '../models/board'
import { endAction, getAdjacentRegions } from './helpers'
import CNState from '../models/state'


export function canPlaceTile(destination: Coord, color: Color, board: Board): boolean {
    const target = board[destination.x][destination.y]

    // Can't place a tile if the space isn't empty.
    if (target.occupant) return false

    // Blue can only be placed on a river (and rivers can only hold blue)
    if (target.river !== (color === BLUE)) return false
    
    const regions = getAdjacentRegions(destination, board)
    
    const kingdoms = regions.filter(r => r.isKingdom)
    
    // Can't unite more than two kingdoms.
    if (kingdoms.length > 2) return false

    return true
}


export default function placeTile(G: CNState, ctx: Ctx, handIndex: number, destination: Coord) {
    const targetSpace = G.board[destination.x][destination.y]
    const tile = G.players[ctx.currentPlayer]!.hand[handIndex]!

    if (!canPlaceTile(destination, tile.color, G.board)) return INVALID_MOVE

    const regions = getAdjacentRegions(destination, G.board)

    const kingdoms = regions.filter(r => r.isKingdom)

    // Place the tile.
    targetSpace.occupant = tile
    G.players[ctx.currentPlayer]!.hand[handIndex] = null

    if (kingdoms.length === 2) {
        console.log('maybe war!') // TODO implement this
    } else if (kingdoms.length === 1) {
        // Award a point for the placed tile.
        const matchingLeaderPlayerID = kingdoms[0].leaders[tile.color]
        if (matchingLeaderPlayerID) {
            G.players[matchingLeaderPlayerID]!.points[tile.color] += 1
        } else {
            const blackLeaderPlayerID = kingdoms[0].leaders[BLACK]
            if (blackLeaderPlayerID) {
                G.players[blackLeaderPlayerID]!.points[tile.color] += 1
            }
        }
    } else {
        console.log('no points!')
    }

    // TODO: Check for monuments here.

    endAction(G, ctx)
}