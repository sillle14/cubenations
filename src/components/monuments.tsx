import { makeStyles } from '@material-ui/styles'
import React, { FunctionComponent, useContext } from 'react'

import { GRID_BORDER, TILE_PAD, TILE_SIZE } from '../static/display'
import { Monument } from '../models/pieces'
import MonumentComp from './monument'
import Draggable from './draggable'
import DraggableContext from './draggableContext'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${TILE_PAD} 0`,
        '& span': {
            width: 'max-content',
            fontSize: 'larger',
            fontWeight: 'bolder',
        }
    },
    monuments: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: `calc(${TILE_SIZE} * 4 + ${TILE_PAD} * 10 + ${GRID_BORDER} * 2)`
    },
    monumentContainer: {
        padding: TILE_PAD,
    },
})

type MonumentProps = {
    monuments: Array<Monument>
}
const MonumentsComp: FunctionComponent<MonumentProps> = ({monuments}) => {

    const classes = useStyles()

    const {canDragMonument} = useContext(DraggableContext)

    const monumentComps = monuments.map((m, i) => 
        m.position ? null : <div className={classes.monumentContainer} key={i}>
            <Draggable item={{...m, monumentIndex: i}} draggable={canDragMonument(m.colors)}><MonumentComp colors={m.colors}/></Draggable>
        </div>
    )

    return (
        <div className={classes.root}>
            <span>Monuments</span>
            <div className={classes.monuments}>
                {monumentComps}
            </div>
        </div>
    )
}

export default MonumentsComp