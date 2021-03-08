import { PlayerID } from 'boardgame.io'
import React from 'react'
import { Coord } from '../models/board'
import { Color } from '../static/colors'

type ContextProps = {
    canDragTile: boolean, 
    canSelectHand: (color: Color) => boolean,
    canDragLeader: (playerID: PlayerID) => boolean
    canDragMonument: (colors: Array<Color>) => boolean
    canDragTreasure: (position: Coord) => boolean
}
const DraggableContext = React.createContext<ContextProps>({
    canDragTile: false, 
    canSelectHand: () => false,
    canDragLeader: () => false,
    canDragMonument: () => false,
    canDragTreasure: () => false,
})

export default DraggableContext