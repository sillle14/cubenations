import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import { BoardProps } from 'boardgame.io/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { PlayerID } from 'boardgame.io'

import CNState from '../models/state'
import ConflictComp from './conflict'
import PlayerComp from './player'
import ScoreComp from './score'
import ActionBox from './action'
import Column from './column'
import PlayerOrderComp from './playerOrder'
import MonumentsComp from './monuments'
import DraggableContext from './draggableContext'
import TileGrid from './tileGrid'
import { CHOOSE_WAR, CONFLICT, MONUMENT, RESOLVE_CONFLICT, TREASURE } from '../static/stages'
import { Color } from '../static/colors'
import { Coord } from '../models/board'
import { canTakeTreasure } from '../moves/takeTreasure'
import ScoreDetailsModal from './scoreDetails'
import { sizingTheme } from '../static/display'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        // TODO: Remove the following once LHOG css has been cleaned up.
        '& *': {
            boxSizing: 'content-box'
        },
        '& table': {
            width: 'auto'
        },
        height: '100%',
        justifyContent: 'space-around',
        background: '#607d8b',
    },
})

export const CubeNationsTable = ({ G, moves, playerID, ctx, matchData }: BoardProps<CNState>) => {

    // TODO: Organization
    const classes = useStyles()
    
    let playerMap: {[id in PlayerID]: string} = {}
    matchData!.forEach((player, i) => {playerMap[player.id] = player.name ? player.name.slice(0, 10) : `Player ${i}`})

    // Keep track of tiles selected for a conflict or discard, until the move is confirmed.
    const [selected, setSelected] = useState<Array<number>>([])

    const [modalOpen, setModalOpen] = useState(false)

    const toggleModal = () => {setModalOpen(!modalOpen)}

    // TODO: handle spectators
    const mySupport = (((G.conflict || {}).players || {})[playerID!] || {}).support

    // When a player's support changes (meaning they committed tiles) or a discard move is performed, clear the sent tiles.
    useEffect(() => {
        clearSelected()
    }, [mySupport, G.discardCount]) // TODO: discard count is silly, maybe move count?

    const toggleSelectTile = (handIdx: number) => {
        if (selected.includes(handIdx)) {
            setSelected(selected.filter(idx => idx !== handIdx))
        } else {
            setSelected([...selected, handIdx])
        }
    }

    // Function to clear all temporarily sent tiles.
    const clearSelected = () => {
        setSelected([])
    }

    const [tileSize, setTileSize] = useState<number>(0)
    const ref = useRef<HTMLDivElement>(null)

    // The following are calculated from the space we need vertically and horizontally. 
    // This will be recalculated on window resize so in theory, we never need to scroll.
    // Note that we divide and multiply by 2 to make sure the final size is even.
    function handleResize() {
        if (ref.current !== null) {
            setTileSize(Math.min(
                Math.floor((ref.current.clientWidth - 250) / 50) * 2,
                Math.floor((ref.current.clientHeight - 200) / 26) * 2
            ))
        }
    }

    useLayoutEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        // Handle resize once on load.
        handleResize()
    }, [])

    const theme: sizingTheme = {
        tileSize: `${tileSize}px`,
        tilePad: '4px',
        border: '1px'
    }

    // TODO: Handle spectators
    // Players can drag tiles from their hand if they are the current player and no stage is present
    //  or if they are involved in a conflict. Players can't drag when some tiles are selected.
    let canDragTile = playerID === ctx.currentPlayer && !ctx.activePlayers && selected.length === 0 && !!!ctx.gameover 
    // Players can select tiles on their turn or if they are involved in a conflict.
    //  or if they are involved in a conflict.
    let canSelectHand = (color: Color) => (!!!ctx.gameover && (
        (playerID === ctx.currentPlayer && !ctx.activePlayers) || 
        (!!ctx.activePlayers && ctx.activePlayers[playerID!] === CONFLICT && G.conflict!.color === color)
    ))
    // Players can drag their own leaders on their turn, but NOT during other stages.
    let canDragLeader = (leaderID: PlayerID) => (
        leaderID === playerID && playerID === ctx.currentPlayer && !ctx.activePlayers && selected.length === 0 && !!!ctx.gameover
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

    let conflict = null
    // Don't show the conflict if any player is in the choose war phase.
    if (G.conflict && !Object.values(ctx.activePlayers || {}).some(stage => stage === CHOOSE_WAR)) {
        conflict = <ConflictComp 
            conflict={G.conflict} 
            playerMap={playerMap}
            tempSupport={selected.length}
            playerID={playerID!} // TODO: Handle spectator
            resolution={!!ctx.activePlayers && (Object.values(ctx.activePlayers)[0] === RESOLVE_CONFLICT)}
        />
    }
    
    return (
        <DndProvider backend={HTML5Backend}>
        <DraggableContext.Provider value={{canDragTile, canSelectHand, canDragLeader, canDragMonument, canDragTreasure}}>
        <ThemeProvider theme={theme}>
            <div className={classes.root} ref={ref}>
                <Column fixed={true} width={4.5}>
                    <ScoreComp score={G.players[playerID!]!.score} takeTreasure={moves.takeTreasure}/>
                    <PlayerOrderComp playerMap={playerMap} playerOrder={G.playerOrder}/>
                    {conflict}
                </Column>
                <Column fixed={false}>
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
                        selected={selected}
                        toggleSelectTile={toggleSelectTile}
                    />
                </Column>
                <Column fixed={true}>
                    <MonumentsComp monuments={G.monuments}/>
                    <ActionBox
                        selected={selected}
                        stage={(ctx.activePlayers || {})[playerID!]} // TODO: Handle spectator
                        commitToConflict={moves.commitToConflict}
                        resolveConflict={moves.resolveConflict}
                        pass={moves.pass}
                        anyStage={!!ctx.activePlayers}
                        possibleWars={G.possibleWars}
                        chooseWar={moves.chooseWar}
                        gameover={ctx.gameover}
                        playerMap={playerMap}
                        toggleModal={toggleModal}
                        actionsLeft={G.players[playerID!]!.actions}
                        myTurn={playerID === ctx.currentPlayer}
                        discardTiles={moves.discardTiles}
                        conflict={G.conflict}
                    />
                </Column>
                {!!ctx.gameover ? <ScoreDetailsModal open={modalOpen} toggle={toggleModal} players={G.players} playerMap={playerMap}/> : null}
            </div>
        </ThemeProvider>
        </DraggableContext.Provider>
        </DndProvider>
    )
}

