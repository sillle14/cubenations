import { Ctx } from 'boardgame.io'

import { Board, Coord } from '../../models/board'
import { CATASTROPHE, Tile, TILE } from '../../models/pieces'
import CNState from '../../models/state'
import { BOARD_HEIGHT, BOARD_WIDTH } from '../../static/board'
import { RED } from '../../static/colors'

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
    neighbors = neighbors.filter(c => c.x >= 0 && c.y >= 0 && c.x < BOARD_WIDTH && c.y < BOARD_HEIGHT);
    // Remove any which are empty or catastrophes.
    neighbors = neighbors.filter(c => board[c.x][c.y].occupant && (board[c.x][c.y].occupant!.type !== CATASTROPHE));
    return neighbors;
}

/**
 * Check if given coordinates refer to a red tile. 
 * 
 * @param coord Coordinate of the space to check
 * @param board Current board state
 */
export function isRedTile(coord: Coord, board: Board): boolean {
    const isTile = board[coord.x][coord.y].occupant && board[coord.x][coord.y].occupant!.type === TILE
    if (isTile) {
        return (board[coord.x][coord.y].occupant as Tile).color === RED
    } else {
        return false
    }
}

/**
 * End a player's action, ending the turn if it was their second action, and refilling all players
 * tiles if so.
 * 
 * @param G Game object
 * @param ctx Context object
 */
export function endAction(G: CNState, ctx: Ctx) {
    let player = G.players[ctx.currentPlayer]!
    player.actions -= 1
    if (player.actions === 0) {
        player.actions = 2
        for (const playerID in G.players) {
            for (let i = 0; i < 6; i++) {
                if (!G.players[playerID]!.hand[i]) {
                    G.players[playerID]!.hand[i] = G.tileBag.pop()!
                }
            }
        }
        ctx.events!.endTurn!()
    }
}
