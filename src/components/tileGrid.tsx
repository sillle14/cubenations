import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Move } from 'boardgame.io'

import { Board, Coord } from '../models/board'
import { BOARD_HEIGHT, BOARD_WIDTH } from '../static/board'
import { GRID_BORDER, TILE_SIZE, TILE_PAD } from '../static/display'
import OccupantComp from './occupant'
import TileSquare from './tileSquare'
import MonumentDropTarget from './monumentDropTarget'

const useStyles = makeStyles({
    root: {
        background: '#ffecb3',
        borderCollapse: 'collapse',
        '& td': {
            border: `${GRID_BORDER} solid black`,
            padding: TILE_PAD,
            height: TILE_SIZE,
            width: TILE_SIZE,
        },
        '& .river': {
            background: '#81d4fa'
        },
        '& .special-border': {
            boxShadow: `inset 0px 0px 0px calc(${GRID_BORDER} * 2) black`,
        }
    },
    tl: {
        position: 'absolute',
        height: `calc(${TILE_SIZE} + ${GRID_BORDER})`,
        width: `calc(${TILE_SIZE} + ${GRID_BORDER})`,
        background: 'rgba(255, 0, 0, 0.5)',
        left: `calc((${TILE_SIZE} + 2 * ${TILE_PAD} + ${GRID_BORDER}) * 2.5 + ${GRID_BORDER} * 0.5 + ${TILE_PAD})`,
        top: `calc((${TILE_SIZE} + 2 * ${TILE_PAD} + ${GRID_BORDER}) * 1.5 + ${GRID_BORDER} * 0.5 + ${TILE_PAD})`,
    },
    tr: {
        position: 'absolute',
        height: `calc(${TILE_SIZE} + ${GRID_BORDER})`,
        width: `calc(${TILE_SIZE} + ${GRID_BORDER})`,
        background: 'rgba(0, 0, 255, 0.5)',
        right: `calc((${TILE_SIZE} + 2 * ${TILE_PAD} + ${GRID_BORDER}) * 11.5 + ${GRID_BORDER} * 0.5 + ${TILE_PAD})`,
        top: `calc((${TILE_SIZE} + 2 * ${TILE_PAD} + ${GRID_BORDER}) * 1.5 + ${GRID_BORDER} * 0.5 + ${TILE_PAD})`,
    },
    bl: {
        position: 'absolute',
        height: `calc(${TILE_SIZE} + ${GRID_BORDER})`,
        width: `calc(${TILE_SIZE} + ${GRID_BORDER})`,
        background: 'rgba(0, 255, 0, 0.5)',
        left: `calc((${TILE_SIZE} + 2 * ${TILE_PAD} + ${GRID_BORDER}) * 2.5 + ${GRID_BORDER} * 0.5 + ${TILE_PAD})`,
        bottom: `calc((${TILE_SIZE} + 2 * ${TILE_PAD} + ${GRID_BORDER}) * 7.5 + ${GRID_BORDER} * 0.5 + ${TILE_PAD})`,
    },
    br: {
        position: 'absolute',
        height: `calc(${TILE_SIZE} + ${GRID_BORDER})`,
        width: `calc(${TILE_SIZE} + ${GRID_BORDER})`,
        background: 'rgba(0, 255, 255, 0.5)',
        right: `calc((${TILE_SIZE} + 2 * ${TILE_PAD} + ${GRID_BORDER}) * 11.5 + ${GRID_BORDER} * 0.5 + ${TILE_PAD})`,
        bottom: `calc((${TILE_SIZE} + 2 * ${TILE_PAD} + ${GRID_BORDER}) * 7.5 + ${GRID_BORDER} * 0.5 + ${TILE_PAD})`,
    }
})

const TileGrid = ({board, placeTile, placeLeader, possibleMonuments}: {board: Board, placeTile: Move, placeLeader: Move, possibleMonuments?: Array<Coord>}) => {

    let classes = useStyles()

    let rows: Array<JSX.Element> = []
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        let row: Array<JSX.Element> = []
        for (let x = 0; x < BOARD_WIDTH; x++) {
            let classes = []
            if (board[x][y].river) classes.push('river')
            if (board[x][y].border) classes.push('special-border')
            const location = {x: x, y: y}
            row.push(
                <TileSquare
                    key={x}
                    className={classes.join(' ')}
                    location={location}
                    placeTile={placeTile}
                    placeLeader={placeLeader}
                    board={board}
                >
                    {board[x][y].unification ? <div style={{position: 'absolute', color: 'white'}}>U</div> : null}
                    <OccupantComp occupant={board[x][y].occupant} location={{x: x, y: y}}/>
                </TileSquare>
            )
        }
        rows.push(<tr key={y}>{row}</tr>)
    }

    const monumentDTs = possibleMonuments ? possibleMonuments.map((m, i) => <MonumentDropTarget key={i} position={m}/>) : []

    return (
        <div style={{position: 'relative'}}>
            <table className={classes.root}><tbody>{rows}</tbody></table>
            {monumentDTs}
        </div>
    )
}

export default TileGrid