import { ReactNode } from 'react';
import { useDrag } from 'react-dnd'
import styled from '@emotion/styled';

import { Dragged } from '../../models/pieces'

const DraggableDiv = styled.div<{draggable: boolean, dragging: boolean}>(({draggable, dragging}) => ({ 
    height: '100%',
    width: '100%',
    position: 'relative',
    zIndex: 0, // This ensures that only the div is dragged, and not the background.
    '& *': { cursor: draggable ? 'grab' : 'default' },
    '& svg' : { opacity: dragging ? 0.4 : 1 }
}))

type DraggableProps = {
    item: Dragged,
    draggable: boolean,
    children: ReactNode
}

const Draggable= ({item, draggable, children}: DraggableProps) => {

    const [{isDragging}, drag] = useDrag({
        type: item.type,
        item: item,
        canDrag: draggable,
        collect: (monitor) => ({isDragging: !!monitor.isDragging()})
    })

    return (
        <DraggableDiv draggable={draggable} dragging={isDragging} ref={drag}>{children}</DraggableDiv>
    )
}

export default Draggable