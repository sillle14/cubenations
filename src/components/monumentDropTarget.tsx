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
    }
})
interface MDTProps {
    position: Coord,
    placeMonument: (position: Coord, idx: number) => void
}
const MonumentDropTarget: FunctionComponent<MDTProps> = ({position, placeMonument}) => {

    const classes = useStyles()

    const top = `calc((${TILE_SIZE} + 2 * ${TILE_PAD} + ${GRID_BORDER}) * ${position.y + 0.5} + ${GRID_BORDER} * 0.5 + ${TILE_PAD})`
    const left = `calc((${TILE_SIZE} + 2 * ${TILE_PAD} + ${GRID_BORDER}) * ${position.x + 0.5} + ${GRID_BORDER} * 0.5 + ${TILE_PAD})`

    return (
        <div className={classes.root} style={{top, left}}>
            <Droppable 
                accept={MONUMENT} 
                canDrop={() => true} 
                onDrop={(item: DraggedMonument) => {placeMonument(position, item.monumentIndex)}}
            />
        </div>
    )
}

export default MonumentDropTarget