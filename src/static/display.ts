import { keyframes } from '@emotion/react';

import { TREASURE } from "../models/pieces"
import { BLACK, BLUE, GREEN, RED } from "./colors"

// TODO: Likely want to refactor this after emotion change
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
    [RED]:  '#f44336',
    [BLUE]: '#1e88e5',
    [GREEN]: '#4caf50',
    [BLACK]: '#424242',
    [TREASURE]: '#ffee58'
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

// TODO: Replace old pulse
export const newpulse = keyframes({
    '0%': {
        transform: 'scale(0.95)'
    },
    '50%': {
        transform: 'scale(1.1)'
    },
    '100%': {
        transform: 'scale(0.95)'
    }
})

// TODO: Can like move this to the one place after refactor
export type sizingTheme = {
    tileSize: string,
    tilePad: string,
    border: string
}
