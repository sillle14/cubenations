import { Ctx } from 'boardgame.io'
import { Monument, MONUMENT } from '../../models/pieces';
import CNState from '../../models/state'
import { Color } from '../../static/colors';

import { breadthFirstSearch } from './regions'

/**
 * End a player's action, ending the turn if it was their second action, and refilling all players
 * tiles if so.
 *
 * @param G Game object
 * @param ctx Context object
 */

export function endAction(G: CNState, ctx: Ctx) {
    let player = G.players[ctx.currentPlayer]!;
    player.actions -= 1
    if (player.actions === 0) {
        player.actions = 2
        for (const playerID in G.players) {
            for (let i = 0; i < 6; i++) {
                if (!G.players[playerID]!.hand[i]) {
                    G.players[playerID]!.hand[i] = G.tileBag.pop()!
                }
            }
        }
        // Score monuments
        Object.entries(player.leaders).forEach(([color, position]) => {
            if (!position) return
            const leaderRegion = breadthFirstSearch({start: position, board: G.board})
            // Use some for early termination. Each loop ends if a monument of the leader's color is found.
            leaderRegion.some((column, x) => {
                return column.some((space, y) => {
                    if (!space) return false
                    if (G.board[x][y].occupant!.type !== MONUMENT) return false
                    // If there is a monument in the region of the same color as the leader, award
                    //  a point and return true so no other point is awarded.
                    if ((G.board[x][y].occupant! as Monument).colors.includes(color as Color)) {
                        player.points[color as Color] += 1
                        return true
                    }
                })
            })
        })
        // TODO: check for treasure
        ctx.events!.endTurn!()
    }
}
