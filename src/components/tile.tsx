import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDrag } from 'react-dnd'

import { BLACK, BLUE, Color, GREEN, RED } from '../static/colors'

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%'
    },
    [RED]: {
        background: 'red',
    },
    [BLUE]: {
        background: 'blue',
    },
    [GREEN]: {
        background: 'green',
    },
    [BLACK]: {
        background: 'black',
    }
})

const TileComp = ({color}: {color: Color}) => {

    let classes = useStyles()

    return (
        <div className={`${classes.root} ${classes[color]}`}></div>
    )
}

export default TileComp

export const DraggableTile = ({color, id}: {color: Color, id: number}) => {

    let classes = useStyles()
    const [, drag] = useDrag({
        item: { type: 'tile', id: id },
      })
    

    return (
        <div ref={drag} className={`${classes.root} ${classes[color]}`}></div>
    )
}