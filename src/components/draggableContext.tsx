import { PlayerID } from 'boardgame.io'
import React from 'react'
import { Color } from '../static/colors'

type ContextProps = {
    canDragHand: boolean, 
    canDragLeader: (playerID: PlayerID) => boolean
    canDragMonument: (colors: Array<Color>) => boolean
}
const DraggableContext = React.createContext<ContextProps>({
    canDragHand: false, 
    canDragLeader: () => false,
    canDragMonument: () => false
})

export default DraggableContext