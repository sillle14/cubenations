import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { Tile } from '../models/pieces'
import Player from '../models/player'

import { BLACK, BLUE, Color, GREEN, RED } from '../static/colors'
import OccupantComp from './occupant'

const useStyles = makeStyles({
    root: {
        background: 'tan',
        height: '100px',
        width: '100px'
    }
})

const PlayerComp = ({player}: {player: Player}) => {

    let classes = useStyles()

    const hand = player.hand.map((t) => <OccupantComp occupant={t}/>)

    return (
        <div className={classes.root}>
            {hand}
        </div>
    )
}

export default PlayerComp