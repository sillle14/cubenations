import { makeStyles } from '@material-ui/styles'
import { PlayerID } from 'boardgame.io'
import React, { FunctionComponent } from 'react'
import { Conflict } from '../models/conflict'
import { Color } from '../static/colors'
import { GRID_BORDER, TILE_PAD, TILE_SIZE } from '../static/display'
import { CHOOSE_WAR, CONFLICT, MONUMENT, RESOLVE_CONFLICT, TREASURE } from '../static/stages'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${TILE_PAD} 0`,
        maxWidth: `calc(${TILE_SIZE} * 4 + ${TILE_PAD} * 10 + ${GRID_BORDER} * 2)`,
        '& span:first-child': {
            width: 'max-content',
            fontSize: 'larger',
            fontWeight: 'bolder',
        },
        '& > p': {
            margin: `${TILE_PAD} calc(${TILE_PAD} * 2)`,
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
    }
})

// TODO: Clean this up
type ActionProps = {
    stage: string,
    selected: Array<number>,
    commitToConflict: (handIdxs: Array<number>) => void,
    discardTiles: (handIdxs: Array<number>) => void,
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
    conflict: Conflict | null
}
const ActionBox: FunctionComponent<ActionProps> = ({stage, commitToConflict, discardTiles, resolveConflict, selected, possibleWars, chooseWar, pass, anyStage, myTurn, gameover, playerMap, toggleModal, actionsLeft, conflict}) => {

    const classes = useStyles()

    let title = ''
    let message = null
    let buttons: Array<{text: string, onClick: () => void}> = []

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
            message = 'Drag an availble monument or pass'
            buttons = [{text: 'pass', onClick: () => {pass()}}]
            break
        // case TREASURE:
        //     action = <Action message="Collect treasure.">
        //         <div className={classes.tileContainer} style={{background: 'white', alignSelf: 'center'}}>
        //             <Droppable 
        //                 accept={TREASURE} 
        //                 canDrop={() => true}
        //                 onDrop={(item: DraggedTreasure) => {takeTreasure(item.source)}}
        //             />
        //         </div>
        //     </Action>
        //     break
        default:
            if (myTurn && !anyStage) {
                if (!selected.length) {
                    title = `${actionsLeft} action${actionsLeft > 1 ? 's' : ''} left`
                    message = 'Place a tile or catastrophe, move a leader, discard, or pass.'
                    buttons = [
                        {text: 'pass', onClick: () => {pass()}},
                    ]
                } else {
                    title = 'Discard'
                    message = `Discard and replace ${selected.length} selected tile${selected.length > 1 ? 's' : ''}?`
                    buttons = [
                        {text: 'confirm', onClick: () => {discardTiles(selected)}}
                    ]
                }
            } else {
                title = 'Wait for your turn'
            }
            break
    }

    if (gameover) {
        let winMessage: string
        if (gameover.winnerIDs.length > 1) {
            winMessage = `Players ${gameover.winnerIDs.map(pid => playerMap[pid]).join(' and ')} tie.`
        } else {
            winMessage = `${playerMap[gameover.winnerIDs[0]]} wins!`
        }
        title = 'Game Over!'
        message = winMessage
        buttons = [{text: 'Score Details', onClick: toggleModal}]
    }

    return <div className={classes.root}>
        <span>{title}</span>
        {!!message ? <p>{message}</p> : null}
        {(buttons || []).map(({text, onClick}, i) => <button key={i} onClick={onClick}>{text}</button>)}
    </div>
}

export default ActionBox