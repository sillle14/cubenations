import { makeStyles } from '@material-ui/styles'
import { PlayerID } from 'boardgame.io'
import React from 'react'

import { BLACK, BLUE, Color, GREEN, RED } from '../static/colors'

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

const LeaderComp = ({color, playerID}: {color: Color, playerID: PlayerID}) => {

    let classes: any = useStyles()

    return (
        <div className={`${classes.root} ${classes[color]} ${classes[playerID]}`}/>
    )
}

export default LeaderComp