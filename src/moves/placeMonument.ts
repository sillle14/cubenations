import { Ctx } from 'boardgame.io'
import { Coord } from '../models/board'
import { LEADER } from '../models/pieces'

import CNState from '../models/state'
import { Leader } from '../models/pieces'
import { RED } from '../static/colors'
import { endAction } from "./helpers/endAction"
import { getNeighbors, isColorTile } from './helpers/utility'

export default function placeMonument(G: CNState, ctx: Ctx, position: Coord, idx: number) {

    const monument = G.monuments[idx]
    // Position is the top left of the monument.
    const coords = [
        position,
        {x: position.x + 1, y: position.y},
        {x: position.x + 1, y: position.y + 1},
        {x: position.x, y: position.y + 1},
    ]

    coords.forEach(c => {
        // If the tile is red, we need to check if adjacent leaders should be sent home.
        if (isColorTile(c, G.board, RED)) {
            getNeighbors(c, G.board).forEach(neighbor => {
                if (!G.board[neighbor.x][neighbor.y]) return
                if (G.board[neighbor.x][neighbor.y].occupant!.type !== LEADER) return
                const leader = G.board[neighbor.x][neighbor.y].occupant! as Leader
                const leaderNeighbors = getNeighbors(neighbor, G.board)
                // The leader should have at least two red neighbors, including the one we are removing here.
                //  Note that the leader can have at most on neighbor in the monument.
                if (leaderNeighbors.map(ln => isColorTile(ln, G.board, RED)).length < 2) {
                    // Send the leader back to hand.
                    G.players[leader.playerID]!.leaders[leader.color] = null
                    delete G.board[neighbor.x][neighbor.y].occupant
                }
            })
        }
        G.board[c.x][c.y].occupant = monument
    })
    monument.position = position

    delete G.availableMonumentColor
    delete G.possibleMonuments
    ctx.events!.endStage!()
    endAction(G, ctx)
}