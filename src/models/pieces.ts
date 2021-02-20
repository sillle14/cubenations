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
export const TREASURE = 'treasure'

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
    position: Coord | null

    constructor (c1: Color, c2: Color) {
        this.colors = [c1, c2]
        this.position = null
    }
}
export interface DraggedMonument extends Monument {
    monumentIndex: number
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

export interface DraggedTreasure {
    type: typeof TREASURE,
    source: Coord
}

export type Dragged = DraggedTile | DraggedLeader | DraggedMonument | Catastrophe | DraggedTreasure