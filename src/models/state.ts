import { PlayerID } from 'boardgame.io'
import { Board } from './board'
import { Monument, Tile } from './pieces'
import Player from './player'

export default interface CNState {
    board: Board,
    tileBag: Array<Tile>,
    players: {[playerID in PlayerID]?: Player},
    monuments: Array<Monument>
}