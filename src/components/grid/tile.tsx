import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'

import { Color } from '../../static/colors'
import { sizingTheme } from '../../static/display'
import { CATASTROPHE } from '../../models/pieces'
import TileImg from './tileImage'

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

    return (
        <div className={classes.root} style={noShadow ? {boxShadow: 'unset'} : {}}>
            <TileImg color={color} opacity={opacity}/>
        </div>
    )
}

export default TileComp
