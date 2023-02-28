import React, { FunctionComponent } from 'react'
import { makeStyles } from '@mui/styles'

import { sizingTheme } from '../static/display'

type ColumnProps = {
    fixed: boolean, // If true, align children to flex start with a fixed margin
    width?: number   // Set width of the column (in tile size units)
}

const useStyles = makeStyles((theme: sizingTheme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: (props: ColumnProps) => props.fixed ? 'flex-start' : 'space-around',
        '& > div': {
            borderRadius: '10px',
            border: '5px solid #f5f5f5',
            boxShadow: '3px 3px 5px black',
            background: '#b0bec5',
            marginTop: (props: ColumnProps) => props.fixed ? `calc(${theme.tileSize} * 1.5)` : '0',
            width: (props: ColumnProps) => props.width ? `calc(${theme.tileSize} * ${props.width})` : 'auto'
        }
    }
}))
const Column: FunctionComponent<ColumnProps> = (props) => {

    const classes = useStyles(props)

    return (
        <div className={`${classes.root}`}>
            {props.children}
        </div>
    )
}

export default Column