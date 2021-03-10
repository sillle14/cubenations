import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { Color } from '../static/colors'
import { backgroundColors, sizingTheme } from '../static/display'

const useStyles = makeStyles((theme: sizingTheme) => Object.assign({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: `calc((${theme.tileSize} + ${theme.tilePad}) * 2 + ${theme.border})`,
        width: `calc((${theme.tileSize} + ${theme.tilePad}) * 2 + ${theme.border})`,
    },
    inner: {
        height: '50%',
        width: '50%',
        border: 'solid rgba(0, 0, 0, 0.5)'
    }
}, backgroundColors))


const MonumentComp = ({colors}: {colors: [Color, Color]}) => {

    let classes = useStyles()

    return (
        <div className={`${classes.root} ${classes[colors[0]]}`}>
            <div className={`${classes.inner} ${classes[colors[1]]}`}/>
        </div>
    )
}

export default MonumentComp