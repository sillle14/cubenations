import { Color } from '../static/colors'
import { playerID } from './player'

export interface Occupant {
    type: string
}

export const TILE = 'tile'
export const MONUMENT = 'monument'
export const LEADER = 'leader'
export const CATASTROPHE = 'catastrophe'

export class Tile implements Occupant {
    type = TILE
    color: Color

    constructor (color: Color) {
        this.color = color
    }
}

export class MonumentPiece implements Occupant {
    type = MONUMENT
    innerColor: Color
    outerColor: Color
    position: number

    constructor (innerColor: Color, outerColor: Color, position: number) {
        this.innerColor = innerColor
        this.outerColor = outerColor
        this.position = position
    }
}

export class Leader implements Occupant {
    type = LEADER
    color: Color
    player: playerID

    constructor (color: Color, player: playerID) {
        this.color = color
        this.player = player
    }
}

export class Catastrophe implements Occupant {
    type = CATASTROPHE
}