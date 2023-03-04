import { colors } from '../static/display'
import { DraggedTreasure, TREASURE } from '../models/pieces'
import { Color } from '../static/colors'
import { Coord } from '../models/board'
import Droppable from './dnd/droppable'
import Header from './styled/header';
import Box from './styled/box';
import styled from '@emotion/styled';

const ScoreTable = styled.table(({theme}) => ({
    textTransform: 'capitalize',
    marginLeft: `calc(${theme.tileSize} / 2)`,
    '& td:first-of-type': {
        textAlign: 'right',
        width: '50%',
        fontWeight: 'bolder'
    },
    '& td:last-child': {
        textAlign: 'center',
        width: '50%'
    },
}))

const ColoredTd = styled.td<{ color: Color | typeof TREASURE }>(({color}) => ({
    color: colors[color]
}))

type ScoreProps = {
    score: {[color in Color | typeof TREASURE]: number},
    takeTreasure: (source: Coord) => void,
}
const ScoreComp= ({score, takeTreasure}: ScoreProps) => {

    let scoreRows = []
    for (const c in score) {
        const color = c as Color | typeof TREASURE
        scoreRows.push(<tr key={color}>
            <ColoredTd color={color}>{color}:</ColoredTd><td>{score[color as Color | typeof TREASURE]}</td>
        </tr>)
    }

    return (
        <Box>
            <Header>Score</Header>
            <Droppable 
                accept={TREASURE} 
                canDrop={() => true}
                onDrop={(item: DraggedTreasure) => {takeTreasure(item.source)}}
            >
                <ScoreTable><tbody>
                    {scoreRows}
                </tbody></ScoreTable>
            </Droppable>
        </Box>
    )
}

export default ScoreComp