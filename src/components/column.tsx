import { FunctionComponent } from 'react';
import styled from '@emotion/styled';

type ColumnProps = {
    fixed: boolean, // If true, align children to flex start with a fixed margin
    width?: number   // Set width of the column (in tile size units)
}

const ColumnDiv = styled.div<ColumnProps>(({theme, width, fixed}) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: fixed ? 'flex-start' : 'space-around',
    '& > div': {
        borderRadius: '10px',
        border: '5px solid #f5f5f5',
        boxShadow: '3px 3px 5px black',
        background: '#b0bec5',
        marginTop: fixed ? `calc(${theme.tileSize} * 1.5)` : '0',
        width: width ? `calc(${theme.tileSize} * ${width})` : 'auto'
    }
}))
const Column: FunctionComponent<ColumnProps> = ({fixed, width, children}) => {
    return (
        <ColumnDiv fixed={fixed} width={width}>
            {children}
        </ColumnDiv>
    )
}

export default Column