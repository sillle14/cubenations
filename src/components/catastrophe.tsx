import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { BLACK, BLUE, Color, GREEN, RED } from '../static/colors'

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        background: 'tomato'
    }
})

const CatastropheComp = () => {

    let classes = useStyles()

    return (
        <div className={`${classes.root}`}></div>
    )
}

export default CatastropheComp
