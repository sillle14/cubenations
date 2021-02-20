import { Ctx, PlayerID } from 'boardgame.io'
import { Coord } from '../../models/board';
import { Monument, MONUMENT } from '../../models/pieces';
import CNState from '../../models/state'
import { Color, GREEN } from '../../static/colors';
import { TREASURE } from '../../static/stages';

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
                    return false
                })
            })
        })
        // Check for treasure. Treasure is only awarded to green leaders.
        const treasureStage: {[pid in PlayerID]?: string} = {}
        for (const pid in G.players) {
            const p = G.players[pid]!
            if (p.leaders[GREEN]) {
                const leaderRegion = breadthFirstSearch({start: p.leaders[GREEN]!, board: G.board})
                let availableTreasure: Array<Coord> = []
                leaderRegion.forEach((column, x) => {
                    column.forEach((space, y) => {
                        if (space && G.board[x][y].treasure) {
                            availableTreasure.push({x: x, y: y})
                        }
                    })
                })
                if (availableTreasure.length > 1) {
                    p.availableTreasure = availableTreasure
                    treasureStage[pid] = TREASURE
                }
            }
        }
        if (Object.keys(treasureStage).length) {
            ctx.events!.setActivePlayers!({value: treasureStage})
        } else {
            ctx.events!.endTurn!()
        }
    }
}
