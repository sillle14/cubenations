import { ReactNode } from 'react';
import { useDrop } from 'react-dnd'
import styled, { CSSObject } from '@emotion/styled';
import { sizingTheme } from '../../static/display';


const DropDiv = styled.div({
    height: '100%',
    width: '100%',
    position: 'relative'
})

interface DropTargetProps {
    offset?: (theme: sizingTheme) => string,
    size?: (theme: sizingTheme) => string,
}
const DropTarget = styled.div<DropTargetProps>(({offset, size, theme}) => {
    const style: CSSObject = {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.7,
        backgroundColor: 'white',
        borderRadius: `calc(0.15 * ${theme.tileSize})`,
        boxShadow: '2px 2px 5px #616161',
    }
    if (offset) {
        style.left = offset(theme)
        style.top = offset(theme)
    }
    if (size) {
        style.height = size(theme)
        style.width = size(theme)
    }
    return style
})

type DroppableProps = {
    accept: string | Array<string>,
    canDrop: (item: any) => boolean,
    onDrop: (item: any) => void,
    showTarget?: boolean,
    targetOffset?: (theme: sizingTheme) => string,
    targetSize?: (theme: sizingTheme) => string,
    children?: ReactNode
}

const Droppable = ({accept, canDrop, onDrop, showTarget, targetOffset, targetSize, children} : DroppableProps) => {

    const [{isOver, valid}, drop] = useDrop({
        accept, canDrop, 
        drop: onDrop,
        collect: (monitor => ({
            isOver: !!monitor.isOver(), 
            // First check isOver so we aren't unnecessarily calculating canDrop.
            valid: !!monitor.isOver() && !!monitor.canDrop()
        }))
    })

    return (
        <DropDiv ref={drop}>
            {isOver && showTarget && valid && <DropTarget offset={targetOffset} size={targetSize}/>}
            {children}
        </DropDiv>
    )
}

export default Droppable