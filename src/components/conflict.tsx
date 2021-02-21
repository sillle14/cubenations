import { makeStyles } from '@material-ui/styles'
import React, { FunctionComponent } from 'react'

import { TILE_SIZE } from '../static/display'
import { Conflict } from '../models/conflict'
import { DraggedTile, TILE } from '../models/pieces'
import Droppable from './droppable'
import { PlayerID } from 'boardgame.io'

const useStyles = makeStyles({
    root: {
        background: 'tan',
        padding: '10px',
        height: 'max-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    split: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%'
    },
    tileContainer: {
        height: TILE_SIZE,
        width: TILE_SIZE,
        padding: '6px',
        background: 'white'
    }
})

export const PeaceComp = () => {

    const classes = useStyles()
    
    return <div className={classes.root}>
            <span>Peace</span>
        </div>
}

type ConflictProps = {
    conflict: Conflict,
    playerMap: {[id in PlayerID]: string},
    tempSupport: number,
    addSupport: (handIdx: number) => void,
    playerID: PlayerID,
    resolution: boolean
}
const ConflictComp: FunctionComponent<ConflictProps> = ({conflict, playerMap, tempSupport, addSupport, playerID, resolution}) => {

    const classes = useStyles()

    // There are always exactly two players involved in a conflict.
    const player1 = Object.keys(conflict.players)[0]
    const player2 = Object.keys(conflict.players)[1]
    let player1Support: number | '?' = '?'
    let player2Support: number | '?' = '?'
    if (resolution) {
        player1Support = conflict.players[player1].support || 0
        player2Support = conflict.players[player2].support || 0
    } else if (playerID === player1) {
        player1Support = conflict.players[player1].support || tempSupport
    } else if (playerID === player2) {
        player2Support = conflict.players[player2].support || tempSupport
    }

    return (
        <div className={classes.root}>
            <span>{conflict.type}</span>
            <span>{`${playerMap[player1]} vs ${playerMap[player2]}`}</span>
            <span>{`Aggressor: ${playerMap[conflict.aggressor]}`}</span>
            <span>Base</span>
            <div className={classes.split}>
                <span>{conflict.players[player1].base}</span>
                <span>{conflict.players[player2].base}</span>
            </div>
            <span>Support</span>
            <div className={classes.split}>
                <span>{player1Support}</span>
                <span>{player2Support}</span>
            </div>
            {resolution ? <span>{`${playerMap[conflict.winner!]} wins!`}</span> : (
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <span>{`Drag ${conflict.color} support here:`}</span>
                    <div className={classes.tileContainer}>
                        <Droppable 
                            accept={TILE} 
                            canDrop={(item: DraggedTile) => item.color === conflict.color}
                            onDrop={(item: DraggedTile) => {addSupport(item.handIndex)}}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ConflictComp