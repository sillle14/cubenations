import React from 'react'
import { Leader, LEADER, Occupant, Tile, TILE } from '../models/pieces'
import LeaderComp from './leader'
import TileComp from './tile'

const OccupantComp = ({occupant}: {occupant?: Occupant}) => {

    if (!occupant) {
        return null
    }

    switch (occupant.type) {
        case TILE:
            return <TileComp {...occupant as Tile}/>
        case LEADER:
            return <LeaderComp {...occupant as Leader}/>
        default:
            console.log('ahhh')
            return null
    }
}

export default OccupantComp