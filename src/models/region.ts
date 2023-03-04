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
        const region = Region.new(spaces, board)
        this.spaces = spaces || []
        this.leaders = region.leaders
        this.tileCounts = region.tileCounts
        this.isKingdom = region.isKingdom
    }

    static new (spaces: Array<Array<boolean>>, board: Board) {
        const tileCounts: {[color in Color]?: number} = {}
        const leaders: {[color in Color]?: PlayerID} = {}
        let isKingdom = false

        // On instantiation, count the tiles of each color and whose leaders are part of the kingdom.
        for (let x = 0; x < spaces.length; x++) {
            for (let y = 0; y < spaces[x].length; y++) {
                // Iterate through all spaces, only including the spaces which are part of this region.
                if (spaces[x][y]) {
                    const occupant = board[x][y].occupant
                    if (occupant!.type === TILE) {
                        const color = (occupant as Tile).color
                        tileCounts[color] = (tileCounts[color] || 0) + 1
                    } else if (occupant!.type === LEADER) {
                        leaders[(occupant as Leader).color] = (occupant as Leader).playerID
                        isKingdom = true
                    }
                }
            }
        }

        return {
            spaces: spaces,
            leaders: leaders,
            tileCounts: tileCounts,
            isKingdom: isKingdom
        }
    }
}