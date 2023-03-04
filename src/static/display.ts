import { keyframes } from '@emotion/react';

import { TREASURE } from "../models/pieces"
import { BLACK, BLUE, GREEN, RED } from "./colors"

export const colors = {
    [RED]:  '#f44336',
    [BLUE]: '#1e88e5',
    [GREEN]: '#4caf50',
    [BLACK]: '#424242',
    [TREASURE]: '#ffee58'
}

export const pulse = keyframes({
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

export type sizingTheme = {
    tileSize: string,
    tilePad: string,
    border: string
}
