import React, { FunctionComponent } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import { Move } from 'boardgame.io'

import { Board, Coord } from '../models/board'
import { BOARD_HEIGHT, BOARD_WIDTH } from '../static/board'
import { sizingTheme } from '../static/display'
import OccupantComp from './grid/occupant'
import TileSquare from './grid/tileSquare'
import MonumentDropTarget from './monuments/monumentDropTarget'
import MonumentComp from './monuments/monument'
import TreasureComp from './grid/treasure'
import { Monument } from '../models/pieces'

const useStyles = makeStyles((theme: sizingTheme) => ({
    root: {
        position: 'relative',
        '& table': {
            width: 'max-content',
            background: '#ffecb3',
            borderCollapse: 'collapse',
            '& td': {
                border: `${theme.border} solid #37474f`,
                padding: theme.tilePad,
                height: theme.tileSize,
                width: theme.tileSize,
                position: 'relative'
            },
            '& .river': {
                background: '#81d4fa'
            },
            '& .special-border': {
                boxShadow: `inset 0px 0px 0px calc(${theme.border} * 2) #37474f`,
            },
            '& .unification': {
                '& svg': {
                    opacity: 0.3
                }
            }
        }
    }
}))
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
    const theme: sizingTheme = useTheme()

    // Treasures are displayed above the board using absolute positioning so they work with monuments.
    // Otherwise, they won't be in the correct z-index context.
    let treasures = []

    let rows: Array<JSX.Element> = []
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        let row: Array<JSX.Element> = []
        for (let x = 0; x < BOARD_WIDTH; x++) {
            let tdClasses = []
            if (board[x][y].river) tdClasses.push('river')
            if (board[x][y].border) tdClasses.push('special-border')
            const location = {x: x, y: y}
            if (board[x][y].treasure) {
                treasures.push(<TreasureComp key={`${x}${y}`} location={{x: x, y: y}}/>)
            }
            if (board[x][y].unification) tdClasses.push('unification')
            row.push(
                <TileSquare
                    key={x}
                    className={tdClasses.join(' ')}
                    location={location}
                    placeTile={placeTile}
                    placeLeader={placeLeader}
                    placeCatastrophe={placeCatastrophe}
                    board={board}
                >
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
            const top = `calc((${theme.tileSize} + 2 * ${theme.tilePad} + ${theme.border}) * ${m.position.y} + ${theme.border} + ${theme.tilePad})`
            const left = `calc((${theme.tileSize} + 2 * ${theme.tilePad} + ${theme.border}) * ${m.position.x} + ${theme.border} + ${theme.tilePad})`
            return <div style={{position: 'absolute', top, left}} key={i}>
                <MonumentComp colors={m.colors}/>
            </div>
        }
        return null
    })

    return (
        <div className={classes.root}>
            <table><tbody>{rows}</tbody></table>
            {monumentDTs}
            {monumentComps}
            {treasures}
        </div>
    )
}

export default TileGrid