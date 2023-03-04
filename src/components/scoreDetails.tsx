import { PlayerID } from 'boardgame.io'
import Modal from 'react-modal'
import styled from '@emotion/styled';

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
        transform: 'translate(-50%, -50%)',
        color: '#37474f'
    }
}

const ModalTable = styled.div({
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
        border: '1px solid #37474f'
    }
})

const Footer = styled.div({
    display: 'flex',
    marginTop: '10px',
    flexDirection: 'row-reverse'
})

type ScoreDetailProps = {
    open: boolean,
    toggle: () => void,
    players: {[playerID in PlayerID]?: Player}
    playerMap: {[id in PlayerID]: string}
}
const ScoreModal = ({open, toggle, players, playerMap}: ScoreDetailProps) => {

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
        <ModalTable>
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </ModalTable>
        <Footer>
            <button onClick={toggle}>Close</button>
        </Footer>
    </Modal>
}

export default ScoreModal