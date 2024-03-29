import { PlayerID } from 'boardgame.io'

import { BLACK, BLUE, Color, GREEN, RED } from '../static/colors'
import { Coord } from './board'
import { Tile, TREASURE } from './pieces'


export default class Player {
    // Maps color to the leaders position (null for in hand)
    leaders: {[color in Color]: Coord | null} = {[BLACK]: null, [BLUE]: null, [GREEN]: null, [RED]: null}
    score: {[color in Color | typeof TREASURE]: number} = {[BLACK]: 0, [BLUE]: 0, [GREEN]: 0, [RED]: 0, [TREASURE]: 0}
    hand: Array<Tile | null> = []
    catastrophes: number = 2  // Players start with 2 catastrophe tiles
    id: PlayerID
    actions: number = 2
    availableTreasure?: Array<Coord>

    constructor (id: PlayerID) {
        this.id = id
    }

    static new (id: PlayerID) {
        return {
            leaders: {[BLACK]: null, [BLUE]: null, [GREEN]: null, [RED]: null},
            score: {[BLACK]: 0, [BLUE]: 0, [GREEN]: 0, [RED]: 0, [TREASURE]: 0},
            hand: [],
            catastrophes: 2,
            id: id,
            actions: 2
        }
    }
}