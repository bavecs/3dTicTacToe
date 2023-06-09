import { Symbol } from "@/interfaces/Symbol.enum"


export default interface Player {
    name: string,
    symbol: Symbol,
    socketId: string,
    wins: number
}

export type Players = {
    o?: Player,
    x?: Player
}

