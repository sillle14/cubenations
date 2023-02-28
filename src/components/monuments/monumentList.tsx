import { makeStyles } from '@mui/styles'
import React, { FunctionComponent, useContext } from 'react'

import { sizingTheme } from '../../static/display'
import { Monument } from '../../models/pieces'
import MonumentComp from './monument'
import Draggable from '../dnd/draggable'
import DraggableContext from '../dnd/draggableContext'

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
    shadow: {
        height: '100%',
        width: '100%',
        borderRadius: `calc(0.4 * ${theme.tileSize})`,
        boxShadow: '2px 2px 5px #616161'
    },
}))

type MonumentListProps = {
    monuments: Array<Monument>
}
const MonumentListComp: FunctionComponent<MonumentListProps> = ({monuments}) => {

    const classes = useStyles()

    const {canDragMonument} = useContext(DraggableContext)

    const monumentComps = monuments.map((m, i) => 
        m.position ? null : (
            <div className={classes.monumentContainer} key={i}><div className={classes.shadow}>
                <Draggable item={{...m, monumentIndex: i}} draggable={canDragMonument(m.colors)}>
                    <MonumentComp colors={m.colors} noShadow/>
                </Draggable>
            </div></div>
        )
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

export default MonumentListComp