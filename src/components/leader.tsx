import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/styles'
import { PlayerID } from 'boardgame.io'

import { BLACK, BLUE, Color, GREEN, RED } from '../static/colors'
import { LEADER } from '../models/pieces'
import { Coord } from '../models/board'
import Draggable from './draggable'
import DraggableContext from './draggableContext'

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%'
    },
    [RED]: {
        background: 'red',
    },
    [BLUE]: {
        background: 'blue',
    },
    [GREEN]: {
        background: 'green',
    },
    [BLACK]: {
        background: 'black',
    },
    '0': {clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'},
    '1': {clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'},
    '2': {clipPath: 'circle(50% at 50% 50%)'},
    '3': {clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'}
})

const LeaderComp = ({color, playerID, location}: {color: Color, playerID: PlayerID, location: Coord | null}) => {

    let classes = useStyles()

    const {canDragLeader} = useContext(DraggableContext)

    return (
        <Draggable 
            item={{type: LEADER, color: color, playerID: playerID, source: location}}
            draggable={canDragLeader(playerID)}
        >
            <div className={`${classes.root} ${classes[color]} ${classes[playerID as '0' | '1' | '2' | '3']}`}/>
        </Draggable>
    )
}

export default LeaderComp