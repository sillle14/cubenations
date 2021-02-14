import React from 'react'
import { BoardProps } from 'boardgame.io/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { PlayerID } from 'boardgame.io'

import CNState from '../models/state'
import ConflictComp from './conflict'
import PlayerComp from './player'
import DraggableContext from './draggableContext'
import TileGrid from './tileGrid'

export const CubeNationsTable = ({ G, moves, playerID, ctx, matchData }: BoardProps<CNState>) => {

    let playerMap: {[id in PlayerID]: string} = {}
    matchData!.forEach((player, i) => {playerMap[player.id] = player.name ? player.name.slice(0, 10) : `Player ${i}`})

    // Players can drag tiles from their hand if they are the current player or involved in a current conflict.
    let canDragHand = (
        !!playerID &&
        (playerID === ctx.currentPlayer || (!!ctx.activePlayers && !!ctx.activePlayers[playerID]))
    )
    // Players can drag their own leaders on their turn, but NOT during other phases (conflicts).
    let canDragLeader = (leaderID: PlayerID) => (
        leaderID === playerID && playerID === ctx.currentPlayer && !ctx.activePlayers
    )
    
    return (
        <DndProvider backend={HTML5Backend}><DraggableContext.Provider value={{canDragHand, canDragLeader}}>
            <div style={{display: 'flex'}}>
                <TileGrid board={G.board} placeTile={moves.placeTile} placeLeader={moves.placeLeader}/>
                <ConflictComp conflict={G.conflict} playerMap={playerMap}/>
            </div>
            <PlayerComp 
                player={G.players[playerID!]!} 
                placeLeader={moves.placeLeader}
                myTurn={playerID === ctx.currentPlayer}
            />
        </DraggableContext.Provider></DndProvider>
    )
}

