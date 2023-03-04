import { Move, PlayerID } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'

import CNState from '../models/state'
import { TREASURE } from '../models/pieces'
import { Coord } from '../models/board'
import calculateWinners from './helpers/gameOver'


export function canTakeTreasure(G: CNState, source: Coord, playerID: PlayerID): boolean {
    const availableTreasure = G.players[playerID]!.availableTreasure || []
    
    if (!availableTreasure.some(c => c.x === source.x && c.y === source.y)) return false

    // If any available treasures are on bordered squares, only those can be taken.
    const borderTreasure = availableTreasure.filter(c => G.board[c.x][c.y].border)
    if (!borderTreasure.length) return true

    return borderTreasure.some(c => c.x === source.x && c.y === source.y)
}


const takeTreasure: Move<CNState> = ({G, ctx, playerID, events}, source: Coord) => {    
    if (!canTakeTreasure(G, source, playerID)) return INVALID_MOVE

    // Remove the treasure and award the point.
    G.board[source.x][source.y].treasure = false
    G.players[playerID].score[TREASURE] += 1
    G.players[playerID].availableTreasure = G.players[playerID].availableTreasure!.filter(c => c.x !== source.x && c.y !== source.y)
    G.treasureCount -= 1

    // If less than two are available, end the stage.
    if (G.players[playerID].availableTreasure!.length < 2) {
        // If more than one player is taking treasure, just end the stage.
        // Otherwise, end the turn.
        if (Object.keys(ctx.activePlayers!).length > 1) {
            events.endStage!()
        } else {
            // The game ends if there are less than three treasures on the board.
            if (G.treasureCount < 3) {
                events.endGame!({winnerIDs: calculateWinners(G, ctx)})
            }
            events.endTurn!()
        }
    }
}

export default takeTreasure
