import { Board, Coord } from '../../models/board'
import Region from '../../models/region'
import { BOARD_HEIGHT, BOARD_WIDTH } from '../../static/board'
import { getNeighbors } from './utility'

interface BFSInput {start: Coord, exclude?: Coord, board: Board}
/**
 * Use BFS to find a connected region given a starting location, board position, and an optional coordinate to exclude.
 * In general, the excluded coordinate will be the just placed piece, as newly placed pieces aren't part of any
 * region.
 * 
 * @param start     Coordinates to start search at
 * @param exclude   [OPTIONAL] Coordinate to exclude from search
 * @param board     Current board state
 */
export function breadthFirstSearch({start, exclude, board}: BFSInput): Array<Array<boolean>> {
    let queue: Array<Coord> = [start]
    let discovered: Array<Array<boolean>> = Array(BOARD_WIDTH).fill(null).map(() => Array(BOARD_HEIGHT).fill(false))
    // Discover the starting position.
    discovered[start.x][start.y] = true
    while (queue.length > 0) {
        const node = queue.pop()
        getNeighbors(node!, board).forEach(adjacentNode => {
            // Travel to the node if it hasn't been discovered yet AND it's not the excluded node.
            const nodeExcluded = exclude && (adjacentNode.x === exclude.x) && (adjacentNode.y === exclude.y)
            if (!discovered[adjacentNode.x][adjacentNode.y] && !nodeExcluded) {
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
                Region.new(breadthFirstSearch({start: neighbor, exclude: coord, board: board}), board)
            )
        }
    })
    return regions
}


