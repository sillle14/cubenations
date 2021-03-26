import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'

import { Color } from '../../static/colors'
import { sizingTheme, tiles } from '../../static/display'
import { CATASTROPHE } from '../../models/pieces'
import catastrophe from '../assets/tiles/catastrophe.svg'

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
type TileProps = {
    color: Color | typeof CATASTROPHE,
    opacity?: number,
    noShadow?: boolean
}
const TileComp: FunctionComponent<TileProps> = ({color, opacity, noShadow}) => {

    let classes = useStyles()

    const src = color === CATASTROPHE ? catastrophe : tiles[color]

    return (
        <div className={classes.root} style={noShadow ? {boxShadow: 'unset'} : {}}>
            <img draggable={false} src={src} alt={`${color} tile`} style={{opacity: opacity}}/>
        </div>
    )
}

export default TileComp
