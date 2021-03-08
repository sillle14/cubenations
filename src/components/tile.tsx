import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'

import { Color } from '../static/colors'
import { backgroundColors } from '../static/display'

const useStyles = makeStyles(Object.assign({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}, backgroundColors))

const TileComp: FunctionComponent<{color: Color}> = ({color, children}) => {

    let classes = useStyles()

    return (
        <div className={`${classes.root} ${classes[color]}`}>{children}</div>
    )
}

export default TileComp
