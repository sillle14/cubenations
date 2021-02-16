import { makeStyles } from '@material-ui/styles'
import React, { FunctionComponent, useContext } from 'react'

import { TILE_SIZE } from '../static/display'
import { DraggedLeader, LEADER } from '../models/pieces'
import { Color } from '../static/colors'
import { canPlaceLeader } from '../moves/placeLeader'
import Action from './action'
import CatastropheComp from './catastrophe'
import Draggable from './draggable'
import DraggableContext from './draggableContext'
import Droppable from './droppable'
import LeaderComp from './leader'
import Player from '../models/player'
import TileComp from './tile'
import { CONFLICT, RESOLVE_CONFLICT } from '../static/stages'

const useStyles = makeStyles({
    root: {
        background: 'tan',
        display: 'flex',
        padding: '10px',
        width: `calc(${TILE_SIZE} * 20)`,
        '> div': {
            margin: '1px'
        },
        justifyContent: 'space-around'
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
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column'
    }
})

type PlayerProps = {
    player: Player,
    placeLeader: any,
    myTurn: boolean,
    sentIdxs: Array<number>,
    clear: () => void,
    commitToConflict: (handIdxs: Array<number>) => void,
    resolveConflict: () => void,
    phase: string,
    pass: () => void
}

const PlayerComp: FunctionComponent<PlayerProps> = ({player, placeLeader, myTurn, sentIdxs, clear, phase, commitToConflict, resolveConflict, pass}) => {

    const classes = useStyles()

    const {canDragHand} = useContext(DraggableContext)

    const hand = player.hand.map((t, i) => (
        <div className={classes.tileContainer} key={`hand-${i}`}>
            {t && !sentIdxs.includes(i) ? <Draggable item={{...t, handIndex: i}} draggable={canDragHand}>
                <TileComp color={t.color}/>
            </Draggable> : null}
        </div>
    ))

    let leaders = []
    for (const color in player.leaders) {
        // If the leader is mapped to coordinates, it is not in hand, so the container is droppable.
        if (player.leaders[color as Color]) {
            leaders.push(
                <div className={classes.tileContainer} key={color}>
                    <Droppable
                    accept={LEADER}
                    canDrop={(item: DraggedLeader) => canPlaceLeader(item.source, null)}
                    onDrop={(item: DraggedLeader) => placeLeader(item.color, null)}
                />
                </div>
            )
        } else {
            leaders.push(
                <div className={classes.tileContainer} key={color}>
                    <LeaderComp color={color as Color} playerID={player.id} location={null}/>
                </div>
            )
        }
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

    let action = null
    switch (phase) {
        case CONFLICT:
            action = <Action
                message="Commit tiles to the conflict."
                buttons={[
                    {text: 'confirm', onClick: () => {commitToConflict(sentIdxs); clear()}},
                    {text: 'cancel', onClick: clear}
                ]}
            />
            break
        case RESOLVE_CONFLICT:
            action = <Action
                message="Resolve conflict"
                buttons={[
                    {text: 'confirm', onClick: () => {resolveConflict()}},
                ]}
            />
            break
        default:
            if (myTurn) {
                action = <Action
                    message={`${player.actions} action${player.actions > 1 ? 's' : ''} left.`}
                    buttons={[
                        {text: 'pass', onClick: () => {pass()}},
                    ]}
                />
            } else {
                action = <Action
                    message="Wait for your turn."
                    buttons={[]}
                />
            }
            // TODO: case for discarding.
            break
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
                Score:
                {points}
            </div>
            {action}
        </div>
    )
}

export default PlayerComp