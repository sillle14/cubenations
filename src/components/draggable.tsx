import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDrag } from 'react-dnd'

import { Dragged } from '../models/pieces'

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%'
    }
})

type DraggableProps = {
    item: Dragged,
    draggable: boolean
}

const Draggable: FunctionComponent<DraggableProps> = ({item, draggable, children}) => {

    const [, drag] = useDrag({
        item: item,
        canDrag: draggable
    })
    const classes = useStyles()

    return (
        <div ref={drag} className={classes.root}>{children}</div>
    )
}

export default Draggable