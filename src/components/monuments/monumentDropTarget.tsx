import React, { FunctionComponent } from 'react'
import { makeStyles, useTheme } from '@mui/styles'

import { Coord } from '../../models/board'
import { sizingTheme } from '../../static/display'
import Droppable from '../dnd/droppable'
import { MONUMENT, DraggedMonument } from '../../models/pieces'

const useStyles = makeStyles((theme: sizingTheme) => ({
    root: {
        position: 'absolute',
        height: `calc(${theme.tileSize} + ${theme.border})`,
        width: `calc(${theme.tileSize} + ${theme.border})`,
    }
}))
interface MDTProps {
    position: Coord,
    placeMonument: (position: Coord, idx: number) => void
}
const MonumentDropTarget: FunctionComponent<MDTProps> = ({position, placeMonument}) => {

    const classes = useStyles()
    const theme: sizingTheme = useTheme()

    const top = `calc((${theme.tileSize} + 2 * ${theme.tilePad} + ${theme.border}) * ${position.y + 0.5} + ${theme.border} * 0.5 + ${theme.tilePad})`
    const left = `calc((${theme.tileSize} + 2 * ${theme.tilePad} + ${theme.border}) * ${position.x + 0.5} + ${theme.border} * 0.5 + ${theme.tilePad})`

    const monumentSize = `calc((${theme.tileSize} + ${theme.tilePad}) * 2 + ${theme.border})`
    const offset = `calc(${theme.tileSize} / -2 - ${theme.tilePad})`

    return (
        <div className={classes.root} style={{top, left}}>
            <Droppable 
                accept={MONUMENT} 
                canDrop={() => true} 
                onDrop={(item: DraggedMonument) => {placeMonument(position, item.monumentIndex)}}
                showTarget
                targetOffset={offset}
                targetSize={monumentSize}
            />
        </div>
    )
}

export default MonumentDropTarget