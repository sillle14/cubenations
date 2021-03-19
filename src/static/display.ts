import { TREASURE } from "../models/pieces"
import { BLACK, BLUE, GREEN, RED } from "./colors"
import red from '../assets/tiles/red.svg'
import blue from '../assets/tiles/blue.svg'
import black from '../assets/tiles/black.svg'
import green from '../assets/tiles/green.svg'

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

export const tiles = {
    [RED]: red,
    [BLUE]: blue,
    [GREEN]: green,
    [BLACK]: black,
}