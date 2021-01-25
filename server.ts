import * as game from './src/Game'
import { Server } from 'boardgame.io/server'

console.log(game.CubeNations)

const server = Server({ games: [game.CubeNations] })
server.run(8000)
