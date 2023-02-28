import { PlayerID } from 'boardgame.io'

const LeaderImg = ({className, playerID}: {className: string, playerID: PlayerID}) => {

    let svgChild
    switch (playerID) {
        case '0':
            svgChild = <path 
                d="M 11.1603 88 h 77.6795 a 5 5 0 0 0 4.3301 -7.5 l -38.8397 -67.2724 a 5 5 0 0 0 -8.6603 0 l -38.8397 67.2724 a 5 5 0 0 0 4.3301 7.5" 
                stroke="#37474f" 
                strokeWidth="5"
            />
            break
        case '1':
            svgChild = <path 
                d="M 53.5355 8.5355 L 91.4645 46.4645 A 5 5 0 0 1 91.4645 53.5355 L 53.5355 91.4645 A 5 5 0 0 1 46.4645 91.4645 L 8.5355 53.5355 A 5 5 0 0 1 8.5355 46.4645 L 46.4645 8.5355 A 5 5 0 0 1 53.5355 8.5355" 
                stroke="#37474f" 
                strokeWidth="5"
            />
            break
        case '2':
            svgChild = <circle cx="50" cy="50" r="45" stroke="#37474f" strokeWidth="5"/>
            break
        case '3':
            // Generated using https://weareoutman.github.io/rounded-polygon/
            svgChild = <path 
                d="M 47.0611 8.4575 a 5 5 0 0 1 5.8779 0 l 39.4271 28.6455 a 5 5 0 0 1 1.8164 5.5902 l -15.0598 46.3493 a 5 5 0 0 1 -4.7553 3.4549 l -48.7346 0 a 5 5 0 0 1 -4.7553 -3.4549 l -15.0598 -46.3493 a 5 5 0 0 1 1.8163 -5.5902 z"
                stroke="#37474f" 
                strokeWidth="5" 
            />
            break
        default:
            break
    }       

    return (
        <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" height="100%">
            {svgChild}
        </svg>
    )
}

export default LeaderImg
