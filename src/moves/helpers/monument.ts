import { Ctx } from 'boardgame.io'
import { Coord } from '../../models/board'
import { Tile } from '../../models/pieces'
import CNState from '../../models/state'
import { MONUMENT } from '../../static/stages'
import { isColorTile } from './utility'

/**
 * Check if the recently placed piece is eligible for monument construction, and start the phase if so.
 * Assume that there is a tile placed at Coord.
 * 
 * @param coord Recently placed tile which may build a monument
 * @param board Game board
 */
export function checkForMonument(G: CNState, ctx: Ctx, coord: Coord): boolean {
    // We can assume the there is a tile in the coord .
    const color = (G.board[coord.x][coord.y].occupant as Tile).color

    // All possible configurations, with the postion of the top left of the monument for tracking,
    //  as well as the coords of the tiles in the monument (except the placed tile.)
    const monumentConfigurations = [
        // Placed tile top left
        {
            position: coord,
            coords: [
                { x: coord.x, y: coord.y + 1 },
                { x: coord.x + 1, y: coord.y + 1 },
                { x: coord.x + 1, y: coord.y },
            ],
        },
        // Placed tile top right
        {
            position: { x: coord.x - 1, y: coord.y },
            coords: [
                { x: coord.x - 1, y: coord.y },
                { x: coord.x - 1, y: coord.y + 1 },
                { x: coord.x, y: coord.y + 1 },
            ]
        },
        // Placed tile bottom left
        {
            position: { x: coord.x, y: coord.y - 1 },
            coords:[
                { x: coord.x, y: coord.y - 1 },
                { x: coord.x + 1, y: coord.y - 1 },
                { x: coord.x + 1, y: coord.y },
            ]
        },
        // Placed tile bottom right
        {
            position: { x: coord.x - 1, y: coord.y - 1 },
            coords: [
                { x: coord.x - 1, y: coord.y - 1} ,
                { x: coord.x - 1, y: coord.y },
                { x: coord.x, y: coord.y - 1 },
            ]
        },
    ]

    let possibleMonuments: Array<Coord> = []
    monumentConfigurations.forEach(config => {
        if (config.coords.every(c => isColorTile(c, G.board, color))) {
            // Add the configuration, along with the center tile, to the possible configs.
            possibleMonuments.push(config.position)
        }
    })

    // Enter the monument phase if there are possible monuments and available monuments of that color.
    if (possibleMonuments.length && G.monuments.some(m => m.colors.includes(color) && !m.position)) {
        G.availableMonumentColor = color
        G.possibleMonuments = possibleMonuments
        ctx.events!.setStage!(MONUMENT)
        return true
    } else {
        return false
    }
}