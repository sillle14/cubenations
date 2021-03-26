import React, { useContext } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'

import { sizingTheme } from '../../static/display'
import { Coord } from '../../models/board'
import Draggable from '../dnd/draggable'
import { TREASURE } from '../../models/pieces'
import DraggableContext from '../dnd/draggableContext'
import treasure from '../../assets/tiles/treasure.svg'

const useStyles = makeStyles((theme: sizingTheme) => ({
    root: {
        height: `calc(${theme.tileSize} / 2)`,
        width: `calc(${theme.tileSize} / 2)`,
        position: 'absolute',
        borderRadius: `calc(0.1 * ${theme.tileSize})`,
        boxShadow: '2px 2px 5px #616161'
    },
    color: {
        background: 'tan',
        border: `${theme.border} solid black`,
        height: '100%',
        width: '100%'
    }
}))

const TreasureComp = ({location}: {location: Coord}) => {

    let classes = useStyles()
    const theme: sizingTheme = useTheme()

    const {canDragTreasure} = useContext(DraggableContext)

    const top = `calc((${theme.tileSize} + 2 * ${theme.tilePad}) * ${location.y + 0.5} + ${theme.border} * ${location.y + 1} - ${theme.tileSize} / 4)`
    const left = `calc((${theme.tileSize} + 2 * ${theme.tilePad}) * ${location.x + 0.5} + ${theme.border} * ${location.x + 1} - ${theme.tileSize} / 4)`

    return (
        <div className={classes.root} style={{top, left}}>
            {/* Note that the draggable is within the absolutely positioned object. */}
            <Draggable item={{type: TREASURE, source: location}} draggable={canDragTreasure(location)}>
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <rect width="90" height="90" rx="15" x="5" y="5" fill="url('#treasure')" stroke="#37474f" stroke-width="10"/>
                    <defs>
                        <radialGradient id="treasure" cx="70%" cy="35%" r="100%">
                        <stop offset="0%" stop-color="#ffee58"/>
                        <stop offset="120%" stop-color="#ff6f00"/>
                        </radialGradient>
                    </defs>
                </svg>
            </Draggable>
        </div>
    )
}

export default TreasureComp
