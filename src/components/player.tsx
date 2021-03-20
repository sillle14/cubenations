import { makeStyles } from '@material-ui/styles'
import React, { FunctionComponent, useContext } from 'react'

import { sizingTheme } from '../static/display'
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

const useStyles = makeStyles((theme: sizingTheme) => ({
    root: {
        display: 'flex',
        padding: theme.tilePad,
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
            paddingBottom: `calc(${theme.tilePad} / 2)`,
            marginTop: `calc(-1 * ${theme.tilePad} / 2)`
        },
        '& div': {
            display: 'flex',
        }
    },
    tileContainer: {
        height: theme.tileSize,
        width: theme.tileSize,
        padding: `0 ${theme.tilePad}`,
    },
    shadow: {
        height: '100%',
        width: '100%',
        borderRadius: `calc(0.2 * ${theme.tileSize})`,
        boxShadow: '2px 2px 5px #616161',
    },
    selectable: {
        '& > div': {
            cursor: 'pointer'
        }
    }
}))

type PlayerProps = {
    player: Player,
    placeLeader: any,
    selected: Array<number>,
    toggleSelectTile: (handIdx: number) => void
}
const PlayerComp: FunctionComponent<PlayerProps> = ({player, placeLeader, selected, toggleSelectTile}) => {

    const classes = useStyles()

    const {canDragTile, canSelectHand} = useContext(DraggableContext)

    const hand = player.hand.map((t, i) => (
        <div 
            className={`${classes.tileContainer} ${t && canSelectHand(t.color) ? classes.selectable : ''}`}
            key={`hand-${i}`}
            onClick={() => {if (t && canSelectHand(t.color)) toggleSelectTile(i)}}
        >
            <div className={classes.shadow}>
                {t ? <Draggable item={{...t, handIndex: i}} draggable={canDragTile}>
                    <TileComp color={t.color} opacity={selected.includes(i) ? 0.4: undefined} noShadow/>
                </Draggable> : null}
            </div>
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