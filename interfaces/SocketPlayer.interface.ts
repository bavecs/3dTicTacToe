export interface SocketPlayer {
    name: string,
    symbol: "x" | "o",
    socketId: string
}

export type SocketPlayers = {
    o?: SocketPlayer,
    x?: SocketPlayer
}