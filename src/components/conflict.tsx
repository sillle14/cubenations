import styled from '@emotion/styled';

import { Conflict } from '../models/conflict'
import { PlayerID } from 'boardgame.io'
import Header from './styled/header';
import Box from './styled/box';

const Break = styled.hr({
    width: '90%',
    color: 'black',
    border: 'solid 1px',
    margin: '3% 0'
})

const Split = styled.div({
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%'
})

const Footnote = styled.span({
    alignSelf: 'start',
    marginLeft: '10%',
    fontSize: 'smaller'
})

const Winner = styled.span({ margin: '5% 0' })

type ConflictProps = {
    conflict: Conflict,
    playerMap: {[id in PlayerID]: string},
    tempSupport: number,
    playerID: PlayerID | null,
    resolution: boolean
}
const ConflictComp = ({conflict, playerMap, tempSupport, playerID, resolution}: ConflictProps) => {

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
        <Box>
            <Header>{color} {conflict.type}</Header>
            <span>{`${playerMap[player1]}${conflict.aggressor === player1 ? '*' : ''} vs ${playerMap[player2]}${conflict.aggressor === player2 ? '*' : ''}`}</span>
            <Break/>
            <span>Base</span>
            <Split>
                <span>{conflict.players[player1].base}</span>
                <span>{conflict.players[player2].base}</span>
            </Split>
            <span>Support</span>
            <Split>
                <span>{player1Support}</span>
                <span>{player2Support}</span>
            </Split>
            {resolution ? <Winner>{`${playerMap[conflict.winner!]} wins!`}</Winner> : <br/>}
            <Footnote>*Aggressor</Footnote>
        </Box>
    )
}

export default ConflictComp