import { applyMiddleware } from 'redux'
import { Client } from 'boardgame.io/react'
import { SocketIO } from 'boardgame.io/multiplayer'
import logger from 'redux-logger'

import { CubeNations } from './Game'
import { CubeNationsTable } from './components/board'


const CubeNationsClient = Client({ 
    game: CubeNations, 
    board: CubeNationsTable, 
    debug: false, 
    multiplayer: SocketIO({ server: 'localhost:8000' }),
    enhancer: applyMiddleware(logger),
});

export default CubeNationsClient
