import React, { FunctionComponent } from 'react'

import { Board, Coord } from '../models/board'
import { canPlaceLeader } from '../moves/placeLeader'
import { canPlaceTile } from '../moves/placeTile'
import { CATASTROPHE, Dragged, DraggedLeader, DraggedTile, LEADER, TILE } from '../models/pieces'
import Droppable from './droppable'
import { canPlaceCatastrophe } from '../moves/placeCatastrophe'

interface TileSquareProps {
    location: Coord, 
    className: string, 
    children: React.ReactNode,
    placeTile: any,
    placeLeader: any,
    placeCatastrophe: any,
    board: Board
}
const TileSquare: FunctionComponent<TileSquareProps> = ({ location, className, children, placeTile, placeLeader, placeCatastrophe, board }) => {

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
                console.log('bad drop')
                break
        }
    }
    return <td className={className}><Droppable accept={[TILE, LEADER, CATASTROPHE]} canDrop={canDrop} onDrop={onDrop}>
        {children}
    </Droppable></td>
}

export default TileSquare
