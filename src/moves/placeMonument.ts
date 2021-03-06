import { Ctx } from 'boardgame.io'
import { Coord } from '../models/board'

import CNState from '../models/state'
import { endAction } from "./helpers/endAction"
import { safeRemoveTile } from './helpers/utility'

export default function placeMonument(G: CNState, ctx: Ctx, position: Coord, idx: number) {

    const monument = G.monuments[idx]
    // Position is the top left of the monument.
    const coords = [
        position,
        {x: position.x + 1, y: position.y},
        {x: position.x + 1, y: position.y + 1},
        {x: position.x, y: position.y + 1},
    ]

    coords.forEach(c => {
        safeRemoveTile(c, G.board, G.players)
        G.board[c.x][c.y].occupant = monument
    })
    monument.position = position

    delete G.availableMonumentColor
    delete G.possibleMonuments
    ctx.events!.endStage!()
    endAction(G, ctx)
}