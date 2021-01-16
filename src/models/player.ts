import { Color } from '../static/colors'
import { Coord } from './board'
import { Tile } from './pieces'

export type PlayerID = '0' | '1' | '2' | '3'

export default class Player {
    leaders: {[color in Color]?: Coord | null} = {}     // Maps color to the leaders position (null for in hand)
    points: {[color in Color]?: number} = {}
    hand: Array<Tile> = []
    catastrophes: number = 2                            // Players start with 2 catastrophe tiles
    id: PlayerID

    constructor (id: PlayerID) {
        this.id = id
    }
}