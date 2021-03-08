import { makeStyles } from '@material-ui/styles'
import React, { FunctionComponent } from 'react'

import { TILE_PAD, TILE_SIZE } from '../static/display'
import { PlayerID } from 'boardgame.io'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${TILE_PAD} 0`,
        '& > span': {
            width: 'max-content',
            fontSize: 'larger',
            fontWeight: 'bolder',
        },
    },
    '0': {clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'},
    '1': {clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'},
    '2': {clipPath: 'circle(50% at 50% 50%)'},
    '3': {clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'},
    table: {
        textTransform: 'capitalize',
        '& td:first-child': {
            textAlign: 'right',
            width: '50%',
            fontWeight: 'bolder',
            '& div': {
                height: `calc(${TILE_SIZE} / 2)`,
                width: `calc(${TILE_SIZE} / 2)`,
                background: 'black'
            }
        },
        '& td:last-child': {
            textAlign: 'center',
            width: '50%'
        },
    },
})

type PlayerOrderProps = {
    playerMap: {[id in PlayerID]: string},
    playerOrder: Array<PlayerID>
}
const PlayerOrderComp: FunctionComponent<PlayerOrderProps> = ({playerMap, playerOrder}) => {

    const classes = useStyles()

    const rows = playerOrder.map(id => (
        <tr><td><div className={classes[id as '0' | '1' | '2' | '3']}/></td><td>{playerMap[id]}</td></tr>
    ))

    return (
        <div className={classes.root}>
            <span>Player Order</span>
            <table className={classes.table}><tbody>
                {rows}
            </tbody></table>
        </div>
    )
}

export default PlayerOrderComp