import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDrop } from 'react-dnd'

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        position: 'relative'
    },
    dropTarget: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.7,
        backgroundColor: 'white',
    }
})

type DroppableProps = {
    accept: string | Array<string>,
    canDrop: (item: any) => boolean,
    onDrop: (item: any) => void
}

const Droppable: FunctionComponent<DroppableProps> = ({accept, canDrop, onDrop, children}) => {

    const [{isOver, valid}, drop] = useDrop({
        accept, canDrop, 
        drop: onDrop,
        collect: (monitor => ({isOver: !!monitor.isOver(), valid: !!monitor.canDrop()}))
    })
    const classes = useStyles()

    return (
        <div ref={drop} className={classes.root}>
            {/* {isOver && valid && <div className={classes.dropTarget}/>} */}
            {children}
        </div>
    )
}

export default Droppable