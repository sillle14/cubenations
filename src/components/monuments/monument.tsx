import styled, { CSSObject } from '@emotion/styled'

import { Color } from '../../static/colors'
import MonumentImg from './monumentImage'

const MonumentDiv = styled.div<{noShadow?: boolean}>(({noShadow, theme}) => {
    const style: CSSObject = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: `calc((${theme.tileSize} + ${theme.tilePad}) * 2 + ${theme.border})`,
        width: `calc((${theme.tileSize} + ${theme.tilePad}) * 2 + ${theme.border})`,
        borderRadius: `calc(0.4 * ${theme.tileSize})`,
        boxShadow: '2px 2px 5px #616161'
    }
    if (noShadow) { style.boxShadow = 'unset' }
    return style
})

const MonumentComp = ({colors, noShadow}: {colors: [Color, Color], noShadow?: boolean}) => 
    <MonumentDiv noShadow={noShadow}>
        <MonumentImg colors={colors}/>
    </MonumentDiv>

export default MonumentComp