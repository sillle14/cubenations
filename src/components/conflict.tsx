import { makeStyles } from '@material-ui/styles'
import React from 'react'

import { TILE_SIZE } from '../static/display'
import { Conflict } from '../models/conflict'

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

// TODO: playerMap types
const ConflictComp = ({conflict, playerMap}: {conflict: Conflict | null, playerMap: any}) => {

    const classes = useStyles()

    if (!conflict) {
        return (
            <div className={classes.root}>
                <span>Peace</span>
            </div>
        )
    }

    // There are always exactly two players involved in a conflict.
    const player1 = Object.keys(conflict.players)[0]
    const player2 = Object.keys(conflict.players)[1]

    return (
        <div className={classes.root}>
            <span>{conflict.type}</span>
            <span>{`${playerMap[player1]} vs ${playerMap[player2]}`}</span>
            <span>Base</span>
            <div className={classes.split}>
                <span>{conflict.players[player1].base}</span>
                <span>{conflict.players[player2].base}</span>
            </div>
            <span>Support</span>
            <div className={classes.split}>
                <span>{conflict.players[player1].support || 0}</span>
                <span>{conflict.players[player2].support || 0}</span>
            </div>
            <span>Drag Support Here:</span>
            <div className={classes.tileContainer}></div>
        </div>
    )
}

export default ConflictComp