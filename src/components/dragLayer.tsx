import React, { FunctionComponent } from 'react'
import { useDragLayer } from 'react-dnd'
import { makeStyles } from '@material-ui/styles'
import tile from '../assets/tiles/red.svg'

const useStyles = makeStyles({
    root: {
        position: 'relative',
        pointerEvents: 'none',
        zIndex: 2,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
    }
})

const DragLayer: FunctionComponent = ({children}) => {

    const classes = useStyles()

    const props = useDragLayer(monitor => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    }))

    const {x, y} = props.currentOffset || {x: 0, y: 0}
    const width = 50 // TODO: From themes
    const height = 50 // ??
    // TODO: Source from item
    // TODO: zindex?sdf
    // Note: Hide if x is empty and y is empty, otherwise those sometimes clear before isDragging
    // TODO: Animate it back home?
    return (<div className={classes.root}>
        {/* {x !== 0 ? <img src={tile} style={{transform: `translate(${x}px, ${y}px)`, width, height, position: "absolute", zIndex: 1}}/> : null} */}
        {children}
    </div>)
}
export default DragLayer