import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDrag } from 'react-dnd'

import PlayerContext from './playerContext'

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%'
    }
})

export const Draggable = ({item, children}: {item: any, children: React.ReactNode}) => {

    const {myTurn: myTurn} = useContext(PlayerContext)
    const [, drag] = useDrag({
        item: item,
        canDrag: myTurn
    })
    const classes = useStyles()

    return (
        <div ref={drag} className={classes.root}>{children}</div>
    )
}