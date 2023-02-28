import { makeStyles } from '@mui/styles'
import React, { FunctionComponent } from 'react'

import { sizingTheme } from '../static/display'
import { Conflict } from '../models/conflict'
import { PlayerID } from 'boardgame.io'

const useStyles = makeStyles((theme: sizingTheme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.tilePad} 0`,
        '& hr': {
            width: '90%',
            color: 'black',
            border: 'solid 1px',
            margin: '3% 0'
        }
    },
    header: {
        fontSize: 'larger',
        fontWeight: 'bolder',
    },
    split: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%'
    },
    aggressor: {
        alignSelf: 'start',
        marginLeft: '10%',
        fontSize: 'smaller'
    },
    winner: {
        margin: '5% 0'
    }
}))

type ConflictProps = {
    conflict: Conflict,
    playerMap: {[id in PlayerID]: string},
    tempSupport: number,
    playerID: PlayerID | null,
    resolution: boolean
}
const ConflictComp: FunctionComponent<ConflictProps> = ({conflict, playerMap, tempSupport, playerID, resolution}) => {

    const classes = useStyles()

    // There are always exactly two players involved in a conflict.
    const player1 = Object.keys(conflict.players)[0]
    const player2 = Object.keys(conflict.players)[1]
    let player1Support: number | '?'
    let player2Support: number | '?'
    player1Support = conflict.players[player1].support === undefined ? '?' : conflict.players[player1].support!
    player2Support = conflict.players[player2].support === undefined ? '?' : conflict.players[player2].support!
    if (playerID === player1) {
        player1Support = conflict.players[player1].support || tempSupport
    } else if (playerID === player2) {
        player2Support = conflict.players[player2].support || tempSupport
    }

    let color
    if (Conflict.isRevolt(conflict)) {
        color = `${conflict.leaderColor.charAt(0).toUpperCase()}${conflict.leaderColor.slice(1)}`
    } else {
        color = `${conflict.color.charAt(0).toUpperCase()}${conflict.color.slice(1)}`
    }

    return (
        <div className={classes.root}>
            <span className={classes.header}>{color} {conflict.type}</span>
            <span>{`${playerMap[player1]}${conflict.aggressor === player1 ? '*' : ''} vs ${playerMap[player2]}${conflict.aggressor === player2 ? '*' : ''}`}</span>
            <hr/>
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
            {resolution ? <span className={classes.winner}>{`${playerMap[conflict.winner!]} wins!`}</span> : <br/>}
            <span className={classes.aggressor}>*Aggressor</span>
        </div>
    )
}

export default ConflictComp