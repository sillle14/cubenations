import { PlayerID } from 'boardgame.io'
import styled, { CSSObject } from '@emotion/styled';

import { Conflict } from '../models/conflict'
import { Color } from '../static/colors'
import { CHOOSE_WAR, CONFLICT, MONUMENT, RESOLVE_CONFLICT, TREASURE } from '../static/stages'
import Header from './styled/header';
import Box from './styled/box';

const StyledBox = styled(Box)<{emphasis: boolean}>(({theme, emphasis}) => {
    const style: CSSObject = {
        maxWidth: `calc(${theme.tileSize} * 4 + ${theme.tilePad} * 10 + ${theme.border} * 2)`,
    }
    if (emphasis) { style.background = '#ffecb3!important' }
    return style
})

const Message = styled.p(({theme}) => ({
    margin: `${theme.tilePad} calc(${theme.tilePad} * 2)`,
    textAlign: 'center'
}))

const Button = styled.button({
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
    ':focus': { outline: 'none' },
    ':hover': {
        background: '#455a64',
        color: '#f5f5f5',
    }
})

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
const ActionBox = ({
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
}: ActionProps) => {

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

    return <StyledBox emphasis={emphasis}>
        <Header>{title}</Header>
        {!!message ? <Message>{message}</Message> : null}
        {(buttons || []).map(({text, onClick}, i) => <Button key={i} onClick={onClick}>{text}</Button>)}
    </StyledBox>
}

export default ActionBox