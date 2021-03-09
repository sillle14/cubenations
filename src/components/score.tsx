import { makeStyles } from '@material-ui/styles'
import React, { FunctionComponent } from 'react'

import { colors, TILE_PAD } from '../static/display'
import { DraggedTreasure, TREASURE } from '../models/pieces'
import { Color } from '../static/colors'
import Droppable from './droppable'
import { Coord } from '../models/board'

const useStyles = makeStyles(Object.assign({
    root: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        padding: `${TILE_PAD} 0`,
        '& span': {
            width: 'max-content',
            fontSize: 'larger',
            fontWeight: 'bolder',
        }
    },
    table: {
        textTransform: 'capitalize' as 'capitalize',
        '& td:first-child': {
            textAlign: 'right',
            width: '50%',
            fontWeight: 'bolder'
        },
        '& td:last-child': {
            textAlign: 'center',
            width: '50%'
        },
    },
}, colors))

type ScoreProps = {
    score: {[color in Color | typeof TREASURE]: number},
    takeTreasure: (source: Coord) => void,
}
const ScoreComp: FunctionComponent<ScoreProps> = ({score, takeTreasure}) => {

    const classes = useStyles()

    let scoreRows = []
    for (const c in score) {
        const color = c as Color | typeof TREASURE
        scoreRows.push(<tr key={color}>
            <td className={classes[color]}>{color}:</td><td>{score[color as Color | typeof TREASURE]}</td>
        </tr>)
    }

    return (
        <div className={classes.root}>
            <span>Score</span>
            <Droppable 
                accept={TREASURE} 
                canDrop={() => true}
                onDrop={(item: DraggedTreasure) => {takeTreasure(item.source)}}
            >
                <table className={classes.table}><tbody>
                    {scoreRows}
                </tbody></table>
            </Droppable>
        </div>
    )
}

export default ScoreComp