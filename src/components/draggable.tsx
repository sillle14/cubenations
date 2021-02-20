import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDrag } from 'react-dnd'

import { Dragged } from '../models/pieces'

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%'
    },
    draggable: {
        '& *': {cursor: 'grab'}
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
        <div ref={drag} className={`${classes.root} ${draggable ? classes.draggable : ''}`}>{children}</div>
    )
}

export default Draggable