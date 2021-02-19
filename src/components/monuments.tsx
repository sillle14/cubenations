import { makeStyles } from '@material-ui/styles'
import React, { FunctionComponent, useContext } from 'react'

import { TILE_PAD, TILE_SIZE } from '../static/display'
import { Monument } from '../models/pieces'
import MonumentComp from './monument'
import Draggable from './draggable'
import DraggableContext from './draggableContext'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: `calc(${TILE_SIZE} * 3)`,
        height: 'max-content'
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
        <div>
            <span>Monuments</span>
            <div className={classes.root}>
                {monumentComps}
            </div>
        </div>
    )
}

export default MonumentsComp