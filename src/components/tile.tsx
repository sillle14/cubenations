import { makeStyles } from '@material-ui/styles'
import React from 'react'

import { Color } from '../static/colors'

const useStyles = makeStyles({
    red: {
        background: 'red',
        height: '100%',
        width: '100%'
    }
})

const TileComp = ({color}: {color: Color}) => {

    let classes = useStyles()

    return (
        <div className={classes.red}></div>
    )
}

export default TileComp