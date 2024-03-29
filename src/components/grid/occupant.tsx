import { Coord } from '../../models/board'
import { CATASTROPHE, Leader, LEADER, MONUMENT, Occupant, Tile, TILE } from '../../models/pieces'
import LeaderComp from './leader'
import TileComp from './tile'

interface OccupantProps {
    occupant?: Occupant,
    location: Coord,
}
const OccupantComp = ({occupant, location}: OccupantProps) => {

    if (!occupant) {
        return null
    }

    switch (occupant.type) {
        case TILE:
            return <TileComp {...occupant as Tile}/>
        case LEADER:
            return <LeaderComp {...occupant as Leader} location={location || null}/>
        case CATASTROPHE:
            return <TileComp color={CATASTROPHE}/>
        case MONUMENT:
            // Monuments are overlaid
            return null
        default:
            console.error('Bad occupant.')
            return null
    }
}

export default OccupantComp