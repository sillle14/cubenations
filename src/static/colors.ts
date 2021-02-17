export const BLACK = 'black'
export const BLUE = 'blue'
export const GREEN = 'green'
export const RED = 'red'
export const ALL_COLORS: Array<Color> = [BLUE, GREEN, RED, BLACK]

export type Color = typeof RED | typeof BLACK | typeof BLUE | typeof GREEN