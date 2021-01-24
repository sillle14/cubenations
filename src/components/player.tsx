import { makeStyles } from '@material-ui/styles'
import React from 'react'

import Player from '../models/player'
import CatastropheComp from './catastrophe'
import { TILE_SIZE } from '../static/display'
import OccupantComp from './occupant'
import { Draggable } from './draggable'
import { LEADER, TILE } from '../models/pieces'
import TileComp from './tile'
import { Color } from '../static/colors'
import LeaderComp from './leader'

const useStyles = makeStyles({
    root: {
        background: 'tan',
        display: 'flex',
        padding: '10px',
        width: 'max-content'
    },
    hand: {
        display: 'flex',
        flexWrap: 'wrap',
        width: `calc(${TILE_SIZE} * 4)`
    },
    leaders: {
        display: 'flex',
        flexWrap: 'wrap',
        width: `calc(${TILE_SIZE} * 3)`
    },
    tileContainer: {
        height: TILE_SIZE,
        width: TILE_SIZE,
        padding: '6px',
    }
})

const PlayerComp = ({player}: {player: Player}) => {

    let classes = useStyles()

    const hand = player.hand.map((t, i) => (
        <div className={classes.tileContainer} key={`hand-${i}`}>
            <Draggable item={{type: TILE, position: i, color: t.color}}>
                <TileComp color={t.color}/>
            </Draggable>
        </div>
    ))

    let leaders = []
    for (const color in player.leaders) {
        // If the leader is not mapped to coordinates, it must be in hand.
        if (!player.leaders[color as Color]) {
            leaders.push(
                <div className={classes.tileContainer} key={`leader-${color}`}>
                    <LeaderComp color={color as Color} playerID={player.id}/>
                </div>
            )
        }
    }

    let catastrophes = []
    for (let i = 0; i < player.catastrophes; i++) {
        catastrophes.push(
            <div className={classes.tileContainer} key={i}>
                    <CatastropheComp/>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <div>
                <span>Hand:</span>
                <div className={classes.hand}>
                    {hand}
                </div>
            </div>
            <div>
                <span>Leaders:</span>
                <div className={classes.leaders}>
                    {leaders}
                </div>
            </div>
            <div>
                <span>Catastrophes:</span>
                <div className={classes.leaders}>
                    {catastrophes}
                </div>
            </div>
        </div>
    )
}

export default PlayerComp