import { PlayerID } from 'boardgame.io'
import { Color } from '../static/colors'

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

export class Monument implements Occupant {
    type = MONUMENT
    innerColor: Color
    outerColor: Color
    // position: number TODO: Good way of displaying these not all the same

    constructor (innerColor: Color, outerColor: Color) {
        this.innerColor = innerColor
        this.outerColor = outerColor
        // this.position = position
    }
}

export class Leader implements Occupant {
    type = LEADER
    color: Color
    player: PlayerID

    constructor (color: Color, player: PlayerID) {
        this.color = color
        this.player = player
    }
}

export class Catastrophe implements Occupant {
    type = CATASTROPHE
}