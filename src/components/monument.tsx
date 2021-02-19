import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { BLACK, BLUE, Color, GREEN, RED } from '../static/colors'
import { GRID_BORDER, TILE_PAD, TILE_SIZE } from '../static/display'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: `calc((${TILE_SIZE} + ${TILE_PAD}) * 2 + ${GRID_BORDER})`,
        width: `calc((${TILE_SIZE} + ${TILE_PAD}) * 2 + ${GRID_BORDER})`,
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