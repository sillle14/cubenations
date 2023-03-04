import { useContext } from 'react';
import styled from '@emotion/styled';

import { Coord } from '../../models/board'
import Draggable from '../dnd/draggable'
import { TREASURE } from '../../models/pieces'
import DraggableContext from '../dnd/draggableContext'
import { pulse } from '../../static/display'

const TreasureDiv = styled.div<{location: Coord, emphasis: boolean}>(({location, emphasis, theme}) => ({
    height: `calc(${theme.tileSize} / 2)`,
    width: `calc(${theme.tileSize} / 2)`,
    position: 'absolute' as 'absolute',
    borderRadius: `calc(0.1 * ${theme.tileSize})`,
    boxShadow: '2px 2px 5px #616161',
    top: `calc((${theme.tileSize} + 2 * ${theme.tilePad}) * ${location.y + 0.5} + ${theme.border} * ${location.y + 1} - ${theme.tileSize} / 4)`,
    left: `calc((${theme.tileSize} + 2 * ${theme.tilePad}) * ${location.x + 0.5} + ${theme.border} * ${location.x + 1} - ${theme.tileSize} / 4)`,
    animation: emphasis ? `${pulse} 2s infinite` : ''
}))

const TreasureComp = ({location}: {location: Coord}) => {

    const {canDragTreasure} = useContext(DraggableContext)

    return (
        <TreasureDiv location={location} emphasis={canDragTreasure(location)}>
            {/* Note that the draggable is within the absolutely positioned object. */}
            <Draggable item={{type: TREASURE, source: location}} draggable={canDragTreasure(location)}>
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" height="100%">
                    <rect width="90" height="90" rx="15" x="5" y="5" fill="url('#treasure')" stroke="#37474f" strokeWidth="10"/>
                    <defs>
                        <radialGradient id="treasure" cx="70%" cy="35%" r="100%">
                        <stop offset="0%" stopColor="#ffee58"/>
                        <stop offset="120%" stopColor="#ff6f00"/>
                        </radialGradient>
                    </defs>
                </svg>
            </Draggable>
        </TreasureDiv>
    )
}

export default TreasureComp
