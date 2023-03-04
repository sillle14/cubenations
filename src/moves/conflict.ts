import { Ctx, Move, PlayerID } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'
import { Revolt } from '../models/conflict'
import { Leader, LEADER, Tile, TILE } from '../models/pieces'

import CNState from '../models/state'
import { Color, RED } from '../static/colors'
import { getAdjacentRegions } from './helpers/regions'
import { checkForMonument } from './helpers/monument'
import { getNeighbors } from './helpers/utility'
import { endAction } from "./helpers/endAction"
import { startWar, checkAndStartWar } from './helpers/war'
import { Coord } from '../models/board'
import { EventsAPI } from 'boardgame.io/dist/types/src/plugins/plugin-events'


export const commitToConflict: Move<CNState> = ({G, playerID, events}, handIdxs: Array<number>) => {
    if (!G.conflict) return INVALID_MOVE

    if (!playerID) return INVALID_MOVE

    if (!G.conflict.players[playerID]) return INVALID_MOVE

    G.conflict.players[playerID].support = handIdxs.length
    handIdxs.forEach((i) => {G.players[playerID].hand[i] = null})

    const playerIDs = Object.keys(G.conflict.players)
    // Calculate the winner. Note that this will be recalculated when the second player commits tiles.
    const scores = playerIDs.map(pid => {
        let score = G.conflict!.players[pid].base + (G.conflict!.players[pid].support || 0)
        // Subtract a fraction if the player is an aggressor to solve ties.
        if (G.conflict!.aggressor === pid) {
            score -= 0.1
        }
        return score
    })

    G.conflict.winner = scores[0] > scores[1] ? playerIDs[0] : playerIDs[1]

    events.endStage!()
}

function resolveRevolt(G: CNState, ctx: Ctx, events: EventsAPI, loser: PlayerID) {
    // Return the losing leader home.
    const loserPosition = G.players[loser].leaders[(G.conflict as Revolt).leaderColor]!
    delete G.board[loserPosition.x][loserPosition.y].occupant
    G.players[loser].leaders[(G.conflict as Revolt).leaderColor] = null

    // Award the winner one point.
    G.players[G.conflict!.winner!].score[RED] += 1

    // Unset the inConflict on the remaining leader
    const winnerLeaderPosition = G.players[G.conflict!.winner!].leaders[(G.conflict as Revolt).leaderColor]!
    const winnerLeader = G.board[winnerLeaderPosition.x][winnerLeaderPosition.y].occupant as Leader
    winnerLeader.inConflict = false

    G.conflict = null
    events.endStage!()
    endAction(G, ctx, events)
}

function resolveWar(G: CNState, ctx: Ctx, events: EventsAPI, loser: PlayerID) {
    // Get the warring kingdoms.
    let regions = getAdjacentRegions(G.unificationTile!, G.board)
    let kingdoms = regions.filter(r => r.isKingdom)

    // Identify the losing kingdom index.
    let losingKingdomIdx: number
    if (kingdoms[0].leaders[G.conflict!.color] === loser) {
        losingKingdomIdx = 0
    } else {
        losingKingdomIdx = 1
    }

    let winnerPoints = 0
    // Iterate through the losing kingdom, removing tiles and awarding points.
    kingdoms[losingKingdomIdx].spaces.forEach((column, x) => {
        column.forEach((space, y) => {
            // Only consider this space if it is:
            //  1. In the kingdom
            //  2. A tile on the board
            //  3. Matches the color of the war.
            if (!space) return
            if (G.board[x][y].occupant!.type !== TILE) return
            const tile = G.board[x][y].occupant as Tile
            if (tile.color !== G.conflict!.color) return

            // If the tile is red, remove only if it has no treasure and no adjacent non-red leader.
            if (tile.color === RED) {
                if (G.board[x][y].treasure) return
                const protectedByLeader = getNeighbors({x: x, y: y}, G.board).some((c) => {
                    const occupant = G.board[c.x][c.y].occupant!
                    return occupant.type === LEADER && (occupant as Leader).color !== RED
                })
                if (protectedByLeader) return
            }
            delete G.board[x][y].occupant
            winnerPoints += 1
        })
    })

    // Remove the losing leader and award points.
    const loserLeaderPosition = G.players[loser].leaders[G.conflict!.color]!
    delete G.board[loserLeaderPosition.x][loserLeaderPosition.y].occupant
    G.players[loser].leaders[G.conflict!.color] = null
    winnerPoints += 1

    // Award points.
    G.players[G.conflict!.winner!].score[G.conflict!.color] += winnerPoints

    // Unset the inConflict on the remaining leader
    const winnerLeaderPosition = G.players[G.conflict!.winner!].leaders[G.conflict!.color]!
    const winnerLeader = G.board[winnerLeaderPosition.x][winnerLeaderPosition.y].occupant as Leader
    winnerLeader.inConflict = false

    // Recalculate the kingdoms to see if another war needs to happen.
    regions = getAdjacentRegions(G.unificationTile!, G.board)
    kingdoms = regions.filter(r => r.isKingdom)

    if (checkAndStartWar(G, ctx, events, kingdoms, G.unificationTile!)) {
        // This move is over if there's another war.
        return
    } else {
        // Unset the unification tile. 
        delete G.board[G.unificationTile!.x][G.unificationTile!.y].unification
        const placedTile: Coord = G.unificationTile! // Keep track of the unification tile for monument purposes.
        G.unificationTile = null
        
        // Clear any war related fields.
        delete G.possibleWars
        delete G.warringKingdoms
        G.conflict = null
        events.endStage!()

        if (!checkForMonument(G, events, placedTile)) {
            endAction(G, ctx, events)
        }
    }
}

export const resolveConflict: Move<CNState> = ({G, ctx, events}) => {
    let loser: PlayerID
    for (const playerID in G.conflict!.players) {
        if (playerID !== G.conflict!.winner) {
            loser = playerID
            break
        }
    }

    if (G.conflict!.type === 'Revolt') {
        resolveRevolt(G, ctx, events, loser!)
    } else {
        resolveWar(G, ctx, events, loser!)
    }
}

export const chooseWar: Move<CNState> = ({G, ctx, events}, color: Color) => {
    // End the choose war stage in case the current player will not be moved to a new stage for the war.
    events.endStage!()
    startWar(G, ctx, events, color, G.warringKingdoms!)
}