import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { BLACK, BLUE, Color, GREEN, RED } from '../static/colors'

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inner: {
        height: '50%',
        width: '50%',
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


const MonumentComp = ({colors}: {colors: [Color, Color]}) => {

    let classes = useStyles()

    return (
        <div className={`${classes.root} ${classes[colors[0]]}`}>
            <div className={`${classes.inner} ${classes[colors[1]]}`}/>
        </div>
    )
}

export default MonumentComp