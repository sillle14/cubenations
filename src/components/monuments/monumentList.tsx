import { FunctionComponent, useContext } from 'react';
import styled from '@emotion/styled';

import { Monument } from '../../models/pieces'
import MonumentComp from './monument'
import Draggable from '../dnd/draggable'
import DraggableContext from '../dnd/draggableContext'
import Header from '../styled/header';
import Box from '../styled/box';

const MonumentsDiv = styled.div(({theme}) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    justifyContent: 'center',
    width: `calc(${theme.tileSize} * 4 + ${theme.tilePad} * 10 + ${theme.border} * 2)`,
    minHeight: `calc(${theme.tileSize} * 6 + ${theme.tilePad} * 12 + ${theme.border} * 3)`

}))

const Shadow = styled.div(({theme}) => ({
    height: '100%',
    width: '100%',
    borderRadius: `calc(0.4 * ${theme.tileSize})`,
    boxShadow: '2px 2px 5px #616161'
}))

const Container = styled.div(({theme}) => ({padding: theme.tilePad}))

type MonumentListProps = {
    monuments: Array<Monument>
}
const MonumentListComp: FunctionComponent<MonumentListProps> = ({monuments}) => {

    const {canDragMonument} = useContext(DraggableContext)

    const monumentComps = monuments.map((m, i) => 
        m.position ? null : (
            <Container key={i}><Shadow>
                <Draggable item={{...m, monumentIndex: i}} draggable={canDragMonument(m.colors)}>
                    <MonumentComp colors={m.colors} noShadow/>
                </Draggable>
            </Shadow></Container>
        )
    )

    return (
        <Box>
            <Header>Monuments</Header>
            <MonumentsDiv>{monumentComps}</MonumentsDiv>
        </Box>
    )
}

export default MonumentListComp