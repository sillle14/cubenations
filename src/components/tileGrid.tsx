import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Move } from 'boardgame.io'

import { Board, Coord } from '../models/board'
import { BOARD_HEIGHT, BOARD_WIDTH } from '../static/board'
import { GRID_BORDER, TILE_SIZE, TILE_PAD } from '../static/display'
import OccupantComp from './occupant'
import TileSquare from './tileSquare'
import MonumentDropTarget from './monumentDropTarget'
import MonumentComp from './monument'
import { Monument } from '../models/pieces'

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
    }
})
interface TileGridProps {
    board: Board, 
    placeTile: Move, 
    placeLeader: Move, 
    placeCatastrophe: Move,
    placeMonument: (position: Coord, idx: number) => void,
    possibleMonuments?: Array<Coord>,
    monuments: Array<Monument>
}
const TileGrid: FunctionComponent<TileGridProps> = ({board, placeTile, placeLeader, placeMonument, placeCatastrophe, possibleMonuments, monuments}) => {

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
                    placeCatastrophe={placeCatastrophe}
                    board={board}
                >
                    {board[x][y].unification ? <div style={{position: 'absolute', color: 'white'}}>U</div> : null}
                    <OccupantComp occupant={board[x][y].occupant} location={{x: x, y: y}}/>
                </TileSquare>
            )
        }
        rows.push(<tr key={y}>{row}</tr>)
    }

    const monumentDTs = (possibleMonuments || []).map(
        (m, i) => <MonumentDropTarget key={i} position={m} placeMonument={placeMonument}/>
    )

    const monumentComps = monuments.map((m, i) => {
        if (m.position) {
            const top = `calc((${TILE_SIZE} + 2 * ${TILE_PAD} + ${GRID_BORDER}) * ${m.position.y} + ${GRID_BORDER} + ${TILE_PAD})`
            const left = `calc((${TILE_SIZE} + 2 * ${TILE_PAD} + ${GRID_BORDER}) * ${m.position.x} + ${GRID_BORDER} + ${TILE_PAD})`
            return <div style={{position: 'absolute', top, left}} key={i}>
                <MonumentComp colors={m.colors}/>
            </div>
        }
        return null
    })

    return (
        <div style={{position: 'relative'}}>
            <table className={classes.root}><tbody>{rows}</tbody></table>
            {monumentDTs}
            {monumentComps}
        </div>
    )
}

export default TileGrid