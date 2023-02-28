import { makeStyles } from '@material-ui/styles'
import { PlayerID } from 'boardgame.io'
import React, { FunctionComponent } from 'react'
import { Conflict } from '../models/conflict'
import { Color } from '../static/colors'
import { sizingTheme } from '../static/display'
import { CHOOSE_WAR, CONFLICT, MONUMENT, RESOLVE_CONFLICT, TREASURE } from '../static/stages'

const useStyles = makeStyles((theme: sizingTheme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.tilePad} 0`,
        maxWidth: `calc(${theme.tileSize} * 4 + ${theme.tilePad} * 10 + ${theme.border} * 2)`,
        '& span:first-child': {
            width: 'max-content',
            fontSize: 'larger',
            fontWeight: 'bolder',
        },
        '& > p': {
            margin: `${theme.tilePad} calc(${theme.tilePad} * 2)`,
            textAlign: 'center'
        },
        '& > button': {
            minWidth: '40%',
            textTransform: 'capitalize',
            background: '#f5f5f5',
            borderRadius: '3px',
            border: '2px solid #455a64',
            color: '#455a64',
            fontWeight: 'bolder',
            cursor: 'pointer',
            padding: '2%',
            marginBottom: '2%',
        },
        '& > button:hover': {
            background: '#455a64',
            color: '#f5f5f5',
        },
        '& > button:focus': {
            outline: 'none'
        }
    },
    emphasis: {
        background: '#ffecb3!important'
    }
}))

type ActionProps = {
    stage: string,
    selected: Array<number>,
    commitToConflict: (handIdxs: Array<number>) => void,
    discardTiles: (handIdxs: Array<number>) => void,
    clearSelected: () => void,
    resolveConflict: () => void,
    possibleWars?: Array<Color>,
    chooseWar: (color: Color) => void,
    pass: () => void,
    anyStage: boolean,
    myTurn: boolean,
    gameover?: {winnerIDs: Array<PlayerID>},
    playerMap: {[id in PlayerID]: string},
    toggleModal: () => void,
    actionsLeft: number,
    conflict: Conflict | null,
    spectator: boolean
}
const ActionBox: FunctionComponent<ActionProps> = ({
    stage, 
    commitToConflict, 
    discardTiles, 
    clearSelected,
    resolveConflict, 
    selected, 
    possibleWars, 
    chooseWar, 
    pass, 
    anyStage, 
    myTurn, 
    gameover, 
    playerMap, 
    toggleModal, 
    actionsLeft, 
    conflict, 
    spectator
}) => {

    const classes = useStyles()

    let title = ''
    let message = null
    let buttons: Array<{text: string, onClick: () => void}> = []
    let emphasis = true

    switch (stage) {
        case CONFLICT:
            title = `${conflict!.type}!`
            message = `Commit ${selected.length} ${conflict!.color} tile${selected.length !== 1 ? 's' : ''} to the conflict.`
            buttons = [
                {text: 'confirm', onClick: () => {commitToConflict(selected)}}
            ]
            break
        case RESOLVE_CONFLICT:
            title = 'Conflict Resolved'
            buttons = [
                {text: 'confirm', onClick: () => {resolveConflict()}},
            ]
            break
        case CHOOSE_WAR:
            title = 'Choose war'
            message = 'Pick a color to resolve first.'
            buttons = possibleWars!.map(c => {return {text: c, onClick: () => {chooseWar(c)}}})
            break
        case MONUMENT:
            title = 'Choose a Monument'
            message = 'Drag an available monument or pass'
            buttons = [{text: 'pass', onClick: () => {pass()}}]
            break
        case TREASURE:
            title = 'Collect treasure'
            message = 'Drag available treasure to your score board.'
            break
        default:
            if (myTurn && !anyStage) {
                if (!selected.length) {
                    title = `${actionsLeft} action${actionsLeft > 1 ? 's' : ''} left`
                    // TODO: Add undo for basic moves
                    // TODO: Add another stage here, and confirm move.
                    message = 'Place a tile or catastrophe, move a leader, click a tile to discard, or pass.'
                    buttons = [
                        {text: 'pass', onClick: () => {pass()}},
                    ]
                } else {
                    title = 'Discard'
                    message = `Discard and replace ${selected.length} selected tile${selected.length > 1 ? 's' : ''}?`
                    buttons = [
                        {text: 'confirm', onClick: () => {discardTiles(selected)}},
                        {text: 'cancel', onClick: () => {clearSelected()}}
                    ]
                }
            } else {
                emphasis = false
                title = spectator ? 'Spectating' : 'Wait for your turn'
            }
            break
    }

    if (gameover) {
        let winMessage: string
        emphasis = false
        if (gameover.winnerIDs.length > 1) {
            winMessage = `Players ${gameover.winnerIDs.map(pid => playerMap[pid]).join(' and ')} tie.`
        } else {
            winMessage = `${playerMap[gameover.winnerIDs[0]]} wins!`
        }
        title = 'Game Over!'
        message = winMessage
        buttons = [{text: 'Score Details', onClick: toggleModal}]
    }

    return <div className={`${classes.root} ${emphasis ? classes.emphasis : ''}`}>
        <span>{title}</span>
        {!!message ? <p>{message}</p> : null}
        {(buttons || []).map(({text, onClick}, i) => <button key={i} onClick={onClick}>{text}</button>)}
    </div>
}

export default ActionBox