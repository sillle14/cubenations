import React from 'react'
import { CATASTROPHE } from '../../models/pieces'
import { BLACK, BLUE, Color, GREEN, RED } from '../../static/colors'

const TileImg = ({color, opacity}: {color: Color | typeof CATASTROPHE, opacity?: number}) => {

    switch (color) {
        case RED:
            return (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{opacity: opacity}}>
                <rect width="95" height="95" rx="15" x="2.5" y="2.5" fill="#ef9a9a" stroke="#37474f" strokeWidth="5"/>
                <path d="M 49 49 l -22 -42 l -20 20" fill="#f44336"/>
                <path d="M 51 49 l 22 -42 l 20 20" fill="#f44336"/>
                <path d="M 49 51 l -22 42 l -20 -20" fill="#f44336"/>
                <path d="M 51 51 l 22 42 l 20 -20" fill="#f44336"/>
            </svg>)
        case BLUE:
            return (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{opacity: opacity}}>
                <rect width="95" height="95" rx="15" x="2.5" y="2.5" fill="#1e88e5" stroke="#37474f" strokeWidth="5"/>
                <circle cx="35" cy="55" r="20" fill="#90caf9"/>
                <circle cx="65" cy="75" r="10" fill="#90caf9"/>
                <circle cx="65" cy="25" r="15" fill="#90caf9"/>
            </svg>)
        case GREEN:
            return (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{opacity: opacity}}>
                <rect width="95" height="95" rx="15" x="2.5" y="2.5" fill="#a5d6a7" stroke="#37474f" strokeWidth="5"/>
                <rect x="12.5" y="20" width="15" height="60" rx="7.5" fill="#4caf50"/>
                <rect x="32.5" y="10" width="15" height="80" rx="7.5" fill="#4caf50"/>
                <rect x="52.5" y="20" width="15" height="60" rx="7.5" fill="#4caf50"/>
                <rect x="72.5" y="10" width="15" height="80" rx="7.5" fill="#4caf50"/>
            </svg>)
        case BLACK:
            return (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{opacity: opacity}}>
                <rect width="95" height="95" rx="15" x="2.5" y="2.5" fill="#9e9e9e" stroke="#37474f" strokeWidth="5"/>
                <rect x="10" y="10" width="25" height="25" rx="2" fill="#424242"/>
                <rect x="65" y="10" width="25" height="25" rx="2" fill="#424242"/>
                <rect x="10" y="65" width="25" height="25" rx="2" fill="#424242"/>
                <rect x="65" y="65" width="25" height="25" rx="2" fill="#424242"/>
                <rect x="37.5" y="37.5" width="25" height="25" rx="2" fill="#424242"/>
            </svg>)
        case CATASTROPHE:
            return (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{opacity: opacity}}>
                <rect width="95" height="95" rx="15" x="2.5" y="2.5" fill="#d7ccc8" stroke="#37474f" strokeWidth="5"/>
                <rect x="15" y="60" width="60" height="15" rx="7.5" transform="rotate(10, 50, 50)" fill="#4caf50"/>
                <rect x="35" y="0" width="20" height="40" rx="2" fill="#424242" transform="rotate(50, 50, 50)"/>
                <circle cx="65" cy="70" r="20" fill="#1e88e5"/>
                <path d="M 60 70 l -30 -60 l -19 19" fill="#f44336"/>
            </svg>)
        default:
            return null
    }       
}

export default TileImg
