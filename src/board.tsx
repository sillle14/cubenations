import React from 'react'

import { BoardProps } from 'boardgame.io/react'
import { CNState } from './Game'
import TileGrid from './components/tile_grid'

export const CubeNationsTable = ({ G, moves }: BoardProps<CNState>) => (
    <TileGrid board={G.board}/>
)