import { PlayerID } from 'boardgame.io'
import Modal from 'react-modal'
import React, { FunctionComponent } from 'react'

import Player from '../models/player'

type ScoreDetailProps = {
    open: boolean,
    toggle: () => void,
    players: {[playerID in PlayerID]?: Player}
}
const ScoreModal: FunctionComponent<ScoreDetailProps> = ({open, toggle, players}) => {
    return <Modal isOpen={open} onRequestClose={toggle}>
        <span>Test</span>
        <button onClick={toggle}>Close</button>
    </Modal>
}

export default ScoreModal