import React from 'react'
import { Occupant, Tile, TILE } from '../models/pieces'
import TileComp from './tile'

const OccupantComp = ({occupant}: {occupant?: Occupant}) => {

    if (!occupant) {
        return null
    }

    switch (occupant.type) {
        case TILE:
            return <TileComp {...occupant as Tile}/>
        default:
            console.log('ahhh')
            return null
    }
}

export default OccupantComp