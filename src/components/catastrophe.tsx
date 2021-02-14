import React from 'react'
import { makeStyles } from '@material-ui/styles'

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
