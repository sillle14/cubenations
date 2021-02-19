import { PlayerID } from 'boardgame.io'
import React from 'react'
import { Color } from '../static/colors'

type ContextProps = {
    canDragHand: boolean, 
    canDragCatastrophe: boolean,
    canDragLeader: (playerID: PlayerID) => boolean
    canDragMonument: (colors: Array<Color>) => boolean
}
const DraggableContext = React.createContext<ContextProps>({
    canDragHand: false, 
    canDragCatastrophe: false,
    canDragLeader: () => false,
    canDragMonument: () => false
})

export default DraggableContext