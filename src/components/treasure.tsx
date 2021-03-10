import React, { useContext } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'

import { sizingTheme } from '../static/display'
import { Coord } from '../models/board'
import Draggable from './draggable'
import { TREASURE } from '../models/pieces'
import DraggableContext from './draggableContext'

const useStyles = makeStyles((theme: sizingTheme) => ({
    root: {
        height: `calc(${theme.tileSize} / 3)`,
        width: `calc(${theme.tileSize} / 3)`,
        position: 'absolute',
    },
    color: {
        background: 'tan',
        border: `${theme.border} solid black`,
        height: '100%',
        width: '100%'
    }
}))

// TODO: Make the treasure a bit asymetrical so we don't need the tilesize to be divisble for it to look right.

const TreasureComp = ({location}: {location: Coord}) => {

    let classes = useStyles()
    const theme: sizingTheme = useTheme()

    const {canDragTreasure} = useContext(DraggableContext)

    const top = `calc((${theme.tileSize} + 2 * ${theme.tilePad}) * ${location.y + 0.5} + ${theme.border} * ${location.y} - ${theme.tileSize} / 6)`
    const left = `calc((${theme.tileSize} + 2 * ${theme.tilePad}) * ${location.x + 0.5} + ${theme.border} * ${location.x} - ${theme.tileSize} / 6)`

    return (
        <div className={classes.root} style={{top, left}}>
            {/* Note that the draggable is within the absolutely positioned object. */}
            <Draggable item={{type: TREASURE, source: location}} draggable={canDragTreasure(location)}>
                <div className={classes.color}/>
            </Draggable>
        </div>
    )
}

export default TreasureComp
