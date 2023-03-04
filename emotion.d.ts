import '@emotion/react'
import { sizingTheme } from './src/static/display'

declare module '@emotion/react' {
    export interface Theme extends sizingTheme {}
}