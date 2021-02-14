import { Ctx } from 'boardgame.io'
import { Board, Coord } from '../models/board'
import { CATASTROPHE, Tile, TILE } from '../models/pieces'
import Region from '../models/region'
import CNState from '../models/state'
import { BOARD_HEIGHT, BOARD_WIDTH } from '../static/board'
import { RED } from '../static/colors'

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
        {x: coord.x + 1, y: coord.y}, 
        {x: coord.x - 1, y: coord.y}, 
        {x: coord.x, y: coord.y + 1}, 
        {x: coord.x, y: coord.y - 1}
    ]
    // Remove any which are off the edge.
    neighbors = neighbors.filter(c => c.x >= 0 && c.y >= 0 && c.x < BOARD_WIDTH && c.y < BOARD_HEIGHT)
    // Remove any which are empty or catastrophes.
    neighbors = neighbors.filter(c => board[c.x][c.y].occupant && (board[c.x][c.y].occupant!.type !== CATASTROPHE))
    return neighbors
}

interface BFSInput {start: Coord, exclude: Coord, board: Board}
/**
 * Use BFS to find a connected region given a starting location, board position, and a coordinate to exclude.
 * In general, the excluded coordinate will be the just placed piece, as newly placed pieces aren't part of any
 * region.
 * 
 * @param start     Coordinates to start search at
 * @param board     Current board state
 */
function breadthFirstSearch({start, exclude, board}: BFSInput): Array<Array<boolean>> {
    let queue: Array<Coord> = [start]
    let discovered: Array<Array<boolean>> = Array(BOARD_WIDTH).fill(null).map(() => Array(BOARD_HEIGHT).fill(false))
    // Discover the starting position.
    discovered[start.x][start.y] = true
    while (queue.length > 0) {
        const node = queue.pop()
        getNeighbors(node!, board).forEach(adjacentNode => {
            // Travel to the node if it hasn't been discovered yet AND it's not the excluded node.
            if (!discovered[adjacentNode.x][adjacentNode.y] && ((adjacentNode.x !== exclude.x) || (adjacentNode.y !== exclude.y))) {
                discovered[adjacentNode.x][adjacentNode.y] = true
                queue.push(adjacentNode)
            }
        })
    }
    return discovered
}

/**
 * Get a list of regions adjacent to a newly placed piece.
 * 
 * @param coord Coordinates of the new piece
 * @param board Current board state
 */
export function getAdjacentRegions(coord: Coord, board: Board): Array<Region> {
    let regions: Array<Region> = []
    getNeighbors(coord, board).forEach(neighbor => {
        // If the neighboor hasn't already been added to a region, find the graph starting from the tile
        if (!regions.some(r => r.spaces[neighbor.x][neighbor.y])) {
            // Add the region starting at this neighbor. Exclude the placed tile from search.
            regions.push(
                new Region(breadthFirstSearch({start: neighbor, exclude: coord, board: board}), board)
            )
        }
    })
    return regions
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
