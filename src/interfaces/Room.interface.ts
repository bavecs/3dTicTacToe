import Player from "./Player.interface"

export default interface Room {
    id: string,
    players: {
        o?: Player | 0
        x?: Player | 0
    },
    gameBoard: Array<"x" | "o" | null>,
    nextPlayer?: string,
    created_at: number,
    last_activeDate: number,
    isFull?: boolean,
    playedGames: number
}