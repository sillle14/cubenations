import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/styles'
import { PlayerID } from 'boardgame.io'

import { Color } from '../static/colors'
import { LEADER } from '../models/pieces'
import { Coord } from '../models/board'
import LeaderImg from './leaderImage'
import Draggable from './draggable'
import DraggableContext from './draggableContext'
import { backgroundColors } from '../static/display'

const useStyles = makeStyles(Object.assign({
    root: {
        height: '100%',
        width: '100%',
        display: 'block'
    },
    shadow: {
        position: 'absolute' as 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        display: 'block',
        filter: 'drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.6))',
        fill: 'transparent',
        stroke: 'transparent'
    }
}, backgroundColors))

const LeaderComp = ({color, playerID, location}: {color: Color, playerID: PlayerID, location: Coord | null}) => {

    let classes = useStyles()

    const {canDragLeader} = useContext(DraggableContext)

    return (
        <div style={{position: 'relative'}}>
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