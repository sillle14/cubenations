import { Color } from '../static/colors'
import { Board, Coord } from './board'
import { LEADER, Leader, TILE, Tile } from './pieces'
import { playerID } from './player'

export default class Region {
    readonly spaces: Array<Coord>
    readonly leaders: {[color in Color]?: playerID}     // Map colors to player ID
    readonly tileCounts: {[color in Color]?: number}  // Map colors to counts

    constructor (spaces: Array<Coord>, board: Board) {
        // On instantiation, count the tiles of each color and whose leaders are part of the kindom.
        this.spaces = spaces || []
        this.spaces.forEach(coord => {
            const occupant = board[coord.x][coord.y].occupant
            if (occupant.type === TILE) {
                const color = (occupant as Tile).color
                this.tileCounts[color] = (this.tileCounts[color] || 0) + 1
            } else if (occupant.type === LEADER) {
                this.leaders[(occupant as Leader).color] = (occupant as Leader).player
            }
        })
    }
}