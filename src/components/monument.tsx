import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { BLACK, BLUE, Color, GREEN, RED } from '../static/colors'

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        background: 'orange'
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
        <div className={`${classes.root}`}></div>
    )
}

export default MonumentComp