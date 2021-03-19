import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'

import { Color } from '../static/colors'
import { sizingTheme, tiles } from '../static/display'

const useStyles = makeStyles((theme: sizingTheme) => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: `calc(0.2 * ${theme.tileSize})`,
        boxShadow: '2px 2px 5px #616161'
    }
}))

const TileComp: FunctionComponent<{color: Color, opacity?: number}> = ({color, opacity}) => {

    let classes = useStyles()

    return (
        <div className={classes.root}><img draggable={false} src={tiles[color]} alt={`${color} tile`} style={{opacity: opacity}}/></div>
    )
}

export default TileComp
