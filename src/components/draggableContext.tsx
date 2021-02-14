import { PlayerID } from 'boardgame.io'
import React from 'react'

type ContextProps = {canDragHand: boolean, canDragLeader: (playerID: PlayerID) => boolean}
const DraggableContext = React.createContext<ContextProps>({canDragHand: false, canDragLeader: () => false})

export default DraggableContext