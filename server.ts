import { CubeNations } from './src/Game'
import { Server } from 'boardgame.io/server'

const server = Server({ games: [CubeNations] })
server.run(8000)
