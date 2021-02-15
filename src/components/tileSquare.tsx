import React from 'react'

import { Board, Coord } from '../models/board'
import { canPlaceLeader } from '../moves/placeLeader'
import { canPlaceTile } from '../moves/placeTile'
import { Dragged, DraggedLeader, DraggedTile, LEADER, TILE } from '../models/pieces'
import Droppable from './droppable'

interface TileSquareProps {
    location: Coord, 
    className: string, 
    children: React.ReactNode,
    placeTile: any,
    placeLeader: any,
    board: Board
}
const TileSquare = ({ location, className, children, placeTile, placeLeader, board }: TileSquareProps) => {

    const canDrop = (item: Dragged) => {
        if (item.type === TILE) {
            return canPlaceTile(location, item.color, board)
        } else if (item.type === LEADER) {
            return canPlaceLeader((item as DraggedLeader).source, location, board)
        } else {
            return true
        }
    }

    const onDrop = (item: Dragged) => {
        if (item.type === TILE) {
            placeTile((item as DraggedTile).handIndex, location)
        } else if (item.type === LEADER) {
            placeLeader(item.color, location)
        }
    }
    return <td className={className}><Droppable accept={[TILE, LEADER]} canDrop={canDrop} onDrop={onDrop}>
        {children}
    </Droppable></td>
}

export default TileSquare
