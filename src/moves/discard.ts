import { Ctx } from 'boardgame.io'

import CNState from '../models/state'
import { endAction } from './helpers/endAction'

export default function discardTiles(G: CNState, ctx: Ctx, handIdxs: Array<number>) {
    // TODO: Handle end of game
    handIdxs.forEach((i) => {G.players[ctx.playerID!]!.hand[i] = G.tileBag.pop()!})
    G.discardCount += 1
    endAction(G, ctx)
}