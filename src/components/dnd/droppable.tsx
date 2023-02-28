import React, { FunctionComponent } from 'react'
import { makeStyles } from '@mui/styles'
import { useDrop } from 'react-dnd'
import { sizingTheme } from '../../static/display'

const useStyles = makeStyles((theme: sizingTheme) => ({
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
        borderRadius: `calc(0.15 * ${theme.tileSize})`,
        boxShadow: '2px 2px 5px #616161',
    }
}))

type DroppableProps = {
    accept: string | Array<string>,
    canDrop: (item: any) => boolean,
    onDrop: (item: any) => void,
    showTarget?: boolean,
    targetOffset?: string,
    targetSize?: string
}

const Droppable: FunctionComponent<DroppableProps> = ({accept, canDrop, onDrop, showTarget, targetOffset, targetSize, children}) => {

    const [{isOver, valid}, drop] = useDrop({
        accept, canDrop, 
        drop: onDrop,
        collect: (monitor => ({
            isOver: !!monitor.isOver(), 
            // First check isOver so we aren't unnecessarily calculating canDrop.
            valid: !!monitor.isOver() && !!monitor.canDrop()
        }))
    })
    const classes = useStyles()

    let targetStyle: {left?: string, top?: string, height?: string, width?: string} = {}
    if (targetOffset) {
        targetStyle['left'] = targetOffset
        targetStyle['top'] = targetOffset
    }
    if (targetSize) {
        targetStyle['height'] = targetSize
        targetStyle['width'] = targetSize
    }

    return (
        <div ref={drop} className={classes.root}>
            {isOver && showTarget && valid && <div className={classes.dropTarget} style={targetStyle}/>}
            {children}
        </div>
    )
}

export default Droppable