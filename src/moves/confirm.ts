import { Move } from 'boardgame.io'

import CNState from '../models/state'


export const confirm: Move<CNState> = ({events}) => {
    events.endStage!()
}