import React from 'react'
import { BoardProps } from 'boardgame.io/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import CNState from '../models/state'
import PlayerComp from './player'
import PlayerContext from './playerContext'
import TileGrid from './tileGrid'

export const CubeNationsTable = ({ G, moves, playerID, ctx }: BoardProps<CNState>) => (
    <DndProvider backend={HTML5Backend}><PlayerContext.Provider value={{playerID: playerID, myTurn: playerID === ctx.currentPlayer}}>
        <TileGrid board={G.board} placeTile={moves.placeTile} placeLeader={moves.placeLeader}/>
        <PlayerComp player={G.players[playerID!]!} placeLeader={moves.placeLeader}/>
    </PlayerContext.Provider></DndProvider>
)

