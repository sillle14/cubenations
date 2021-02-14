import { PlayerID } from 'boardgame.io'

import { BLACK, BLUE, Color, GREEN, RED } from '../static/colors'
import { Coord } from './board'
import { Tile } from './pieces'


export default class Player {
    // Maps color to the leaders position (null for in hand)
    leaders: {[color in Color]: Coord | null} = {[BLACK]: null, [BLUE]: null, [GREEN]: null, [RED]: null}
    points: {[color in Color]: number} = {[BLACK]: 0, [BLUE]: 0, [GREEN]: 0, [RED]: 0}
    hand: Array<Tile | null> = []
    catastrophes: number = 2  // Players start with 2 catastrophe tiles
    id: PlayerID
    actions: number = 2

    constructor (id: PlayerID) {
        this.id = id
    }
}