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
    buttons: Array<{text: string, onClick: () => void}>
}
const Action: FunctionComponent<ActionProps> = ({message, buttons}) => {

    const classes = useStyles()

    return <div className={classes.root}>
        <span>{message}</span>
        {buttons.map(({text, onClick}, i) => <button key={i} onClick={onClick}>{text}</button>)}
    </div>
}

export default Action