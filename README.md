# CubeNations

My implementation of the board game [Tigris & Euphrates](https://boardgamegeek.com/boardgame/42/tigris-euphrates) using [boardgame.io](boardgame.io) and React. You can play Tigris & Euphrates as well as some other games at https://lhog.herokuapp.com/.

## Gameplay

This implementation mostly uses drag and drop. There is no log of moves (in order to obscure points) so playing asynchronously might be somewhat confusing. I haven't implemented any rules help/tooltips, so I'd recommend familiarizing yourself with the rules before playing.

## Development

Run `npm install` to install the necessary packages. Run the server using `npm run server` and the client using `npm start`. This will instantiate two game boards in a single window for easy testing.

## Deployment

Check out [Lewis' House of Games](https://github.com/sillle14/lhog) for a deployment which can host many boardgame.io games.

## Publish

To publish the package to npm, run `npm run publish:npm` to compile files for publication, followed by `npm publish`.