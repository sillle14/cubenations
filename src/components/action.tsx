import { makeStyles } from '@material-ui/styles'
import React, { FunctionComponent } from 'react'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column'
    }
})

type ActionProps = {
    message: string,
    onConfirm: () => void,
    onCancel: () => void
}
const Action: FunctionComponent<ActionProps> = ({message, onConfirm, onCancel}) => {

    const classes = useStyles()

    return <div className={classes.root}>
        <span>{message}</span>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
    </div>
}

export default Action