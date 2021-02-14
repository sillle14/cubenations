import { Ctx, Game, PlayerID } from 'boardgame.io'
import { TurnOrder } from 'boardgame.io/core'

import { ALL_COLORS, Color, RED } from './static/colors'
import { Board } from './models/board'
import { BOARD_HEIGHT, BOARD_WIDTH, BORDERED, RIVERS, TREASURES } from './static/board'
import { Monument, Tile } from './models/pieces'
import { TILE_COUNTS } from './static/tile'
import CNState from './models/state'
import placeLeader from './moves/placeLeader'
import placeTile from './moves/placeTile'
import Player from './models/player'
import Space from './models/space'

function setup(ctx: Ctx): CNState {
    // Board
    let board: Board = []
    for (let x = 0; x < BOARD_WIDTH; x++) {
        let column: Array<Space> = []
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            let space: Space = {
                river: RIVERS[x][y],
                treasure: TREASURES[x][y],
                border: BORDERED[x][y]
            }
            if (TREASURES[x][y]) {space.occupant = new Tile(RED)}
            column.push(space)
        }
        board.push(column)
    }

    // Tiles
    let tileBag: Array<Tile> = []
    for (let color in TILE_COUNTS) {
        for (let i = 0; i < TILE_COUNTS[color as Color]; i++){
            tileBag.push(new Tile(color as Color))
        }
    }
    tileBag = ctx.random!.Shuffle(tileBag)

    // Players
    let players: {[playerID in PlayerID]?: Player} = {}
    for (let i = 0; i < ctx.numPlayers; i ++) {
        const playerID = (i + '') as PlayerID
        players[playerID] = new Player(playerID)
    }

    // Deal each player 6 tiles.
    for (const playerID in players) {
        players[playerID as PlayerID]!.hand = tileBag.splice(0, 6)
    }

    // Monuments
    let monuments: Array<Monument> = []
    for (let i = 0; i < ALL_COLORS.length; i++) {
        for (let j = i + 1; j < ALL_COLORS.length; j++) {
            monuments.push(new Monument(ALL_COLORS[i], ALL_COLORS[j]))
        }
    }

    return {
        players: players,
        board: board,
        tileBag: tileBag,
        monuments: monuments,
        conflict: null,
        playerOrder: ctx.random!.Shuffle(Object.keys(players)) // Randomize the player order.
    }
}

export const CubeNations: Game<CNState> = {
    name: 'CubeNations',
    setup: setup,
    minPlayers: 2,
    maxPlayers: 4,
    moves: { placeTile, placeLeader },
    turn: {
        // TODO: Constants for stages
        order: TurnOrder.CUSTOM_FROM('playerOrder'),
        stages: {
            revolt: {
                moves: {}
            }
        }
    }
}
