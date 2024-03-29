import { Move } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'

import { Color, RED } from '../static/colors'
import { getAdjacentRegions } from './helpers/regions'
import { getNeighbors, isColorTile } from './helpers/utility'
import { endAction } from "./helpers/endAction"
import CNState from '../models/state'
import { Leader } from '../models/pieces'
import { Board, Coord } from '../models/board'
import { Revolt } from '../models/conflict'
import { CONFLICT, RESOLVE_CONFLICT } from '../static/stages'


export function canPlaceLeader(source: Coord | null, destination: Coord | null, board?: Board): boolean {
    // Leaders can be withdrawn if they aren't already in hand.
    if (!destination) return source !== null

    if (!board) throw new Error('Board is required if destination is not null')

    // Deep copy the board so it can be modified temporarily.
    const tempBoard = JSON.parse(JSON.stringify(board))
    const targetSpace = tempBoard[destination.x][destination.y]

    // Can't place a leader if the space isn't empty.
    if (targetSpace.occupant) return false

    // Leaders can't be placed on rivers.
    if (targetSpace.river) return false

    // Leaders require an adjacent red tile.
    const neighbors = getNeighbors(destination, tempBoard)
    if (!neighbors.some(c => isColorTile(c, tempBoard, RED))) {
        return false
    }

    // Remove the old leader before checking for revolt.
    if (source) {
        delete tempBoard[source.x][source.y].occupant
    }

    const regions = getAdjacentRegions(destination, tempBoard)

    const kingdoms = regions.filter(r => r.isKingdom)

    // Can't unite kingdoms with a leader.
    if (kingdoms.length > 1) {
        return false
    }

    return true
}


const placeLeader: Move<CNState> = ({G, ctx, events}, color: Color, destination: Coord | null) => {
    const source = G.players[ctx.currentPlayer].leaders[color]
    
    if (!canPlaceLeader(source, destination, G.board)) return INVALID_MOVE

    if (!destination) {
        // Send the leader back to hand.
        G.players[ctx.currentPlayer].leaders[color] = null
        delete G.board[source!.x][source!.y].occupant
        endAction(G, ctx, events)
        return
    }
    
    const targetSpace = G.board[destination!.x][destination!.y]
    // Place the leader
    targetSpace.occupant = Leader.new(color, ctx.currentPlayer)
    G.players[ctx.currentPlayer].leaders[color] = destination
    if (source) {
        delete G.board[source.x][source.y].occupant
    }

    // Check for a conflict.
    const regions = getAdjacentRegions(destination!, G.board)
    const kingdoms = regions.filter(r => r.isKingdom)

    // TODO: Confirm here.

    // If the existing kingdom contains the leader, a revolt occurs.
    if (kingdoms.length === 1 && kingdoms[0].leaders[color]) {
        const opponentId = kingdoms[0].leaders[color]!
        const opponentPosition = G.players[opponentId].leaders[color]!
        const opponentBase = getNeighbors(opponentPosition, G.board).filter(t => isColorTile(t, G.board, RED)).length

        const myBase = getNeighbors(destination, G.board).filter(t => isColorTile(t, G.board, RED)).length

        // Instantiate a revolt with the current player as the aggressor.
        G.conflict = Revolt.new({
            players: {
                [ctx.currentPlayer]: {base: myBase}, 
                [opponentId]: {base: opponentBase}
            },
            aggressor: ctx.currentPlayer,
            leaderColor: color
        })

        const leaderPositions = [destination, opponentPosition]
        leaderPositions.forEach((coord) => {
            (G.board[coord.x][coord.y].occupant as Leader).inConflict = true
        })
        
        // TODO: Confirm first
        events.setActivePlayers!({
            value: {
                [ctx.currentPlayer]: CONFLICT,
            },
            next: { 
                value: { [opponentId]: CONFLICT },
                next: { value: { [ctx.currentPlayer]: RESOLVE_CONFLICT } }
            }
        })
    } else {
        endAction(G, ctx, events)
    }
}

export default placeLeader
