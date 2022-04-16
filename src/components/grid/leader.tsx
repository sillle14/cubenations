import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/styles'
import { PlayerID } from 'boardgame.io'

import { Color } from '../../static/colors'
import { LEADER } from '../../models/pieces'
import { Coord } from '../../models/board'
import LeaderImg from './leaderImage'
import Draggable from '../dnd/draggable'
import DraggableContext from '../dnd/draggableContext'
import { backgroundColors, pulse } from '../../static/display'

const useStyles = makeStyles(Object.assign({
    root: {
        height: '100%',
        width: '100%',
        display: 'block'
    },
    emph: {
        animation: '$pulse 2s infinite'
    },
    shadow: {
        position: 'absolute' as 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        display: 'block',
        filter: 'drop-shadow(2px 2px 3px black)',
        fill: 'transparent',
        stroke: 'transparent',
        opacity: 0.6
    },
}, backgroundColors, pulse))

interface LeaderCompProps {
    color: Color,
    playerID: PlayerID, 
    location: Coord | null,
    inConflict?: boolean
}
const LeaderComp = ({color, playerID, location, inConflict}: LeaderCompProps) => {

    let classes = useStyles()

    const {canDragLeader} = useContext(DraggableContext)

    return (
        <div className={!!inConflict ? classes.emph : ''} style={{position: 'relative'}}>
        {/* Use a second leader img for the shadow so the shadow doesn't mess with the drag. */}
        <LeaderImg playerID={playerID} className={classes.shadow}/>
        <Draggable 
            item={{type: LEADER, color: color, playerID: playerID, source: location}}
            draggable={canDragLeader(playerID)}
        >
            <LeaderImg playerID={playerID} className={`${classes.root} ${classes[color]}`}/>
        </Draggable>
        </div>
    )
}

export default LeaderComp