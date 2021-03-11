import { makeStyles } from '@material-ui/styles'
import { PlayerID } from 'boardgame.io'
import Modal from 'react-modal'
import React, { FunctionComponent } from 'react'

import Player from '../models/player'
import { Color } from '../static/colors'
import { TREASURE } from '../models/pieces'

Modal.setAppElement('#root')

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

const useStyles = makeStyles({
    root: {
        borderCollapse: 'collapse',
        '& thead th:nth-child(1)': {
            width: '100px'
        },
        '& thead th:nth-child(n+2)': {
            width: '50px',
            textTransform: 'capitalize'
        },
        '& th, td': {
            padding: '10px',
            border: '1px solid black'
        }
    },
    footer: {
        display: 'flex',
        marginTop: '10px',
        flexDirection: 'row-reverse'
    }
})

// TODO: Make this prettier

type ScoreDetailProps = {
    open: boolean,
    toggle: () => void,
    players: {[playerID in PlayerID]?: Player}
    playerMap: {[id in PlayerID]: string}
}
const ScoreModal: FunctionComponent<ScoreDetailProps> = ({open, toggle, players, playerMap}) => {

    const classes = useStyles()

    let headers = [<th key="player">Player</th>]
    let rows = []
    let headerDone = false
    for (const pid in players) {
        let cells = [<th key="player" scope="row">{playerMap[pid]}</th>]
        for (const color in players[pid]!.score) {
            // Only add to header for the first player.
            if (!headerDone) {
                headers.push(<th key={color}>{color}</th>)
            }
            cells.push(<td key={color}>{players[pid]!.score[color as Color | typeof TREASURE]}</td>)
        }
        headerDone = true
        rows.push(<tr key={pid}>{cells}</tr>)
    }

    return <Modal isOpen={open} onRequestClose={toggle} style={modalStyles}>
        <h2>Score Details</h2>
        <table className={classes.root}>
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
        <div className={classes.footer}>
            <button onClick={toggle}>Close</button>
        </div>
    </Modal>
}

export default ScoreModal