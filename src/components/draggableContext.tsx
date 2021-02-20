import { PlayerID } from 'boardgame.io'
import React from 'react'
import { Coord } from '../models/board'
import { Color } from '../static/colors'

type ContextProps = {
    canDragHand: boolean, 
    canDragCatastrophe: boolean,
    canDragLeader: (playerID: PlayerID) => boolean
    canDragMonument: (colors: Array<Color>) => boolean
    canDragTreasure: (position: Coord) => boolean
}
const DraggableContext = React.createContext<ContextProps>({
    canDragHand: false, 
    canDragCatastrophe: false,
    canDragLeader: () => false,
    canDragMonument: () => false,
    canDragTreasure: () => false,
})

export default DraggableContext