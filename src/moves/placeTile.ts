import { Ctx } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'

import { BLACK, BLUE } from '../static/colors'
import { Coord } from '../models/board'
import { getAdjacentRegions } from './helpers'
import CNState from '../models/state'


export default function placeTile(G: CNState, ctx: Ctx, source: number, x: number, y: number) {
    const destination = {x: x, y: y} // TODO: Input a coord instead
    const targetSpace = G.board[destination.x][destination.y]
    const tile = G.players[ctx.currentPlayer]!.hand[source]

    // Can't place a tile if the space isn't empty.
    if (targetSpace.occupant) return INVALID_MOVE

    // Blue can only be placed on a river (and rivers can only hold blue)
    if (targetSpace.river !== (tile.color === BLUE)) return INVALID_MOVE

    const regions = getAdjacentRegions(destination, G.board)
    console.log(regions) // TODO

    const kingdoms = regions.filter(r => r.isKingdom)

    // Can't unite more than two kingdoms.
    if (kingdoms.length > 2) return INVALID_MOVE

    // Place the tile.
    targetSpace.occupant = G.players[ctx.currentPlayer]!.hand[source]
    G.players[ctx.currentPlayer]!.hand.splice(source, 1)

    if (kingdoms.length === 2) {
        console.log('maybe war!') // TODO implement this
    } else if (kingdoms.length === 1) {
        // Award a point for the placed tile.
        const matchingLeaderPlayerID = kingdoms[0].leaders[tile.color]
        if (matchingLeaderPlayerID) {
            console.log(`${tile.color} point to ${matchingLeaderPlayerID}`)
            G.players[matchingLeaderPlayerID]!.points[tile.color] += 1
        } else {
            const blackLeaderPlayerID = kingdoms[0].leaders[BLACK]
            if (blackLeaderPlayerID) {
                console.log(`${tile.color} point to ${blackLeaderPlayerID}`)
                G.players[blackLeaderPlayerID]!.points[tile.color] += 1
            }
        }
    } else {
        console.log('no points!')
    }

    // TODO: Check for monuments here.
}