import { makeStyles } from '@material-ui/styles'
import React, { FunctionComponent, useContext } from 'react'

import { sizingTheme } from '../static/display'
import { Monument } from '../models/pieces'
import MonumentComp from './monument'
import Draggable from './draggable'
import DraggableContext from './draggableContext'

const useStyles = makeStyles((theme: sizingTheme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.tilePad} 0`,
        '& span': {
            width: 'max-content',
            fontSize: 'larger',
            fontWeight: 'bolder',
        }
    },
    monuments: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        justifyContent: 'center',
        width: `calc(${theme.tileSize} * 4 + ${theme.tilePad} * 10 + ${theme.border} * 2)`,
        minHeight: `calc(${theme.tileSize} * 6 + ${theme.tilePad} * 12 + ${theme.border} * 3)`
    },
    monumentContainer: {
        padding: theme.tilePad,
    },
}))

type MonumentProps = {
    monuments: Array<Monument>
}
const MonumentsComp: FunctionComponent<MonumentProps> = ({monuments}) => {

    const classes = useStyles()

    const {canDragMonument} = useContext(DraggableContext)

    const monumentComps = monuments.map((m, i) => 
        m.position ? null : <div className={classes.monumentContainer} key={i}>
            <Draggable item={{...m, monumentIndex: i}} draggable={canDragMonument(m.colors)}><MonumentComp colors={m.colors}/></Draggable>
        </div>
    )

    return (
        <div className={classes.root}>
            <span>Monuments</span>
            <div className={classes.monuments}>
                {monumentComps}
            </div>
        </div>
    )
}

export default MonumentsComp