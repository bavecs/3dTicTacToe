import { Socket } from "socket.io"
import { Symbol } from "@/interfaces/Symbol.enum"

export type Client = {
    opponent: string | null,
    symbol: Symbol,
    name: string
    socket: Socket
}

export type Clients = {
    [k: string]: Client
}

//export const playersAreEmpty = (room_data: Room) => !room_data.players?.o && !room_data.players?.x


export const unmatchedPlayer = (clients: Clients) => {
    return Object.values(clients).find(client => !client.opponent) || null
}

export const oppositSymbol = (sym: Symbol) => sym === Symbol.O ? Symbol.X : Symbol.O