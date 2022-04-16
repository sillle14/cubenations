import { TREASURE } from "../models/pieces"
import { BLACK, BLUE, GREEN, RED } from "./colors"

export const backgroundColors = {
    [RED]: {
        fill: '#f44336',
    },
    [BLUE]: {
        fill: '#1e88e5',
    },
    [GREEN]: {
        fill: '#4caf50',
    },
    [BLACK]: {
        fill: '#616161',
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

export const pulse = {
    '@keyframes pulse': {
        '0%': {
            transform: 'scale(0.95)'
        },
        '50%': {
            transform: 'scale(1.1)'
        },
        '100%': {
            transform: 'scale(0.95)'
        }
    }
}

export type sizingTheme = {
    tileSize: string,
    tilePad: string,
    border: string
}
