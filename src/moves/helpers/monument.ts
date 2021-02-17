import { Board, Coord } from '../../models/board'
import { TILE, Tile } from '../../models/pieces'
import { getNeighbors, isColorTile } from './utility'

/**
 * Check if the recently placed piece is eligible for monument construction, and start the phase if so.
 * Assume that there is a tile placed at Coord.
 * 
 * @param coord Recently placed tile which may build a monument
 * @param board Game board
 */
export function checkForMonument(coord: Coord, board: Board): boolean {
    // We can assume the there is a tile in the coord .
    const color = (board[coord.x][coord.y].occupant as Tile).color

    const monumentConfigurations = [
        // Top left
        [
            { x: coord.x, y: coord.y + 1 },
            { x: coord.x - 1, y: coord.y + 1 },
            { x: coord.x - 1, y: coord.y },
        ],
        // Top right
        [
            { x: coord.x, y: coord.y + 1 },
            { x: coord.x + 1, y: coord.y + 1 },
            { x: coord.x + 1, y: coord.y },
        ],
        // Bottom left
        [
            { x: coord.x, y: coord.y - 1 },
            { x: coord.x - 1, y: coord.y - 1 },
            { x: coord.x - 1, y: coord.y },
        ],
        // Bottom right
        [
            { x: coord.x, y: coord.y - 1 },
            { x: coord.x + 1, y: coord.y - 1 },
            { x: coord.x + 1, y: coord.y },
        ],
    ]

    let possibleConfigs = []
    monumentConfigurations.forEach(config => {
        if (config.every(c => isColorTile(c, board, color))) {
            // Add the configuration, along with the center tile, to the possible configs.
            possibleConfigs.push(config.concat(coord))
        }
    })

    if (possibleConfigs.length) {
        // TODO Set phase to monument picking.
        return true
    } else {
        return false
    }
}