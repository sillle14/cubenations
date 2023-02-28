import { Ctx } from 'boardgame.io'

import CNState from '../models/state'


export function confirm(_: CNState, ctx: Ctx) {
    ctx.events!.endStage!()
}