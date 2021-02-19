import { Ctx } from 'boardgame.io'
import { Coord } from '../models/board'

import CNState from '../models/state'

export default function placeMonument(G: CNState, ctx: Ctx, coords: Array<Coord>) {
    // Set all the coords occupant to Monument (aka nothing)
    // Set monument position to top left coord
    // End action
}