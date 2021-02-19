import { Ctx, PlayerID } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'
import { Revolt } from '../models/conflict'
import { LEADER, Tile, TILE } from '../models/pieces'

import CNState from '../models/state'
import { Color, RED } from '../static/colors'
import { getAdjacentRegions } from './helpers/regions'
import { checkForMonument } from './helpers/monument'
import { getNeighbors } from './helpers/utility'
import { endAction } from "./helpers/endAction"
import { startWar, checkAndStartWar } from './helpers/war'
import { Coord } from '../models/board'


export function commitToConflict(G: CNState, ctx: Ctx, handIdxs: Array<number>) {
    if (!G.conflict) return INVALID_MOVE

    if (!ctx.playerID) return INVALID_MOVE

    if (!G.conflict.players[ctx.playerID]) return INVALID_MOVE

    G.conflict.players[ctx.playerID].support = handIdxs.length
    handIdxs.forEach((i) => {G.players[ctx.playerID!]!.hand[i] = null})

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

    ctx.events!.endStage!()
}

function resolveRevolt(G: CNState, ctx: Ctx, loser: PlayerID) {
    // Return the losing leader home.
    const loserPosition = G.players[loser]!.leaders[(G.conflict as Revolt).leaderColor]!
    delete G.board[loserPosition.x][loserPosition.y].occupant
    G.players[loser]!.leaders[(G.conflict as Revolt).leaderColor] = null

    // Award the winner one point.
    G.players[G.conflict!.winner!]!.points[RED] += 1

    G.conflict = null
    ctx.events!.endStage!()
    endAction(G, ctx)
}

function resolveWar(G: CNState, ctx: Ctx, loser: PlayerID) {
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

            // If the tile is red, remove only if it has no treasure and no adjacent leader.
            if (tile.color === RED) {
                if (G.board[x][y].treasure) return
                if (getNeighbors({x: x, y: y}, G.board).some(
                    c => G.board[c.x][c.y].occupant!.type === LEADER)
                ) return
            }
            delete G.board[x][y].occupant
            winnerPoints += 1
        })
    })

    // Remove the losing leader and award points.
    const loserLeaderPosition = G.players[loser]!.leaders[G.conflict!.color]!
    delete G.board[loserLeaderPosition.x][loserLeaderPosition.y].occupant
    G.players[loser]!.leaders[G.conflict!.color] = null
    winnerPoints += 1

    // Award points.
    G.players[G.conflict!.winner!]!.points[G.conflict!.color] += winnerPoints

    // Recalculate the kingdoms to see if another war needs to happen.
    regions = getAdjacentRegions(G.unificationTile!, G.board)
    kingdoms = regions.filter(r => r.isKingdom)

    if (checkAndStartWar(G, ctx, kingdoms, G.unificationTile!)) {
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
        ctx.events!.endStage!()

        if (!checkForMonument(G, ctx, placedTile)) {
            endAction(G, ctx)
        }
    }
}

export function resolveConflict(G: CNState, ctx: Ctx) {
    let loser: PlayerID
    for (const playerID in G.conflict!.players) {
        if (playerID !== G.conflict!.winner) {
            loser = playerID
            break
        }
    }

    if (G.conflict!.type === 'Revolt') {
        resolveRevolt(G, ctx, loser!)
    } else {
        resolveWar(G, ctx, loser!)
    }
}

export function chooseWar(G: CNState, ctx: Ctx, color: Color) {
    // End the choose war stage in case the current player will not be moved to a new stage for the war.
    ctx.events!.endStage!()
    startWar(G, ctx, color, G.warringKingdoms!)
}