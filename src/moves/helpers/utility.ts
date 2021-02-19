
import { PlayerID } from 'boardgame.io';
import { Board, Coord } from '../../models/board'
import { CATASTROPHE, Leader, LEADER, Tile, TILE } from '../../models/pieces'
import Player from '../../models/player';
import { BOARD_HEIGHT, BOARD_WIDTH } from '../../static/board'
import { Color, RED } from '../../static/colors'

/**
 * Get the coordinates of all adjacent and filled spaces for a given space.
 * Note that a space is considered filled if it contains any piece except for a catastrophe.
 *
 * @param coord Coordinates for the space
 * @param board Board object to reference for filled spaces
 */

export function getNeighbors(coord: Coord, board: Board): Array<Coord> {
    // Get all possible neighbors in the grid.
    let neighbors = [
        { x: coord.x + 1, y: coord.y },
        { x: coord.x - 1, y: coord.y },
        { x: coord.x, y: coord.y + 1 },
        { x: coord.x, y: coord.y - 1 }
    ];
    // Remove any which are off the edge.
    neighbors = neighbors.filter(c => c.x >= 0 && c.y >= 0 && c.x < BOARD_WIDTH && c.y < BOARD_HEIGHT)
    // Remove any which are empty or catastrophes.
    neighbors = neighbors.filter(c => board[c.x][c.y].occupant && (board[c.x][c.y].occupant!.type !== CATASTROPHE))
    return neighbors
}

/**
 * Check if given coordinates refer to a certain colored tile. 
 * 
 * @param coord Coordinate of the space to check
 * @param board Current board state
 * @param color Color to check for
 */
export function isColorTile(coord: Coord, board: Board, color: Color): boolean {
    // Return false if the tile is off the board.
    if (coord.x < 0 || coord.y < 0 || coord.x >= BOARD_WIDTH || coord.y >= BOARD_HEIGHT) return false

    const isTile = board[coord.x][coord.y].occupant && board[coord.x][coord.y].occupant!.type === TILE
    if (isTile) {
        return (board[coord.x][coord.y].occupant as Tile).color === color
    } else {
        return false
    }
}

/**
 * Remove a tile from the board, sending leaders home as necessary.
 * 
 * @param coord Coordinate of space to clear
 * @param board Current board state
 * @param players Player map to modify if necessary
 */
export function safeRemoveTile(coord: Coord, board: Board, players: {[playerID in PlayerID]?: Player}) {
    // If space is a red tile, we need to check if adjacent leaders should be sent home.
    if (isColorTile(coord, board, RED)) {
        getNeighbors(coord, board).forEach(neighbor => {
            if (!board[neighbor.x][neighbor.y]) return
            if (board[neighbor.x][neighbor.y].occupant!.type !== LEADER) return
            const leader = board[neighbor.x][neighbor.y].occupant! as Leader
            const leaderNeighbors = getNeighbors(neighbor, board)
            // The leader should have at least two red neighbors, including the one we are removing here.
            if (leaderNeighbors.map(ln => isColorTile(ln, board, RED)).length < 2) {
                // Send the leader back to hand.
                players[leader.playerID]!.leaders[leader.color] = null
                delete board[neighbor.x][neighbor.y].occupant
            }
        })
    }
    delete board[coord.x][coord.y].occupant
}
