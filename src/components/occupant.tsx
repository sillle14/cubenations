import React from 'react'
import { Coord } from '../models/board'
import { Leader, LEADER, Occupant, Tile, TILE } from '../models/pieces'
import LeaderComp from './leader'
import TileComp from './tile'

const OccupantComp = ({occupant, location}: {occupant?: Occupant, location?: Coord | null}) => {

    if (!occupant) {
        return null
    }

    switch (occupant.type) {
        case TILE:
            return <TileComp {...occupant as Tile}/>
        case LEADER:
            return <LeaderComp {...occupant as Leader} location={location || null}/>
        default:
            console.log('ahhh') // TODO
            return null
    }
}

export default OccupantComp