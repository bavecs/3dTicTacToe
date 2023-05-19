import { Players } from "@/interfaces/Player.interface"
import { Server, Socket } from "socket.io"

import { Symbol } from "@/interfaces/Symbol.enum"
import { Client, Clients, oppositSymbol, unmatchedPlayer } from "@/lib/roomUtils"





export default function SocketHandler(req: any, res: any) {
    const room_id = req.query.room_id
    let players: Clients = {}
    let clients: {
        [k: string]: Socket
    } = {}
    let unmatched: string | null = null
    let IO = res.socket.server.io || new Server(res.socket.server)

    let currentSymbol: Symbol

    const addClient = (socket: Socket) => {
        console.log("New client connected", socket.id);
        clients[socket.id] = socket;
    };
    const removeClient = (socket: Socket) => {
        delete clients[socket.id]
    };




    IO.on("connection", (socket: Socket) => {

        let id = socket.id

        addClient(socket)

        const playerName = socket.handshake.headers["player-name"] as string;
        const playerSymbol = socket.handshake.headers["player-symbol"] as Symbol;
        joinGame(socket, playerName, playerSymbol)


        const opponent = getOpponent(socket)
        if (opponent) {

            currentSymbol = Symbol.X

            const msg: Players = {
                [players[socket.id].symbol]: {
                    name: players[socket.id].name,
                    symbol: players[socket.id].symbol,
                    socketId: socket.id
                },
                [opponent.symbol]: {
                    name: opponent.name,
                    symbol: opponent.symbol,
                    socketId: opponent.socket.id
                }

            }

            socket.emit("game.begin", msg);
            opponent.socket.emit("game.begin", msg)
        }



        socket.on("disconnect", () => {
            console.log("disconnect: " + socket.id)
            removeClient(socket);
            leaveGame(socket)
            socket.broadcast.emit("clientdisconnect");
            const opponent = getOpponent(socket)
            if (opponent) {
                unmatched = opponent.socket.id
                opponent.socket.emit("opponent.left", opponent.symbol);
            }
        });
    })



    res.socket.server.io = IO
    res.end();


    const joinGame = (socket: Socket, name: string, symbol: Symbol) => {


        let opponentPlayer = unmatchedPlayer(players)

        let newPlayer: Client = {
            opponent: opponentPlayer?.socket.id || null,
            symbol: !opponentPlayer ? symbol : oppositSymbol(opponentPlayer.symbol),
            socket: socket,
            name: name
        }

        if (opponentPlayer) {
            opponentPlayer.opponent = socket.id
            players[opponentPlayer.socket.id] = opponentPlayer
        }


        players = {
            ...players, [socket.id]: newPlayer
        }

        console.log(players)


    }

    const leaveGame = (socket: Socket) => {
        delete players[socket.id]
    }

    function getOpponent(socket: Socket): Client | false {

        const opponent = players[socket.id]?.opponent

        return !!opponent && players[opponent]


    }
}
