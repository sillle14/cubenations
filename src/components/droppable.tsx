import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDrop } from 'react-dnd'

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%'
    }
})

// TODO: Better typing here
type DroppableProps = {
    accept: any,
    canDrop: any,
    onDrop: any
}

const Droppable: FunctionComponent<DroppableProps> = ({accept, canDrop, onDrop, children}) => {

    const [, drop] = useDrop({accept, canDrop, drop: onDrop})
    const classes = useStyles()

    return (
        <div ref={drop} className={classes.root}>{children}</div>
    )
}

export default Droppable