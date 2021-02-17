import { makeStyles } from '@material-ui/styles'
import React, { FunctionComponent } from 'react'

import { TILE_SIZE } from '../static/display'
import { Monument } from '../models/pieces'
import MonumentComp from './monument'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: `calc(${TILE_SIZE} * 3)`,
        height: 'max-content'
    },
    tileContainer: {
        height: `calc(${TILE_SIZE} * 2)`,
        width: `calc(${TILE_SIZE} * 2)`,
        padding: '6px',
    },
})

type MonumentProps = {
    monuments: Array<Monument>
}
const MonumentsComp: FunctionComponent<MonumentProps> = ({monuments}) => {

    const classes = useStyles()

    const monumentComps = monuments.map(m => <div className={classes.tileContainer}><MonumentComp colors={m.colors}/></div>)

    return (
        <div>
            <span>Monuments</span>
            <div className={classes.root}>
                {monumentComps}
            </div>
        </div>
    )
}

export default MonumentsComp