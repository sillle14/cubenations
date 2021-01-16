import { makeStyles } from '@material-ui/styles'
import React from 'react'

import { Board } from '../models/board'
import { BOARD_HEIGHT, BOARD_WIDTH } from '../static/board'
import OccupantComp from './occupant'

const WIDTH = '70vw'

const useStyles = makeStyles({
    root: {
        background: '#ffecb3',
        width: WIDTH,
        height: `calc(${WIDTH} * ${BOARD_HEIGHT}/${BOARD_WIDTH})`,
        borderCollapse: 'collapse',
        '& td': {
            border: '1px solid black',
            padding: '6px'
        },
        '& .river': {
            background: '#81d4fa'
        },
        '& .special-border': {
            boxShadow: 'inset 0px 0px 0px 2px black',
        }
    },
})

const TileGrid = ({board}: {board: Board}) => {

    let classes = useStyles()

    let rows: Array<JSX.Element> = []
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        let row: Array<JSX.Element> = []
        for (let x = 0; x < BOARD_WIDTH; x++) {
            let classes = []
            if (board[x][y].river) {classes.push('river')}
            if (board[x][y].border) {classes.push('special-border')}
            row.push(
                <td key={x} className={classes.join(' ')}>
                    <OccupantComp occupant={board[x][y].occupant}/>
                </td>
            )
        }
        rows.push(<tr key={y}>{row}</tr>)
    }

    return (
        <table className={classes.root}><tbody>{rows}</tbody></table>
    )
}

export default TileGrid