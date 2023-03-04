import styled from '@emotion/styled'

const Box = styled.div(props => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${props.theme.tilePad} 0`
}))

export default Box