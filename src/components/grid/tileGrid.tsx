import { Move } from 'boardgame.io'
import styled from '@emotion/styled';

import { Board, Coord } from '../../models/board'
import { BOARD_HEIGHT, BOARD_WIDTH } from '../../static/board'
import OccupantComp from './occupant'
import TileSquare from './tileSquare'
import MonumentDropTarget from '../monuments/monumentDropTarget'
import MonumentComp from '../monuments/monument'
import TreasureComp from './treasure'
import { Monument } from '../../models/pieces'

const GridDiv = styled.div({
    position: 'relative',
        '& table': {
            width: 'max-content',
            background: '#ffecb3',
            borderCollapse: 'collapse',
        }
})

const MonumentDiv = styled.div<{position: Coord}>(({position, theme}) => ({
    position: 'absolute',
    top: `calc((${theme.tileSize} + 2 * ${theme.tilePad} + ${theme.border}) * ${position.y} + ${theme.border} + ${theme.tilePad})`,
    left:`calc((${theme.tileSize} + 2 * ${theme.tilePad} + ${theme.border}) * ${position.x} + ${theme.border} + ${theme.tilePad})`
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
const TileGrid = ({board, placeTile, placeLeader, placeMonument, placeCatastrophe, possibleMonuments, monuments}: TileGridProps) => {

    // Treasures are displayed above the board using absolute positioning so they work with monuments.
    // Otherwise, they won't be in the correct z-index context.
    let treasures = []

    let rows: Array<JSX.Element> = []
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        let row: Array<JSX.Element> = []
        for (let x = 0; x < BOARD_WIDTH; x++) {
            const location = {x: x, y: y}
            if (board[x][y].treasure) {
                treasures.push(<TreasureComp key={`${x}${y}`} location={{x: x, y: y}}/>)
            }
            row.push(
                <TileSquare
                    key={x}
                    river={board[x][y].river}
                    specialBorder={board[x][y].border}
                    unification={!!board[x][y].unification}
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
            return <MonumentDiv position={m.position} key={i}>
                <MonumentComp colors={m.colors}/>
            </MonumentDiv>
        }
        return null
    })

    return (
        <GridDiv>
            <table><tbody>{rows}</tbody></table>
            {monumentDTs}
            {monumentComps}
            {treasures}
        </GridDiv>
    )
}

export default TileGrid