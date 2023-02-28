import { makeStyles } from '@mui/styles'
import { FunctionComponent } from 'react';

import { sizingTheme } from '../static/display'
import { PlayerID } from 'boardgame.io'
import LeaderImg from './grid/leaderImage'

const useStyles = makeStyles((theme: sizingTheme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.tilePad} 0`,
        '& > span': {
            width: 'max-content',
            fontSize: 'larger',
            fontWeight: 'bolder',
        },
    },
    leader: {
        height: `calc(${theme.tileSize} / 2)`,
        width: `calc(${theme.tileSize} / 2)`,
        display: 'block',
        fill: '#37474f'
    },
    table: {
        textTransform: 'capitalize',
        '& td:first-child': {
            textAlign: 'center',
            width: '50%',
            fontWeight: 'bold'
        },
        '& td:last-child': {
            width: '100%',
            fontWeight: 'bolder',
            display: 'flex',
            justifyContent: 'center'
        },
    },
    current: {
        color: '#f5f5f5',
        '& svg': {
            fill: '#f5f5f5',
            '& path': {
                stroke: '#f5f5f5'
            }
        }
    }
}))

type PlayerOrderProps = {
    playerMap: {[id in PlayerID]: string},
    playerOrder: Array<PlayerID>,
    currentPlayer: PlayerID
}
const PlayerOrderComp: FunctionComponent<PlayerOrderProps> = ({playerMap, playerOrder, currentPlayer}) => {

    const classes = useStyles()

    const rows = playerOrder.map(id => (
        <tr key={id} className={currentPlayer === id ? classes.current : ''}>
            <td>{playerMap[id]}</td>
            <td><LeaderImg playerID={id} className={classes.leader}/></td>
        </tr>
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