import { PlayerID } from 'boardgame.io'

import { Color } from '../static/colors'
import { Board } from './board'
import { LEADER, Leader, TILE, Tile } from './pieces'

export default class Region {
    readonly spaces: Array<Array<boolean>>
    readonly leaders: {[color in Color]?: PlayerID} = {}    // Map colors to player ID
    readonly tileCounts: {[color in Color]?: number} = {}   // Map colors to counts
    readonly isKingdom: boolean = false

    constructor (spaces: Array<Array<boolean>>, board: Board) {
        // On instantiation, count the tiles of each color and whose leaders are part of the kindom.
        this.spaces = spaces || []
        for (let x = 0; x < this.spaces.length; x++) {
            for (let y = 0; y < this.spaces[x].length; y++) {
                // Iterate through all spaces, only including the spaces which are part of this region.
                if (this.spaces[x][y]) {
                    const occupant = board[x][y].occupant
                    if (occupant!.type === TILE) {
                        const color = (occupant as Tile).color
                        this.tileCounts[color] = (this.tileCounts[color] || 0) + 1
                    } else if (occupant!.type === LEADER) {
                        this.leaders[(occupant as Leader).color] = (occupant as Leader).player
                        this.isKingdom = true
                    }
                }
            }
        }
    }
}