import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        background: 'grey'
    },
    cross: {
        height: '100%',
        width: '100%',
        background: 'black',
        clipPath: 'polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)'
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
