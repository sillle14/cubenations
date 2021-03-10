import { TREASURE } from "../models/pieces"
import { BLACK, BLUE, GREEN, RED } from "./colors"

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
        color: '#fff176'
    }
}

export type sizingTheme = {
    tileSize: string,
    tilePad: string,
    border: string
}


// TODO: Use something like this to make this all dynamic.https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
// Note that using fractional units didn't work that well because of rounding errors.