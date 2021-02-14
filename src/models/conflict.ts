import { PlayerID } from 'boardgame.io'
import { Color, RED } from '../static/colors'

export interface Conflict {
    type: 'revolt' | 'war',
    color: Color,
    players: {[id in PlayerID]: {base: number, support?: number}}
}

export class Revolt implements Conflict {
    readonly type = 'revolt'
    readonly color = RED
    players: {[id in PlayerID]: {base: number, support?: number}}

    constructor (players: {[id in PlayerID]: {base: number, support?: number}}) {
        this.players = players
    }
}