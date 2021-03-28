import React from 'react'
import { BLACK, BLUE, Color, GREEN, RED } from '../../static/colors'

const MonumentImg = ({colors}: {colors: [Color, Color]}) => {

    switch (`${colors[0]}${colors[1]}`) {
        case `${BLUE}${GREEN}`:
            return (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="97.5" height="97.5" rx="15" x="1.25" y="1.25" fill="#a5d6a7" stroke="#37474f" strokeWidth="2.5"/>
                <rect width="47.5" height="47.5" rx="10" x="26.25" y="26.25" fill="#1e88e5" stroke="#37474f" strokeWidth="2.5"/>
                <circle cx="42.5" cy="52.5" r="10" fill="#90caf9"/>
                <circle cx="57.5" cy="62.5" r="5" fill="#90caf9"/>
                <circle cx="57.5" cy="37.5" r="7.5" fill="#90caf9"/>
                <rect x="8.125" y="36.875" width="10" height="55" rx="5" fill="#4caf50"/>
                <rect x="8.125" y="8.125" width="55" height="10" rx="5" fill="#4caf50"/>
                <rect x="81.875" y="8.125" width="10" height="55" rx="5" fill="#4caf50"/>
                <rect x="36.875" y="81.875" width="55" height="10" rx="5" fill="#4caf50"/>
            </svg>)
        case `${BLUE}${RED}`:
            return (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="97.5" height="97.5" rx="15" x="1.25" y="1.25" fill="#ef9a9a" stroke="#37474f" strokeWidth="2.5"/>
                <rect width="47.5" height="47.5" rx="10" x="26.25" y="26.25" fill="#1e88e5" stroke="#37474f" strokeWidth="2.5"/>
                <circle cx="42.5" cy="52.5" r="10" fill="#90caf9"/>
                <circle cx="57.5" cy="62.5" r="5" fill="#90caf9"/>
                <circle cx="57.5" cy="37.5" r="7.5" fill="#90caf9"/>
                <path d="M 26 26 l -11 -21 l -10 10" fill="#f44336"/>
                <path d="M 74 26 l 11 -21 l 10 10" fill="#f44336"/>
                <path d="M 26 74 l -11 21 l -10 -10" fill="#f44336"/>
                <path d="M 74 74 l 11 21 l 10 -10" fill="#f44336"/>
            </svg>)
        case `${BLUE}${BLACK}`:
            return (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="97.5" height="97.5" rx="15" x="1.25" y="1.25" fill="#9e9e9e" stroke="#37474f" strokeWidth="2.5"/>
                <rect width="47.5" height="47.5" rx="10" x="26.25" y="26.25" fill="#1e88e5" stroke="#37474f" strokeWidth="2.5"/>
                <circle cx="42.5" cy="52.5" r="10" fill="#90caf9"/>
                <circle cx="57.5" cy="62.5" r="5" fill="#90caf9"/>
                <circle cx="57.5" cy="37.5" r="7.5" fill="#90caf9"/>
                <rect x="10" y="10" width="15" height="15" rx="2" fill="#424242"/>
                <rect x="75" y="10" width="15" height="15" rx="2" fill="#424242"/>
                <rect x="10" y="75" width="15" height="15" rx="2" fill="#424242"/>
                <rect x="75" y="75" width="15" height="15" rx="2" fill="#424242"/>
            </svg>)
        case `${GREEN}${RED}`: 
            return (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="97.5" height="97.5" rx="15" x="1.25" y="1.25" fill="#ef9a9a" stroke="#37474f" strokeWidth="2.5"/>
                <rect width="47.5" height="47.5" rx="10" x="26.25" y="26.25" fill="#a5d6a7" stroke="#37474f" strokeWidth="2.5"/>
                <rect x="31.25" y="35" width="7.5" height="30" rx="3.75" fill="#4caf50"/>
                <rect x="41.25" y="30" width="7.5" height="40" rx="3.75" fill="#4caf50"/>
                <rect x="51.25" y="35" width="7.5" height="30" rx="3.75" fill="#4caf50"/>
                <rect x="61.25" y="30" width="7.5" height="40" rx="3.75" fill="#4caf50"/>
                <path d="M 26 26 l -11 -21 l -10 10" fill="#f44336"/>
                <path d="M 74 26 l 11 -21 l 10 10" fill="#f44336"/>
                <path d="M 26 74 l -11 21 l -10 -10" fill="#f44336"/>
                <path d="M 74 74 l 11 21 l 10 -10" fill="#f44336"/>
            </svg>)
        case `${GREEN}${BLACK}`:
            return (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="97.5" height="97.5" rx="15" x="1.25" y="1.25" fill="#9e9e9e" stroke="#37474f" strokeWidth="2.5"/>
                <rect width="47.5" height="47.5" rx="10" x="26.25" y="26.25" fill="#a5d6a7" stroke="#37474f" strokeWidth="2.5"/>
                <rect x="31.25" y="35" width="7.5" height="30" rx="3.75" fill="#4caf50"/>
                <rect x="41.25" y="30" width="7.5" height="40" rx="3.75" fill="#4caf50"/>
                <rect x="51.25" y="35" width="7.5" height="30" rx="3.75" fill="#4caf50"/>
                <rect x="61.25" y="30" width="7.5" height="40" rx="3.75" fill="#4caf50"/>
                <rect x="10" y="10" width="15" height="15" rx="2" fill="#424242"/>
                <rect x="75" y="10" width="15" height="15" rx="2" fill="#424242"/>
                <rect x="10" y="75" width="15" height="15" rx="2" fill="#424242"/>
                <rect x="75" y="75" width="15" height="15" rx="2" fill="#424242"/>
            </svg>)
        case `${RED}${BLACK}`: 
            return (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="97.5" height="97.5" rx="15" x="1.25" y="1.25" fill="#9e9e9e" stroke="#37474f" strokeWidth="2.5"/>
                <rect width="47.5" height="47.5" rx="10" x="26.25" y="26.25" fill="#ef9a9a" stroke="#37474f" strokeWidth="2.5"/>
                <rect x="10" y="10" width="15" height="15" rx="2" fill="#424242"/>
                <rect x="75" y="10" width="15" height="15" rx="2" fill="#424242"/>
                <rect x="10" y="75" width="15" height="15" rx="2" fill="#424242"/>
                <rect x="75" y="75" width="15" height="15" rx="2" fill="#424242"/>
                <path d="M 49.5 49.5 l -11 -21 l -10 10" fill="#f44336"/>
                <path d="M 50.5 49.5 l 11 -21 l 10 10" fill="#f44336"/>
                <path d="M 49.5 50.5 l -11 21 l -10 -10" fill="#f44336"/>
                <path d="M 50.5 50.5 l 11 21 l 10 -10" fill="#f44336"/>
            </svg>)
        default:
            return null
    }       
}

export default MonumentImg
