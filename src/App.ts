import { Client } from 'boardgame.io/react';
import { CubeNations } from './Game';
import { CubeNationsTable } from './components/board'


const CubeNationsClient = Client({ game: CubeNations, board: CubeNationsTable });

export default CubeNationsClient
