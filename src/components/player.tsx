import { makeStyles } from '@material-ui/styles'
import React, { FunctionComponent, useContext } from 'react'

import { TILE_PAD, TILE_SIZE } from '../static/display'
import { Catastrophe, DraggedLeader, LEADER } from '../models/pieces'
import { Color } from '../static/colors'
import { canPlaceLeader } from '../moves/placeLeader'
import CatastropheComp from './catastrophe'
import Draggable from './draggable'
import DraggableContext from './draggableContext'
import Droppable from './droppable'
import LeaderComp from './leader'
import Player from '../models/player'
import TileComp from './tile'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        padding: TILE_PAD,
        justifyContent: 'space-around',
    },
    tileGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& span': {
            width: 'max-content',
            fontSize: 'larger',
            fontWeight: 'bolder',
            paddingBottom: `calc(${TILE_PAD} / 2)`,
            marginTop: `calc(-1 * ${TILE_PAD} / 2)`
        },
        '& div': {
            display: 'flex',
        }
    },
    tileContainer: {
        height: TILE_SIZE,
        width: TILE_SIZE,
        padding: `0 ${TILE_PAD}`,
    },
    selectable: {
        '& > div': {
            cursor: 'pointer'
        }
    },
    selected: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        background: 'white',
        opacity: '0.5'
    }
})

type PlayerProps = {
    player: Player,
    placeLeader: any,
    selected: Array<number>,
    toggleSelectTile: (handIdx: number) => void
}
const PlayerComp: FunctionComponent<PlayerProps> = ({player, placeLeader, selected, toggleSelectTile}) => {

    const classes = useStyles()

    const {canDragTile, canSelectHand} = useContext(DraggableContext)

    // TODO: formattin
    const hand = player.hand.map((t, i) => (
        <div className={`${classes.tileContainer} ${t && canSelectHand(t.color) ? classes.selectable : ''}`} key={`hand-${i}`} onClick={() => {if (t && canSelectHand(t.color)) toggleSelectTile(i)}}>
            {t ? <Draggable item={{...t, handIndex: i}} draggable={canDragTile}>
                <TileComp color={t.color}/>
                {selected.includes(i) ? <div className={classes.selected}></div>: null}
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
    for (const color in player.score) {
        points.push(<div key={color}>{`${color}: ${player.score[color as Color]}`}</div>)
    }

    let catastrophes = []
    for (let i = 0; i < player.catastrophes; i++) {
        catastrophes.push(
            <div className={classes.tileContainer} key={i}>
                <Draggable draggable={canDragTile} item={new Catastrophe()}><CatastropheComp/></Draggable>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <div className={classes.tileGroup}>
                <span>Hand</span>
                <div>
                    {hand}
                </div>
            </div>
            <div className={classes.tileGroup}>
                <span>Leaders</span>
                <div>
                    {leaders}
                </div>
            </div>
            <div className={classes.tileGroup}>
                <span>Catastrophes</span>
                <div>
                    {catastrophes}
                </div>
            </div>
        </div>
    )
}

export default PlayerComp