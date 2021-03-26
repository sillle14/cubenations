import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { Color } from '../../static/colors'
import { monuments } from '../../static/display'
import { sizingTheme } from '../../static/display'

const useStyles = makeStyles((theme: sizingTheme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: `calc((${theme.tileSize} + ${theme.tilePad}) * 2 + ${theme.border})`,
        width: `calc((${theme.tileSize} + ${theme.tilePad}) * 2 + ${theme.border})`,
        borderRadius: `calc(0.4 * ${theme.tileSize})`,
        boxShadow: '2px 2px 5px #616161'
    }
}))


const MonumentComp = ({colors, noShadow}: {colors: [Color, Color], noShadow?: boolean}) => {

    let classes = useStyles()

    return (
        <div className={`${classes.root}`} style={noShadow ? {boxShadow: 'unset'} : {}}>
            <img src={monuments[`${colors[0]}${colors[1]}`]} alt={`${colors[0]}${colors[1]}Monument`} draggable={false}/>
        </div>
    )
}

export default MonumentComp