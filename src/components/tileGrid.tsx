import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Move } from 'boardgame.io'

import { Board } from '../models/board'
import { BOARD_HEIGHT, BOARD_WIDTH } from '../static/board'
import { TILE_SIZE } from '../static/display'
import OccupantComp from './occupant'
import TileSquare from './tileSquare'

const useStyles = makeStyles({
    root: {
        background: '#ffecb3',
        borderCollapse: 'collapse',
        '& td': {
            border: '1px solid black',
            padding: '6px',
            height: TILE_SIZE,
            width: TILE_SIZE,
        },
        '& .river': {
            background: '#81d4fa'
        },
        '& .special-border': {
            boxShadow: 'inset 0px 0px 0px 2px black',
        }
    },
})

const TileGrid = ({board, placeTile, placeLeader}: {board: Board, placeTile: Move, placeLeader: Move}) => {

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

    return (
        <table className={classes.root}><tbody>{rows}</tbody></table>
    )
}

export default TileGrid