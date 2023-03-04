import styled, { CSSObject } from '@emotion/styled';

import { Board, Coord } from '../../models/board'
import { canPlaceLeader } from '../../moves/placeLeader'
import { canPlaceTile } from '../../moves/placeTile'
import { CATASTROPHE, Dragged, DraggedLeader, DraggedTile, LEADER, TILE } from '../../models/pieces'
import Droppable from '../dnd/droppable'
import { canPlaceCatastrophe } from '../../moves/placeCatastrophe'

interface TileTdProps {river: boolean, specialBorder: boolean, unification: boolean}
const TileTd = styled.td<TileTdProps>(({river, specialBorder, unification, theme}) => {
    const styles: CSSObject = {
        border: `${theme.border} solid #37474f`,
        padding: theme.tilePad,
        height: theme.tileSize,
        width: theme.tileSize,
        position: 'relative'
    }
    if (river) { styles.background = '#81d4fa' }
    if (specialBorder) { styles.boxShadow = `inset 0px 0px 0px calc(${theme.border} * 2) #37474f` }
    if (unification) {
        Object.assign(styles, {
            '& img': {
                opacity: 0.3
            },
            '& svg': {
                opacity: 0.3
            }
        })
    }
    return styles
})

interface TileSquareProps {
    location: Coord, 
    children: React.ReactNode,
    placeTile: any,
    placeLeader: any,
    placeCatastrophe: any,
    board: Board,
    river: boolean,
    specialBorder: boolean,
    unification: boolean
}
const TileSquare = ({ 
    location, 
    children, 
    placeTile, 
    placeLeader, 
    placeCatastrophe, 
    board,
    river,
    specialBorder,
    unification
}: TileSquareProps) => {

    const canDrop = (item: Dragged) => {
        switch (item.type) {
            case TILE:
                return canPlaceTile(location, (item as DraggedTile).color, board)
            case LEADER:
                return canPlaceLeader((item as DraggedLeader).source, location, board)
            case CATASTROPHE:
                return canPlaceCatastrophe(location, board)
            default:
                return false
        }
    }

    const onDrop = (item: Dragged) => {
        switch (item.type) {
            case TILE:
                placeTile((item as DraggedTile).handIndex, location)
                break
            case LEADER:
                placeLeader((item as DraggedLeader).color, location)
                break
            case CATASTROPHE:
                placeCatastrophe(location)
                break
            default:
                console.error('bad drop')
                break
        }
    }
    return <TileTd river={river} specialBorder={specialBorder} unification={unification}>
        <Droppable accept={[TILE, LEADER, CATASTROPHE]} canDrop={canDrop} onDrop={onDrop} showTarget>
            {children}
        </Droppable>
    </TileTd>
}

export default TileSquare
