import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDrag } from 'react-dnd'

import { Dragged } from '../../models/pieces'

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        position: 'relative',
        zIndex: 0       // This ensures that only the div is dragged, and not the background.
    },
    draggable: {
        '& *': {cursor: 'grab'}
    },
    dragging: {
        '& img': {
            opacity: 0.4
        },
        '& svg': {
            opacity: 0.4,
            strokeOpacity: 0.4,
        }
    }
})

type DraggableProps = {
    item: Dragged,
    draggable: boolean
}

const Draggable: FunctionComponent<DraggableProps> = ({item, draggable, children}) => {

    const [{isDragging}, drag] = useDrag({
        item: item,
        canDrag: draggable,
        collect: (monitor) => ({isDragging: !!monitor.isDragging()})
    })
    const classes = useStyles()

    let className = classes.root
    if (draggable) {className += ` ${classes.draggable}`}
    if (isDragging) {className += ` ${classes.dragging}`}

    return (
        <div ref={drag} className={className}>{children}</div>
    )
}

export default Draggable