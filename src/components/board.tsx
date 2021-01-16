import React from 'react'

import { BoardProps } from 'boardgame.io/react'
import CNState from '../models/state'
import PlayerComp from './player'
import TileGrid from './tile_grid'

export const CubeNationsTable = ({ G, moves, playerID, ctx }: BoardProps<CNState>) => (
    <div style={{display: 'flex'}}>
        <TileGrid board={G.board}/>
        <PlayerComp player={G.players[ctx.currentPlayer]!}/>
    </div>
)

