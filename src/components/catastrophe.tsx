import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        background: '#263238'
    },
    cross: {
        height: '100%',
        width: '100%',
        background: '#f44336',
        clipPath: 'polygon(50% 30%, 35% 55%, 25% 15%, 10% 50%, 20% 80%, 50% 90%, 80% 80%, 90% 50%, 75% 15%, 65% 55%)'
    }
})

const CatastropheComp = () => {

    let classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.cross}/>
        </div>
    )
}

export default CatastropheComp
