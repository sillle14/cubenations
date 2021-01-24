import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDrag } from 'react-dnd'

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%'
    }
})

export const Draggable = ({item, children}: {item: any, children: React.ReactNode}) => {
    const [, drag] = useDrag({
        item: item,
    })
    const classes = useStyles()

    return (
        <div ref={drag} className={classes.root}>{children}</div>
    )
}