import { Ctx, DefaultPluginAPIs, Game, PlayerID } from 'boardgame.io'
import { TurnOrder } from 'boardgame.io/core'

import { ALL_COLORS, Color, RED } from './static/colors'
import { Board } from './models/board'
import { BOARD_HEIGHT, BOARD_WIDTH, BORDERED, RIVERS, TREASURES } from './static/board'
import { chooseWar, commitToConflict, resolveConflict } from './moves/conflict'
import { confirm } from './moves/confirm'
import { MONUMENT, CHOOSE_WAR, CONFLICT, RESOLVE_CONFLICT, TREASURE, CONFIRM } from './static/stages'
import { Monument, Tile } from './models/pieces'
import { TILE_COUNTS } from './static/tile'
import CNState from './models/state'
import placeLeader from './moves/placeLeader'
import placeMonument from './moves/placeMonument'
import placeCatastrophe from './moves/placeCatastrophe'
import takeTreasure from './moves/takeTreasure'
import placeTile from './moves/placeTile'
import discardTiles from './moves/discard'
import Player from './models/player'
import Space from './models/space'
import { endAction, endActionMove } from './moves/helpers/endAction'

function setup({ctx, random}: {ctx: Ctx} & DefaultPluginAPIs): CNState {
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
            if (TREASURES[x][y]) {space.occupant = Tile.new(RED)}
            column.push(space)
        }
        board.push(column)
    }

    // Tiles
    let tileBag: Array<Tile> = []
    for (let color in TILE_COUNTS) {
        for (let i = 0; i < TILE_COUNTS[color as Color]; i++){
            tileBag.push(Tile.new(color as Color))
        }
    }
    tileBag = random.Shuffle(tileBag)

    // Players
    let players: Record<PlayerID, Player> = {}
    for (let i = 0; i < ctx.numPlayers; i ++) {
        const playerID = (i + '') as PlayerID
        players[playerID] = Player.new(playerID)
    }

    // Deal each player 6 tiles.
    for (const playerID in players) {
        players[playerID as PlayerID].hand = tileBag.splice(0, 6)
    }

    // Monuments
    let monuments: Array<Monument> = []
    for (let i = 0; i < ALL_COLORS.length; i++) {
        for (let j = i + 1; j < ALL_COLORS.length; j++) {
            monuments.push(Monument.new(ALL_COLORS[i], ALL_COLORS[j]))
        }
    }

    return {
        players: players,
        board: board,
        tileBag: tileBag,
        monuments: monuments,
        conflict: null,
        playerOrder: random.Shuffle(Object.keys(players)), // Randomize the player order.
        unificationTile: null,
        discardCount: 0, // Use to determine when discards have occurred
        treasureCount: 10
    }
}

export const CubeNations: Game<CNState> = {
    name: 'CubeNations',
    setup: setup,
    minPlayers: 2,
    maxPlayers: 4,
    moves: { placeTile, placeLeader, placeCatastrophe, discardTiles, pass: endActionMove },
    turn: {
        order: TurnOrder.CUSTOM_FROM('playerOrder'),
        stages: {
            [CONFLICT]: {
                moves: {commitToConflict}
            },
            [RESOLVE_CONFLICT]: {
                moves: {resolveConflict}
            },
            [CHOOSE_WAR]: {
                moves: {chooseWar}
            },
            [MONUMENT]: {
                moves: {
                    placeMonument,
                    pass: ({G, ctx, events}) => {events.endStage!(); endAction(G, ctx, events)}
                }
            },
            [TREASURE]: {
                moves: {takeTreasure}
            },
            [CONFIRM]: {
                moves: {confirm}
            }
        }
    }
}
