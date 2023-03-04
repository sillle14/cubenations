import { useContext } from 'react';
import styled from '@emotion/styled';

import { CATASTROPHE, Catastrophe, DraggedLeader, LEADER } from '../models/pieces'
import { Color } from '../static/colors'
import { canPlaceLeader } from '../moves/placeLeader'
import Draggable from './dnd/draggable'
import DraggableContext from './dnd/draggableContext'
import Droppable from './dnd/droppable'
import LeaderComp from './grid/leader'
import Player from '../models/player'
import TileComp from './grid/tile'

const PlayerDiv = styled.div(({theme}) => ({
    display: 'flex',
    padding: theme.tilePad,
    justifyContent: 'space-around',
}))

const TileGroup = styled.div(({theme}) => ({
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
}))

const Shadow = styled.div<{selectable?: boolean}>(({theme, selectable}) => ({
    height: '100%',
    width: '100%',
    borderRadius: `calc(0.2 * ${theme.tileSize})`,
    boxShadow: '2px 2px 5px #616161',
    cursor: selectable ? 'pointer' : 'default'
}))

const TileContainer = styled.div(({theme}) => ({
    height: theme.tileSize,
    width: theme.tileSize,
    padding: `0 ${theme.tilePad}`,
}))

type PlayerProps = {
    player: Player,
    placeLeader: any,
    selected: Array<number>,
    toggleSelectTile: (handIdx: number) => void
}
const PlayerComp = ({player, placeLeader, selected, toggleSelectTile}: PlayerProps) => {

    const {canDragTile, canSelectHand} = useContext(DraggableContext)

    const hand = player.hand.map((t, i) => (
        <TileContainer 
            key={`hand-${i}`}
            onClick={() => {if (t && canSelectHand(t.color)) toggleSelectTile(i)}}
        >
            <Shadow selectable={!!t && canSelectHand(t.color)}>
                {t ? <Draggable item={{...t, handIndex: i}} draggable={canDragTile}>
                    <TileComp color={t.color} opacity={selected.includes(i) ? 0.4: undefined} noShadow/>
                </Draggable> : null}
            </Shadow>
        </TileContainer>
    ))

    let leaders = []
    for (const color in player.leaders) {
        // If the leader is mapped to coordinates, it is not in hand, so the container is droppable.
        if (player.leaders[color as Color]) {
            leaders.push(
                <TileContainer key={color}>
                <Droppable
                    accept={LEADER}
                    canDrop={(item: DraggedLeader) => canPlaceLeader(item.source, null)}
                    onDrop={(item: DraggedLeader) => placeLeader(item.color, null)}
                />
                </TileContainer>
            )
        } else {
            leaders.push(
                <TileContainer key={color}>
                    <LeaderComp color={color as Color} playerID={player.id} location={null}/>
                </TileContainer>
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
            <TileContainer key={i}><Shadow>
                <Draggable draggable={canDragTile} item={new Catastrophe()}><TileComp color={CATASTROPHE} noShadow/></Draggable>
            </Shadow></TileContainer>
        )
    }

    return (
        <PlayerDiv>
            <TileGroup>
                <span>Hand</span>
                <div>{hand}</div>
            </TileGroup>
            <TileGroup>
                <span>Leaders</span>
                <div>{leaders}</div>
            </TileGroup>
            <TileGroup>
                <span>Catastrophes</span>
                <div>{catastrophes}</div>
            </TileGroup>
        </PlayerDiv>
    )
}

export default PlayerComp