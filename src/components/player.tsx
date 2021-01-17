import { makeStyles } from '@material-ui/styles'
import React from 'react'

import Player from '../models/player'
import { TILE_SIZE } from '../static/display'
import OccupantComp from './occupant'
import { DraggableTile } from './tile'

const useStyles = makeStyles({
    root: {
        background: 'tan',
        display: 'flex',
        padding: '10px',
        width: 'max-content'
    },
    tileContainer: {
        height: TILE_SIZE,
        width: TILE_SIZE,
        padding: '6px',
    }
})

const PlayerComp = ({player}: {player: Player}) => {

    let classes = useStyles()

    const hand = player.hand.map((t, i) => <div className={classes.tileContainer}><DraggableTile id={i} color={t.color}/></div>)

    return (
        <div className={classes.root}>
            {hand}
        </div>
    )
}

export default PlayerComp