import { Ctx, Move, PlayerID, StageArg } from 'boardgame.io'
import { EventsAPI } from 'boardgame.io/dist/types/src/plugins/plugin-events';
import { Coord } from '../../models/board';
import { Monument, MONUMENT } from '../../models/pieces';
import CNState from '../../models/state'
import { Color, GREEN } from '../../static/colors';
import { TREASURE } from '../../static/stages'
import calculateWinners from './gameOver'

import { breadthFirstSearch } from './regions'

/**
 * End a player's action, ending the turn if it was their second action, and refilling all players
 * tiles if so.
 *
 * @param G Game object
 * @param ctx Context object
 */

export function endAction(G: CNState, ctx: Ctx, events: EventsAPI) {
    let player = G.players[ctx.currentPlayer];
    player.actions -= 1
    if (player.actions === 0) {
        player.actions = 2
        for (const playerID in G.players) {
            for (let i = 0; i < 6; i++) {
                if (!G.players[playerID].hand[i]) {
                    const tile = G.tileBag.pop()
                    if (!tile) {
                        events.endGame!({winnerIDs: calculateWinners(G, ctx)})
                    } else {
                        G.players[playerID].hand[i] = tile
                    }
                }
            }
        }
        // Score monuments
        Object.entries(player.leaders).forEach(([color, position]) => {
            if (!position) return
            const leaderRegion = breadthFirstSearch({start: position, board: G.board})
            // Count monument tiles in the region.
            let monumentCount = 0
            leaderRegion.forEach((column, x) => {
                column.forEach((space, y) => {
                    if (!space) return
                    if (G.board[x][y].occupant!.type !== MONUMENT) return
                    // Increment the count if there is a monument in the region of the same color as the leader.
                    if ((G.board[x][y].occupant! as Monument).colors.includes(color as Color)) {
                        monumentCount += 1
                        return
                    }
                })
            })
            // Add points for each monument (each monument is four tiles).
            player.score[color as Color] += monumentCount / 4
        })
        // Check for treasure. Treasure is only awarded to green leaders.
        const treasureStage: Record<PlayerID, StageArg> = {}
        for (const pid in G.players) {
            const p = G.players[pid]
            if (p.leaders[GREEN]) {
                const leaderRegion = breadthFirstSearch({start: p.leaders[GREEN], board: G.board})
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
        // TODO: Before each, go to context
        if (Object.keys(treasureStage).length) {
            events.setActivePlayers!({value: treasureStage})
        } else {
            events.endTurn!()
        }
    }
}

export const endActionMove: Move<CNState> = ({G, ctx, events}) => {
    endAction(G, ctx, events)
}
