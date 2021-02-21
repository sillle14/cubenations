import React, { useEffect, useState } from 'react'
import { BoardProps } from 'boardgame.io/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { PlayerID } from 'boardgame.io'

import CNState from '../models/state'
import ConflictComp, { PeaceComp } from './conflict'
import PlayerComp from './player'
import DiscardComp from './discard'
import MonumentsComp from './monuments'
import DraggableContext from './draggableContext'
import TileGrid from './tileGrid'
import { CONFLICT, MONUMENT, RESOLVE_CONFLICT, TREASURE } from '../static/stages'
import { Color } from '../static/colors'
import { Coord } from '../models/board'
import { canTakeTreasure } from '../moves/takeTreasure'

export const CubeNationsTable = ({ G, moves, playerID, ctx, matchData }: BoardProps<CNState>) => {
    
    let playerMap: {[id in PlayerID]: string} = {}
    matchData!.forEach((player, i) => {playerMap[player.id] = player.name ? player.name.slice(0, 10) : `Player ${i}`})

    // Keep track of tiles sent to a conflict or the discard, until the move is confirmed.
    const [sentIdxs, setSentIdxs] = useState<Array<number>>([])
    const [sentCount, setSentCount] = useState(0)

    // TODO: handle spectators
    const mySupport = (((G.conflict || {}).players || {})[playerID!] || {}).support

    // When a player's support changes (meaning they committed tiles) or a discard move is performed, clear the sent tiles.
    useEffect(() => {
        clearSent()
    }, [mySupport, G.discardCount])

    const sendTile = (handIdx: number) => {
        setSentCount(sentCount + 1)
        setSentIdxs([...sentIdxs, handIdx])
    }

    // Function to clear all temporarily sent tiles.
    const clearSent = () => {
        setSentCount(0)
        setSentIdxs([])
    }

    // TODO: Handle spectators
    // Players can drag tiles from their hand if they are the current player and no stage is present
    //  or if they are involved in a conflict.
    let canDragHand = !!!ctx.gameover && (
        (playerID === ctx.currentPlayer && !ctx.activePlayers) || 
        (!!ctx.activePlayers && ctx.activePlayers[playerID!] === CONFLICT)
    )
    // Players can drag catastrophes if they are the current player and no stage is present.
    let canDragCatastrophe = playerID === ctx.currentPlayer && !ctx.activePlayers && !!!ctx.gameover
    // Players can drag their own leaders on their turn, but NOT during other stages.
    let canDragLeader = (leaderID: PlayerID) => (
        leaderID === playerID && playerID === ctx.currentPlayer && !ctx.activePlayers && !!!ctx.gameover
    )
    // Players can drag monuments only if they are in the monument stages.
    let canDragMonument = (colors: Array<Color>) => (
        !!G.availableMonumentColor && 
        colors.includes(G.availableMonumentColor!) && 
        !!ctx.activePlayers && 
        ctx.activePlayers[playerID!] === MONUMENT &&
        !!!ctx.gameover
    )
    // Players can drag treasure if they are in the correct phase and the treasure is available.
    let canDragTreasure = (position: Coord) => (
        !!ctx.activePlayers && ctx.activePlayers[playerID!] === TREASURE &&
        canTakeTreasure(G, position, playerID!) &&
        !!!ctx.gameover
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
        <DndProvider backend={HTML5Backend}><DraggableContext.Provider value={{canDragHand, canDragLeader, canDragMonument, canDragCatastrophe, canDragTreasure}}>
            <div style={{display: 'flex'}}>
                <div>
                    <TileGrid 
                        board={G.board} 
                        placeTile={moves.placeTile} 
                        placeLeader={moves.placeLeader}
                        placeMonument={moves.placeMonument} 
                        placeCatastrophe={moves.placeCatastrophe}
                        possibleMonuments={G.possibleMonuments}
                        monuments={G.monuments}
                    />
                    <PlayerComp 
                        player={G.players[playerID!]!} // TODO: Handle spectator
                        placeLeader={moves.placeLeader}
                        myTurn={playerID === ctx.currentPlayer}
                        sentIdxs={sentIdxs}
                        clear={clearSent}
                        stage={(ctx.activePlayers || {})[playerID!]} // TODO: Handle spectator
                        commitToConflict={moves.commitToConflict}
                        resolveConflict={moves.resolveConflict}
                        pass={moves.pass}
                        anyStage={!!ctx.activePlayers}
                        possibleWars={G.possibleWars}
                        chooseWar={moves.chooseWar}
                        takeTreasure={moves.takeTreasure}
                        discardTiles={moves.discardTiles}
                        gameover={ctx.gameover}
                        playerMap={playerMap}
                    />
                </div>
                <div>
                    {conflict}
                    <DiscardComp discard={sendTile} allowDiscard={playerID === ctx.currentPlayer && !ctx.activePlayers}/>
                </div>
                <MonumentsComp monuments={G.monuments}/>
            </div>
        </DraggableContext.Provider></DndProvider>
    )
}

