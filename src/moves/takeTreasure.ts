import { Ctx, PlayerID } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'

import CNState from '../models/state'
import { TREASURE } from '../models/pieces'
import { Coord } from '../models/board'


export function canTakeTreasure(G: CNState, source: Coord, playerID: PlayerID): boolean {
    const availableTreasure = G.players[playerID]!.availableTreasure || []
    
    if (!availableTreasure.some(c => c.x === source.x && c.y === source.y)) return false

    // If any available treasures are on bordered squares, only those can be taken.
    const borderTreasure = availableTreasure.filter(c => G.board[c.x][c.y].border)
    if (!borderTreasure.length) return true

    return borderTreasure.some(c => c.x === source.x && c.y === source.y)
}


export default function takeTreasure(G: CNState, ctx: Ctx, source: Coord) {    
    if (!canTakeTreasure(G, source, ctx.playerID!)) return INVALID_MOVE

    // Remove the treasure and award the point.
    G.board[source.x][source.y].treasure = false
    G.players[ctx.playerID!]!.points[TREASURE] += 1
    G.players[ctx.playerID!]!.availableTreasure!.splice(G.players[ctx.playerID!]!.availableTreasure!.indexOf(source), 1)
    G.treasureCount -= 1

    // If less than two are available, end the stage.
    if (G.players[ctx.playerID!]!.availableTreasure!.length < 2) {
        // If more than one player is taking treasure, just end the stage.
        // Otherwise, end the turn.
        if (Object.keys(ctx.activePlayers!).length > 1) {
            ctx.events!.endStage!()
        } else {
            // The game ends if there are less than three treasures on the board.
            if (G.treasureCount < 3) {
                ctx.events!.endGame!({winnerIDs: []}) // TODO: Calculate winners
            }
            ctx.events!.endTurn!()
        }
    }
}