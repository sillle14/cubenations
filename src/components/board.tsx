import React, { useState } from 'react'
import { BoardProps } from 'boardgame.io/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { PlayerID } from 'boardgame.io'

import CNState from '../models/state'
import ConflictComp, { PeaceComp } from './conflict'
import PlayerComp from './player'
import DraggableContext from './draggableContext'
import TileGrid from './tileGrid'
import { RESOLVE_CONFLICT } from '../static/stages'

export const CubeNationsTable = ({ G, moves, playerID, ctx, matchData }: BoardProps<CNState>) => {
    
        let playerMap: {[id in PlayerID]: string} = {}
        matchData!.forEach((player, i) => {playerMap[player.id] = player.name ? player.name.slice(0, 10) : `Player ${i}`})

    // Keep track of tiles sent to a conflict or the discard, until the move is confirmed.
    const [sentIdxs, setSentIdxs] = useState<Array<number>>([])
    const [sentCount, setSentCount] = useState(0)

    const sendTile = (handIdx: number) => {
        setSentCount(sentCount + 1)
        setSentIdxs([...sentIdxs, handIdx])
    }

    // Function to clear all temporarily sent tiles.
    const clearSent = () => {
        setSentCount(0)
        setSentIdxs([])
    }

    // Players can drag tiles from their hand if they are the current player or involved in a current conflict.
    let canDragHand = (
        !!playerID &&
        (playerID === ctx.currentPlayer || (!!ctx.activePlayers && !!ctx.activePlayers[playerID]))
    )
    // Players can drag their own leaders on their turn, but NOT during other phases (conflicts).
    let canDragLeader = (leaderID: PlayerID) => (
        leaderID === playerID && playerID === ctx.currentPlayer && !ctx.activePlayers
    )
    let conflict = <PeaceComp/>
    if (G.conflict) {
        conflict = <ConflictComp 
            conflict={G.conflict} 
            playerMap={playerMap}
            tempSupport={sentCount}
            addSupport={sendTile}
            playerID={playerID!} // TODO: Handle spectator
            resolution={!!ctx.activePlayers && (Object.values(ctx.activePlayers)[0] === RESOLVE_CONFLICT)}
        />
    }
    
    return (
        <DndProvider backend={HTML5Backend}><DraggableContext.Provider value={{canDragHand, canDragLeader}}>
            <div style={{display: 'flex'}}>
                <TileGrid board={G.board} placeTile={moves.placeTile} placeLeader={moves.placeLeader}/>
                {conflict}
            </div>
            <PlayerComp 
                player={G.players[playerID!]!} // TODO: Handle spectator
                placeLeader={moves.placeLeader}
                myTurn={playerID === ctx.currentPlayer}
                sentIdxs={sentIdxs}
                clear={clearSent}
                phase={(ctx.activePlayers || {})[playerID!]} // TODO: Handle spectator
                commitToConflict={moves.commitToConflict}
                resolveConflict={moves.resolveConflict}
            />
        </DraggableContext.Provider></DndProvider>
    )
}

