import { makeStyles } from '@material-ui/styles'
import React, { FunctionComponent } from 'react'

import { TILE_SIZE } from '../static/display'
import { DraggedTile, TILE } from '../models/pieces'
import Droppable from './droppable'

const useStyles = makeStyles({
    root: {
        background: 'tan',
        padding: '10px',
        height: 'max-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px'
    },
    tileContainer: {
        height: TILE_SIZE,
        width: TILE_SIZE,
        padding: '6px'
    },
    allow: {
        background: 'white'
    },
    reject: {
        background: 'lightgrey'
    }
})

export const PeaceComp = () => {

    const classes = useStyles()
    
    return <div className={classes.root}>
            <span>Peace</span>
        </div>
}

type DiscardProps = {
    discard: (handIdx: number) => void,
    allowDiscard: boolean
}
const DiscardComp: FunctionComponent<DiscardProps> = ({discard, allowDiscard}) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <span>Discard Here</span>
            <div className={`${classes.tileContainer} ${allowDiscard ? classes.allow : classes.reject}`}>
                <Droppable 
                    accept={TILE} 
                    canDrop={() => allowDiscard}
                    onDrop={(item: DraggedTile) => {discard(item.handIndex)}}
                />
            </div>
        </div>
    )
}

export default DiscardComp