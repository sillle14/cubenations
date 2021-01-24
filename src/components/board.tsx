import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { BoardProps } from 'boardgame.io/react'
import CNState from '../models/state'
import PlayerComp from './player'
import TileGrid from './tileGrid'

export const CubeNationsTable = ({ G, moves, playerID, ctx }: BoardProps<CNState>) => (
    <DndProvider backend={HTML5Backend}>
        <TileGrid board={G.board} placeTile={moves.placeTile} placeLeader={moves.placeLeader}/>
        <PlayerComp player={G.players[ctx.currentPlayer]!}/>
    </DndProvider>
)

