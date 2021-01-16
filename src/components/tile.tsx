import { makeStyles } from '@material-ui/styles'
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
    }
})

const TileComp = ({color}: {color: Color}) => {

    let classes = useStyles()

    return (
        <div className={`${classes.root} ${classes[color]}`}></div>
    )
}

export default TileComp