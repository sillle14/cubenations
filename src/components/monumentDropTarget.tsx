import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'

import { Coord } from '../models/board'
import { GRID_BORDER, TILE_SIZE, TILE_PAD } from '../static/display'
import Droppable from './droppable'
import { MONUMENT, DraggedMonument } from '../models/pieces'

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        height: `calc(${TILE_SIZE} + ${GRID_BORDER})`,
        width: `calc(${TILE_SIZE} + ${GRID_BORDER})`,
        background: 'rgba(255, 0, 0, 0.5)',
    },
    br: {
        position: 'absolute',
        height: `calc(${TILE_SIZE} + ${GRID_BORDER})`,
        width: `calc(${TILE_SIZE} + ${GRID_BORDER})`,
        background: 'rgba(0, 255, 255, 0.5)',
        right: `calc((${TILE_SIZE} + 2 * ${TILE_PAD} + ${GRID_BORDER}) * 11.5 + ${GRID_BORDER} * 0.5 + ${TILE_PAD})`,
        bottom: `calc((${TILE_SIZE} + 2 * ${TILE_PAD} + ${GRID_BORDER}) * 7.5 + ${GRID_BORDER} * 0.5 + ${TILE_PAD})`,
    }
})
interface MDTProps {
    position: Coord
}
const MonumentDropTarget: FunctionComponent<MDTProps> = ({position}) => {

    const classes = useStyles()

    const top = `calc((${TILE_SIZE} + 2 * ${TILE_PAD} + ${GRID_BORDER}) * ${position.y + 0.5} + ${GRID_BORDER} * 0.5 + ${TILE_PAD})`
    const left = `calc((${TILE_SIZE} + 2 * ${TILE_PAD} + ${GRID_BORDER}) * ${position.x + 0.5} + ${GRID_BORDER} * 0.5 + ${TILE_PAD})`

    // TODO: Calculate left and top based on the position of the top left.
    // Also, call the move for placing a monument on drop.

    return (
        <div className={classes.root} style={{left, top}}>
            <Droppable accept={MONUMENT} canDrop={() => true} onDrop={(i: DraggedMonument) => {console.log(i)}}/>
        </div>
    )
}

export default MonumentDropTarget