import Player, { Players } from "@/interfaces/Player.interface"
import { Server, Socket } from "socket.io"

import { Symbol } from "@/interfaces/Symbol.enum"
import { Client, Clients, oppositSymbol, unmatchedPlayer } from "@/lib/roomUtils"
import {Cells} from "@/lib/Board.class"



export default function SocketHandler(req: any, res: any) {
    const room_id = req.query.room_id
    let players: Clients = {}

    let IO = res.socket.server.io || new Server(res.socket.server)

    let currentSymbol: Symbol = Symbol.X


    IO.on("connection", (socket: Socket) => {

        let id = socket.id
        
        const playerName = socket.handshake.headers["player-name"] as string;
        joinGame(socket, playerName, Symbol.X)


        const opponent = getOpponent(socket)
        if (opponent) {
 

            currentSymbol = Symbol.X
            const player = players[id]
            

            const playersClient: Players = {
                [player.symbol]: {
                    name: player.name,
                    symbol: player.symbol,
                    socketId: socket.id,
                    wins: 0
                },
                [opponent.symbol]: {
                    name: opponent.name,
                    symbol: opponent.symbol,
                    socketId: opponent.socket.id,
                    wins: 0
                }

            }

            socket.emit("game.begin", {players: playersClient, symbol: player.symbol});
            opponent.socket.emit("game.begin", {players: playersClient, symbol: opponent.symbol})



        }

        socket.on("game.move", (msg: {cells: Cells, nextSymbol: Symbol}) => {
            currentSymbol = msg.nextSymbol
            socket.broadcast.emit("game.boardUpdate", {cells: msg.cells, currentSymbol: currentSymbol});
        })

        socket.on("game.win", msg => {
            socket.broadcast.emit("game.opponentWon", msg);
        })

        socket.on("game.new", () => {
            socket.broadcast.emit("game.requestNew");
        })


        socket.on("disconnect", () => {
            console.log("disconnect: " + id)
            const disconnectedPlayer = players[id]
            leaveGame(socket)

            socket.broadcast.emit("opponent.left", {msg: disconnectedPlayer.symbol});
            
        });


    })



    res.socket.server.io = IO
    res.end();


    const joinGame = (socket: Socket, name: string, symbol: Symbol) => {



        let opponentPlayer = unmatchedPlayer(players)

        console.log(!opponentPlayer ? symbol : oppositSymbol(opponentPlayer.symbol))

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


        players[socket.id] = newPlayer

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
