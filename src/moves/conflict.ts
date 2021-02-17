import { Ctx, PlayerID } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'
import { Revolt } from '../models/conflict'

import CNState from '../models/state'
import { RED } from '../static/colors'
import { endAction } from './helpers/utility'


export function commitToConflict(G: CNState, ctx: Ctx, handIdxs: Array<number>) {
    if (!G.conflict) return INVALID_MOVE

    if (!ctx.playerID) return INVALID_MOVE

    if (!G.conflict.players[ctx.playerID]) return INVALID_MOVE

    G.conflict.players[ctx.playerID].support = handIdxs.length
    handIdxs.forEach((i) => {G.players[ctx.playerID!]!.hand[i] = null})

    // Calculate the winner. Note that this will be recalculated when the second player commits tiles.
    G.conflict.winner = Object.keys(G.conflict.players).sort((a, b) => {
        const aScore = G.conflict!.players[a].base + (G.conflict!.players[a].support || 0) + (G.conflict!.aggressor === b ? 0.1 : 0)
        const bScore = G.conflict!.players[b].base + (G.conflict!.players[b].support || 0) + (G.conflict!.aggressor === a ? 0.1 : 0)
        console.log(`Player ${a} scores ${aScore}`)
        console.log(`Player ${b} scores ${bScore}`)
        return bScore - aScore
    })[0]

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
    // Re-check for war using unification tile.
    // If more, go to choose to not
    // else, unset unification, check for monument, end turn
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

export function chooseWar(G: CNState, ctx: Ctx) {

}