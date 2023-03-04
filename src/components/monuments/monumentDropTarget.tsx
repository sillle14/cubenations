import { FunctionComponent } from 'react';
import styled from '@emotion/styled';

import { Coord } from '../../models/board'
import Droppable from '../dnd/droppable'
import { MONUMENT, DraggedMonument } from '../../models/pieces'

const MDTDiv = styled.div<{position: Coord}>(({position, theme}) => ({
    position: 'absolute',
    height: `calc(${theme.tileSize} + ${theme.border})`,
    width: `calc(${theme.tileSize} + ${theme.border})`,
    top: `calc((${theme.tileSize} + 2 * ${theme.tilePad} + ${theme.border}) * ${position.y + 0.5} + ${theme.border} * 0.5 + ${theme.tilePad})`,
    left: `calc((${theme.tileSize} + 2 * ${theme.tilePad} + ${theme.border}) * ${position.x + 0.5} + ${theme.border} * 0.5 + ${theme.tilePad})`
}))

interface MDTProps {
    position: Coord,
    placeMonument: (position: Coord, idx: number) => void
}
const MonumentDropTarget: FunctionComponent<MDTProps> = ({position, placeMonument}) => 
    <MDTDiv position={position}>
        <Droppable 
            accept={MONUMENT} 
            canDrop={() => true} 
            onDrop={(item: DraggedMonument) => {placeMonument(position, item.monumentIndex)}}
            showTarget
            targetOffset={(theme) => `calc(${theme.tileSize} / -2 - ${theme.tilePad})`}
            targetSize={(theme) => `calc((${theme.tileSize} + ${theme.tilePad}) * 2 + ${theme.border})`}
        />
    </MDTDiv>

export default MonumentDropTarget