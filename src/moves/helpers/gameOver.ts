import { Ctx, PlayerID } from 'boardgame.io'
import { TREASURE } from '../../models/pieces'
import CNState from '../../models/state'
import { BLACK, BLUE, Color, GREEN, RED } from '../../static/colors'

/**
 * Helper method to return a sorted array of colors, given a map of each color to score.
 * Sorted from lowest scoring color to highest.
 * 
 * @param colorMap Map of each color to score
 */
function sortColorMap(colorMap: {[color in Color]: number}): Array<Color> {
    return Object.keys(colorMap).sort((a, b) => {
        return colorMap[a as Color] - colorMap[b as Color]
    }) as Array<Color>
}

type Score = [number, number, number, number]
/**
 * Returns 1 if the score beats the given score, -1 if it loses, and 0 in the case of a tie.
 */
function beatScore(score: Score, scoreToBeat: Score): number {
    for (let i = 0; i < score.length; i ++) {
        if (score[i] < scoreToBeat[i]) return -1
        if (score[i] > scoreToBeat[i]) return 1
    }
    return 0
}

export default function calculateWinners(G: CNState, ctx: Ctx): Array<PlayerID> {
    // Get the effective scores of each player, factoring in treasure.
    let effectiveScores: {[pid in PlayerID]: {[color in Color]: number}} = {}
    for (const pid in G.players) {
        // Deep copy so as not to mess with the original points.
        effectiveScores[pid] = {
            [RED]: G.players[pid]!.score.red,
            [BLUE]: G.players[pid]!.score.blue,
            [GREEN]: G.players[pid]!.score.green,
            [BLACK]: G.players[pid]!.score.black,
        }
        // For each treasure, recalculate the score order and add the treasure to the lowest color.
        for (let i = 0; i < G.players[pid!]!.score[TREASURE]; i++) {
            effectiveScores[pid][sortColorMap(effectiveScores[pid])[0]] += 1
        }
    }

    let winnerIDs: Array<PlayerID> = []
    // Scores are sorted from lowest to highest.
    let bestScore: Score = [-1, -1, -1, -1]
    for (const pid in effectiveScores) {
        // Map the color order to the corresponding points.
        const playerScore = sortColorMap(effectiveScores[pid]).map(c => effectiveScores[pid][c]) as Score
        switch (beatScore(playerScore, bestScore)) {
            case 1:
                winnerIDs = [pid]
                bestScore = playerScore
                break
            case -1:
                break
            case 0:
                winnerIDs.push(pid)
                break
        }
    }

    return winnerIDs
}