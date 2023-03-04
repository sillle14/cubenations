import { useContext } from 'react';
import { PlayerID } from 'boardgame.io'
import styled from '@emotion/styled';

import { Color } from '../../static/colors'
import { LEADER } from '../../models/pieces'
import { Coord } from '../../models/board'
import LeaderImg from './leaderImage'
import Draggable from '../dnd/draggable'
import DraggableContext from '../dnd/draggableContext'
import { colors, newpulse } from '../../static/display'

const LeaderDiv = styled.div<{inConflict: boolean}>(({inConflict}) => ({
    animation: inConflict ? `${newpulse} 2s infinite` : ''
}))

const LeaderImgShadow = styled(LeaderImg)({
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    display: 'block',
    filter: 'drop-shadow(2px 2px 3px black)',
    fill: 'transparent',
    stroke: 'transparent',
    opacity: 0.6
})

const StyledLeaderImage = styled(LeaderImg)<{color: Color}>(({color}) => ({
    height: '100%',
    width: '100%',
    display: 'block',
    fill: colors[color]
}))

interface LeaderCompProps {
    color: Color,
    playerID: PlayerID, 
    location: Coord | null,
    inConflict?: boolean
}
const LeaderComp = ({color, playerID, location, inConflict}: LeaderCompProps) => {

    const {canDragLeader} = useContext(DraggableContext)

    return (
        <LeaderDiv inConflict={!!inConflict} style={{position: 'relative'}}>
            {/* Use a second leader img for the shadow so the shadow doesn't mess with the drag. */}
            <LeaderImgShadow playerID={playerID}/>
            <Draggable 
                item={{type: LEADER, color: color, playerID: playerID, source: location}}
                draggable={canDragLeader(playerID)}
            >
                <StyledLeaderImage color={color} playerID={playerID}/>
            </Draggable>
        </LeaderDiv>
    )
}

export default LeaderComp