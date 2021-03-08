import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/styles'

import { GRID_BORDER, TILE_PAD, TILE_SIZE } from '../static/display'
import { Coord } from '../models/board'
import Draggable from './draggable'
import { TREASURE } from '../models/pieces'
import DraggableContext from './draggableContext'

const useStyles = makeStyles({
    root: {
        height: `calc(${TILE_SIZE} / 3)`,
        width: `calc(${TILE_SIZE} / 3)`,
        position: 'absolute',
    },
    color: {
        background: 'tan',
        border: `${GRID_BORDER} solid black`,
        height: '100%',
        width: '100%'
    }
})

// TODO: Make the treasure a bit asymetrical so we don't need the tilesize to be divisble for it to look right.

const TreasureComp = ({location}: {location: Coord}) => {

    let classes = useStyles()

    const {canDragTreasure} = useContext(DraggableContext)

    const top = `calc((${TILE_SIZE} + 2 * ${TILE_PAD}) * ${location.y + 0.5} + ${GRID_BORDER} * ${location.y} - ${TILE_SIZE} / 6)`
    const left = `calc((${TILE_SIZE} + 2 * ${TILE_PAD}) * ${location.x + 0.5} + ${GRID_BORDER} * ${location.x} - ${TILE_SIZE} / 6)`

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
