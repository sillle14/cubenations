import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Move } from 'boardgame.io'
import { DragObjectWithType, useDrop } from 'react-dnd'

import { Board } from '../models/board'
import { BOARD_HEIGHT, BOARD_WIDTH } from '../static/board'
import { TILE_SIZE } from '../static/display'
import OccupantComp from './occupant'
import { LEADER, TILE } from '../models/pieces'
import { canPlaceTile } from '../moves/placeTile'

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


interface TileSquareProps {
    x: number, 
    y: number, 
    className: string, 
    children: React.ReactNode,
    placeTile: any,
    placeLeader: any,
    board: Board
}
// TODO: Organization
const TileSquare = ({ x, y, className, children, placeTile, placeLeader, board }: TileSquareProps) => {

    const canDrop = (item: any) => {
        if (item.type === TILE) {
            return canPlaceTile({x: x, y: y}, item.color, board)
        }
        return true // TODO: Can place leader
    }

    const onDrop = (item: any) => {
        if (item.type === TILE) {
            placeTile(item.position, x, y)
        } else if (item.type == LEADER) {
            placeLeader(item.color, x, y)
        }
    }

    const [, drop] = useDrop({
        accept: [TILE, LEADER],
        canDrop: canDrop,
        drop: onDrop
    })
    return <td className={className} ref={drop}>{children}</td>
}

const TileGrid = ({board, placeTile, placeLeader}: {board: Board, placeTile: Move, placeLeader: Move}) => {

    let classes = useStyles()

    let rows: Array<JSX.Element> = []
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        let row: Array<JSX.Element> = []
        for (let x = 0; x < BOARD_WIDTH; x++) {
            let classes = []
            if (board[x][y].river) {classes.push('river')}
            if (board[x][y].border) {classes.push('special-border')}
            row.push(
                <TileSquare
                    key={x}
                    className={classes.join(' ')}
                    x={x}
                    y={y}
                    placeTile={placeTile}
                    placeLeader={placeLeader}
                    board={board}
                >
                    <OccupantComp occupant={board[x][y].occupant}/>
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