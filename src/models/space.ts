import { Occupant } from './pieces'

export default interface Space {
    occupant?: Occupant,
    river: boolean,
    treasure: boolean,
    border: boolean,
    unification?: boolean
}