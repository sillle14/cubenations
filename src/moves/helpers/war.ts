import { Ctx, PlayerID } from 'boardgame.io'
import { Coord } from '../../models/board'

import { War } from '../../models/conflict'
import { Leader } from '../../models/pieces'
import Region from '../../models/region'
import CNState from '../../models/state'
import { ALL_COLORS, Color } from '../../static/colors'
import { CHOOSE_WAR, CONFLICT, RESOLVE_CONFLICT } from '../../static/stages'

/**
 * Create and set a war object given the two kingdoms and the color. Also set the appropriate players
 *  in the appropriate phases.
 * 
 * @param G Game object
 * @param ctx Context object
 * @param color Color of war to start
 * @param kingdoms Warring kingdoms
 */
export function startWar(G: CNState, ctx: Ctx, color: Color, kingdoms: Array<Region>) {
    // Set the players at war, along with their base score.
    let players: {[id in PlayerID]: {base: number}} = {}
    kingdoms.forEach(k => {
        players[k.leaders[color]!] = {base: k.tileCounts[color] || 0}
    })

    // The aggressor is the player closest in turn order to the current player.
    const playerIDs = Object.keys(players)
    let aggressor: PlayerID
    let defender: PlayerID
    const currentPlayerIdx = G.playerOrder.indexOf(ctx.currentPlayer)
    const turnDiffs = playerIDs.map(pid => {
        let turnIdx = G.playerOrder.indexOf(pid)
        // If the player is before the current player in the turn order, add to the index.
        if (turnIdx < currentPlayerIdx) {
            turnIdx += ctx.numPlayers
        }
        return turnIdx - currentPlayerIdx
    })
    if (turnDiffs[0] < turnDiffs[1]) {
        aggressor = playerIDs[0]
        defender = playerIDs[1]
    } else {
        aggressor = playerIDs[1]
        defender = playerIDs[0]
    }

    // Set the conflict and the new active players. Note that the current player always resolves
    //  the conflict.
    G.conflict = new War({
        players: players,
        aggressor: aggressor,
        color: color
    })

    const leaderCoords = Object.keys(players).map((player) => G.players[player]!.leaders[color]!)
    leaderCoords.forEach((coord) => {
        (G.board[coord.x][coord.y].occupant as Leader).inConflict = true
    })

    ctx.events!.setActivePlayers!({
        value: {
            [aggressor]: CONFLICT,
        },
        next: { 
            value: { [defender]: CONFLICT },
            next: { value: { [ctx.currentPlayer]: RESOLVE_CONFLICT } }
        }
    })
}

/**
 * Check for wars between two kingdoms. If only one war, start that war. 
 * Returns true if a war was started or the choose war stage was started.
 * 
 * @param G Game object
 * @param ctx Context object
 * @param kingdoms Array of kingdoms at war.
 * @param unification Coordinates for the unification tile.
 */
export function checkAndStartWar(G: CNState, ctx: Ctx, kingdoms: Array<Region>, unification: Coord): boolean {
    // No war if only one kingdom.
    if (kingdoms.length < 2) {
        return false
    }

    let warringColors: Array<Color> = []
    ALL_COLORS.forEach(c => {
        if (kingdoms.every(k => !!k.leaders[c])) {
            warringColors.push(c)
        }
    })
    if (warringColors.length) {
        // Set unification tile. In the case of multiple wars, this may be already set, but that's fine.
        G.unificationTile = unification
        G.board[unification.x][unification.y].unification = true

        if (warringColors.length === 1) {
            startWar(G, ctx, warringColors[0], kingdoms)
        } else if (warringColors.length > 1) {
            G.possibleWars = warringColors
            G.warringKingdoms = kingdoms
            ctx.events!.setStage!(CHOOSE_WAR)
        }
        return true
    } else {
        // Unset the unification tile.
        return false
    }
}
