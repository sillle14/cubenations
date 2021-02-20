import { PlayerID } from 'boardgame.io'
import { Color } from '../static/colors'
import { Board, Coord } from './board'
import { Conflict } from './conflict'
import { Monument, Tile } from './pieces'
import Player from './player'
import Region from './region'

export default interface CNState {
    board: Board,
    tileBag: Array<Tile>,
    players: {[playerID in PlayerID]?: Player},
    monuments: Array<Monument>
    conflict: Conflict | null,
    playerOrder: Array<PlayerID>,
    unificationTile: Coord | null
    possibleWars?: Array<Color>,
    warringKingdoms?: Array<Region>,
    availableMonumentColor?: Color,
    possibleMonuments?: Array<Coord>,
    discardCount: number
}