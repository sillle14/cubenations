import { makeStyles } from '@material-ui/styles'
import { useDrop } from 'react-dnd'
import React, { useContext } from 'react'

import Player from '../models/player'
import DraggableContext from './draggableContext'
import CatastropheComp from './catastrophe'
import { TILE_SIZE } from '../static/display'
import { Draggable } from './draggable'
import { DraggedLeader, LEADER } from '../models/pieces'
import TileComp from './tile'
import { Color } from '../static/colors'
import LeaderComp from './leader'
import { Move, PlayerID } from 'boardgame.io'
import { canPlaceLeader } from '../moves/placeLeader'

const useStyles = makeStyles({
    root: {
        background: 'tan',
        display: 'flex',
        padding: '10px',
        width: 'max-content',
        '& div': {
            margin: '1px'
        }
    },
    hand: {
        display: 'flex',
        flexWrap: 'wrap',
        width: `calc(${TILE_SIZE} * 4.5)`
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

const LeaderContainer = ({color, playerID, className, home, placeLeader}: {color: Color, playerID: PlayerID, className: string, home: boolean, placeLeader: any}) => {

    const [, drop] = useDrop({
        accept: LEADER,
        canDrop: (item: DraggedLeader) => canPlaceLeader(item.source, null),
        drop: (item: DraggedLeader) => placeLeader(item.color, null)
    })

    if (home) {
        return <div className={className}>
            <LeaderComp color={color} playerID={playerID} location={null}/>
        </div>
    } else {
        return <div className={className} ref={drop}></div>
    }
}

const PlayerComp = ({player, placeLeader, myTurn}: {player: Player, placeLeader: Move, myTurn: boolean}) => {

    const classes = useStyles()

    const {canDragHand} = useContext(DraggableContext)

    const hand = player.hand.map((t, i) => (
        <div className={classes.tileContainer} key={`hand-${i}`}>
            {t ? <Draggable item={{...t, handIndex: i}} draggable={canDragHand}>
                <TileComp color={t.color}/>
            </Draggable> : null}
        </div>
    ))

    let leaders = []
    for (const color in player.leaders) {
        leaders.push(
            <LeaderContainer
                color={color as Color}
                playerID={player.id}
                className={classes.tileContainer}
                home={!player.leaders[color as Color]} // If the leader is not mapped to coordinates, it must be in hand.
                placeLeader={placeLeader}
                key={color}
            />
        )
    }

    let points = []
    for (const color in player.points) {
        points.push(<div key={color}>{`${color}: ${player.points[color as Color]}`}</div>)
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
                <div>{`Actions: ${player.actions}`}</div>
                <div>{myTurn ? 'My Turn': 'Wait'}</div>
            </div>
            <div>
                Score:
                {points}
            </div>
        </div>
    )
}

export default PlayerComp