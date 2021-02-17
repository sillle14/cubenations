import { PlayerID } from 'boardgame.io'
import { Color } from '../static/colors'
import { Coord } from './board'

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

export interface DraggedTile extends Tile {
    handIndex: number
}

export class Monument implements Occupant {
    type = MONUMENT
    colors: [Color, Color]
    // position: number TODO: Good way of displaying these not all the same

    constructor (c1: Color, c2: Color) {
        this.colors = [c1, c2]
        // this.position = position
    }
}

export class Leader implements Occupant {
    type = LEADER
    color: Color
    playerID: PlayerID

    constructor (color: Color, player: PlayerID) {
        this.color = color
        this.playerID = player
    }
}

export interface DraggedLeader extends Leader {
    source: Coord | null
}

export class Catastrophe implements Occupant {
    type = CATASTROPHE
}

export type Dragged = DraggedTile | DraggedLeader