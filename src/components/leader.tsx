import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { PlayerID } from 'boardgame.io'

import { BLACK, BLUE, Color, GREEN, RED } from '../static/colors'
import { Draggable } from './draggable'
import { LEADER } from '../models/pieces'
import { Coord } from '../models/board'

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
    '1': {clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'}
})

const LeaderComp = ({color, playerID, location}: {color: Color, playerID: PlayerID, location: Coord | null}) => {

    let classes: any = useStyles() // TODO: types

    return (
        <Draggable item={{type: LEADER, color: color, playerID: playerID, location: location}}>
            <div className={`${classes.root} ${classes[color]} ${classes[playerID]}`}/>
        </Draggable>
    )
}

export default LeaderComp