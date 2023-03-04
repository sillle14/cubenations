import { FunctionComponent } from 'react';
import styled from '@emotion/styled';

import { Color } from '../../static/colors'
import { CATASTROPHE } from '../../models/pieces'
import TileImg from './tileImage'

const TileDiv = styled.div<{shadow: boolean}>(({shadow, theme}) => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: `calc(0.2 * ${theme.tileSize})`,
    boxShadow: shadow ? '2px 2px 5px #616161' : 'unset'
}))

type TileProps = {
    color: Color | typeof CATASTROPHE,
    opacity?: number,
    noShadow?: boolean
}
const TileComp: FunctionComponent<TileProps> = ({color, opacity, noShadow}) => 
    <TileDiv shadow={!noShadow}>
        <TileImg color={color} opacity={opacity}/>
    </TileDiv>

export default TileComp
