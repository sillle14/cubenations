import { PlayerID } from 'boardgame.io'
import { Color, RED } from '../static/colors'

interface ConflictProps {
    players: {[id in PlayerID]: {base: number, support?: number}}
    aggressor: PlayerID
}
export abstract class Conflict {
    abstract type: 'Revolt' | 'War'
    abstract color: Color
    players: {[id in PlayerID]: {base: number, support?: number}}
    aggressor: PlayerID
    winner?: PlayerID

    constructor ({players, aggressor}: ConflictProps) {
        this.players = players
        this.aggressor = aggressor
    }
}

interface RevoltProps extends ConflictProps {
    leaderColor: Color
}
export class Revolt extends Conflict {
    readonly type = 'Revolt'
    readonly color = RED
    leaderColor: Color

    constructor ({leaderColor, ...others}: RevoltProps) {
        super(others)
        this.leaderColor = leaderColor
    }
}

interface WarProps extends ConflictProps {
    color: Color
}
export class War extends Conflict {
    readonly type = 'War'
    color: Color

    constructor ({color, ...others}: WarProps) {
        super(others)
        this.color = color
    }
}