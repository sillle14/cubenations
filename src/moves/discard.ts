import { Ctx } from 'boardgame.io'

import CNState from '../models/state'
import { endAction } from './helpers/endAction'
import calculateWinners from './helpers/gameOver'

export default function discardTiles(G: CNState, ctx: Ctx, handIdxs: Array<number>) {
    handIdxs.forEach((i) => {
        const tile = G.tileBag.pop()
        if (!tile) {
            ctx.events!.endGame!({winnerIDs: calculateWinners(G, ctx)})
        } else {
            G.players[ctx.currentPlayer]!.hand[i] = tile
        }
    })
    // This variable changes every discard so the front end can clear temporary discards.
    G.discardCount += 1
    endAction(G, ctx)
}