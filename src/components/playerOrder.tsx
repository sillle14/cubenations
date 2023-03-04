import styled from '@emotion/styled';

import { PlayerID } from 'boardgame.io'
import LeaderImg from './grid/leaderImage'
import Header from './styled/header'
import Box from './styled/box'

const PlayerOrderLeaderImg = styled(LeaderImg)(({theme}) => ({
    height: `calc(${theme.tileSize} / 2)`,
    width: `calc(${theme.tileSize} / 2)`,
    display: 'block',
    fill: '#37474f'
}))

const PlayerOrderTable = styled.table(({
    textTransform: 'capitalize',
    '& td': {
        textAlign: 'center',
        width: '50%',
        fontWeight: 'bold'
    },
    '& td:last-child': {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
}))

const PlayerRow = styled.tr<{current: boolean}>(({current}) => {
    if (!current) { return {} }
    return {
        color: '#f5f5f5',
            '& svg': {
                fill: '#f5f5f5',
                '& path': {
                    stroke: '#f5f5f5'
                }
            }
    }
})

type PlayerOrderProps = {
    playerMap: {[id in PlayerID]: string},
    playerOrder: Array<PlayerID>,
    currentPlayer: PlayerID
}
const PlayerOrderComp = ({playerMap, playerOrder, currentPlayer}: PlayerOrderProps) => {

    const rows = playerOrder.map(id => (
        <PlayerRow key={id} current={currentPlayer === id}>
            <td>{playerMap[id]}</td>
            <td><PlayerOrderLeaderImg playerID={id}/></td>
        </PlayerRow>
    ))

    return (
        <Box>
            <Header>Player Order</Header>
            <PlayerOrderTable><tbody>
                {rows}
            </tbody></PlayerOrderTable>
        </Box>
    )
}

export default PlayerOrderComp