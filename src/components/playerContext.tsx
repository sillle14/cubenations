import { PlayerID } from 'boardgame.io'
import React from 'react'

type ContextProps = {playerID: PlayerID | null, myTurn: boolean}
const PlayerContext = React.createContext<ContextProps>({playerID: null, myTurn: false})

export default PlayerContext