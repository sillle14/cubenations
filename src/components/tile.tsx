import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'

import { BLACK, BLUE, Color, GREEN, RED } from '../static/colors'

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    [RED]: {
        background: 'red',
    },
    [BLUE]: {
        background: 'blue',
    },
    [GREEN]: {
        background: 'green',
    },
    [BLACK]: {
        background: 'black',
    }
})

const TileComp: FunctionComponent<{color: Color}> = ({color, children}) => {

    let classes = useStyles()

    return (
        <div className={`${classes.root} ${classes[color]}`}>{children}</div>
    )
}

export default TileComp
