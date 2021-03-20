import { TREASURE } from "../models/pieces"
import { BLACK, BLUE, GREEN, RED } from "./colors"
import red from '../assets/tiles/red.svg'
import blue from '../assets/tiles/blue.svg'
import black from '../assets/tiles/black.svg'
import green from '../assets/tiles/green.svg'

import blueGreen from '../assets/monuments/blueGreen.svg'
import blueRed from '../assets/monuments/blueRed.svg'
import blueBlack from '../assets/monuments/blueBlack.svg'
import greenRed from '../assets/monuments/greenRed.svg'
import greenBlack from '../assets/monuments/greenBlack.svg'
import redBlack from '../assets/monuments/redBlack.svg'

// TODO: Deprecate
export const backgroundColors = {
    [RED]: {
        background: '#f44336',
    },
    [BLUE]: {
        background: '#1e88e5',
    },
    [GREEN]: {
        background: '#4caf50',
    },
    [BLACK]: {
        background: '#424242',
    },
}

export const colors = {
    [RED]: {
        color: '#f44336',
    },
    [BLUE]: {
        color: '#1e88e5',
    },
    [GREEN]: {
        color: '#4caf50',
    },
    [BLACK]: {
        color: '#424242',
    },
    [TREASURE]: {
        color: '#ffee58'
    }
}

export type sizingTheme = {
    tileSize: string,
    tilePad: string,
    border: string
}

export const tiles = {
    [RED]: red,
    [BLUE]: blue,
    [GREEN]: green,
    [BLACK]: black,
}

export const monuments = {
    [`${BLUE}${GREEN}`]: blueGreen,
    [`${BLUE}${RED}`]: blueRed,
    [`${BLUE}${BLACK}`]: blueBlack,
    [`${GREEN}${RED}`]: greenRed,
    [`${GREEN}${BLACK}`]: greenBlack,
    [`${RED}${BLACK}`]: redBlack,
}