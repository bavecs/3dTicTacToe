"use client"

import NewPlayerModal from "@/components/NewPlayerModal";
import Playground from "@/components/Playground"
import useLocalStorage from "@/hooks/useLocalStorage";
import Player, { Players } from "@/interfaces/Player.interface";
import { useRouter } from "next/router";
import { Suspense, useEffect, useReducer, useState } from "react";
import { Socket, io } from "socket.io-client";

import { Symbol } from "@/interfaces/Symbol.enum"
import { Board, Cells } from "@/lib/Board.class";
import { oppositSymbol } from "@/lib/roomUtils";
import useToast from "@/hooks/useToast";

interface IPlayerWonMsg {
    winner: {
        indexes: number[],
        symbol: Symbol
    },
    players: Players
}



type Props = {
    params: { id: string }
}

export default function Room({ params }: Props) {
    const router = useRouter();
    const room_id = String(router.query.id);

    const [socket, setSocket] = useState<Socket | null>(null);

    const [players, setPLayers] = useState<Players>({})

    const [localPlayer, setLocalPlayer] = useLocalStorage<Player | null>("player", null)

    const [currentSymbol, setCurrentSymbol] = useState<Symbol>(Symbol.X)

    const [socketInited, setSocketInited] = useState<boolean>(false)

    const [board, setBoard] = useState<Board>(new Board(3))

    const [opponentWinnerIndexes, setOpponentWinnerIndexes] = useState<number[]>([])

    const { ToastContainer, addToast } = useToast()

    const [opponentName, setOpponentName] = useState<string>("")

    const [numberOfNewGames, setNumberOfNewGames] = useState<number>(1)
    const [numberOfTied, setNumberOfTied] = useState<number>(0)

    useEffect(() => {
        if (localPlayer && !socket) {


            if (!socketInited) {
                socketInit(localPlayer)
                setSocketInited(true)
            }

        }

    }, [localPlayer]);


    const handleBoard = (b: Board, winnerIndexes?: number[] | null) => {


        const nextSymbol = oppositSymbol(currentSymbol)
        setBoard(b)
        socket?.emit('game.move', { cells: b.cells, nextSymbol: nextSymbol })

        setCurrentSymbol(nextSymbol)

        if (winnerIndexes) return playerWon(winnerIndexes)
        

        if (b.isFull()) {     
            isDraw()
        }

    }



    const socketInit = (localPlayer: Player) => {

        fetch('/api/room/' + room_id);

        let socket: Socket = io({
            extraHeaders: {
                "player-name": localPlayer.name,
            }
        })

        socket.on('connect', () => {

            setSocket(socket)
            setLocalPlayer({ ...localPlayer, socketId: socket.id })
        });


        socket.on("game.begin", (msg: { players: Players, symbol: Symbol }) => {
            const { players, symbol } = msg
            const opponentName_ = players[oppositSymbol(symbol)]?.name


            if (opponentName_) {
                setOpponentName(opponentName_)
                addToast(<p> <b>{opponentName_}</b> joined the game </p>)
            }

            setPLayers(players)
            setLocalPlayer(players[symbol] || localPlayer)
        })

        socket.on("game.opponentWon", (msg: IPlayerWonMsg) => {
            const { winner, players } = msg
            addToast(<p>{players[winner.symbol]?.name || "Opponent"} won 🙄</p>)

            setPLayers(players)

            someoneWon()
            setOpponentWinnerIndexes(winner.indexes)
        })

        socket.on("game.requestNew", () => {
            clearGame()
            addToast(<p>{opponentName || "Opponent"} started a new game</p>)
        })

        socket.on("game.boardUpdate", (msg: { cells: Cells, currentSymbol: Symbol }) => {

            board.cells = msg.cells
            setBoard(board)
            setCurrentSymbol(msg.currentSymbol)
            if(board.isFull()) {
                console.log("board update is full")
                isDraw()
            }
        });


        socket.on("opponent.left", (msg: { symbol: Symbol }) => {
            addToast(<p>{opponentName || "Opponent"} left the game</p>)

            delete players[msg.symbol]
            setPLayers(players)
        })
    }

    const isDraw = () => {
        addToast(<p>Draw!</p>)
        someoneWon()
    }

    const playerWon = (winnerIndexes: number[]) => {
        if (!localPlayer) return;

        addToast(<p>You won!</p>)

        localPlayer.wins++
        players[localPlayer.symbol] = localPlayer

        setLocalPlayer(localPlayer)
        setPLayers(players)


        const msg: IPlayerWonMsg = {
            winner: {
                indexes: winnerIndexes,
                symbol: localPlayer.symbol
            },
            players: players
        }

        socket?.emit('game.win', msg)
        someoneWon()
    }


    const playerSaveHandler = (p: Player) => {
        setLocalPlayer(p)
        players[p.symbol] = p
        setPLayers(players)
    }

    const newGameHandler = () => {
        socket?.emit("game.new")
        clearGame()
    }

    const clearGame = () => {
        console.log("fire clear")
        setNumberOfNewGames(numberOfNewGames + 1)
        setOpponentWinnerIndexes([])
        board.clear()
        setBoard(board)
    }

    const someoneWon = () => {
        setTimeout(() => {
            clearGame()
        }, 2000)
    }



    if (!localPlayer) return <NewPlayerModal onSave={playerSaveHandler} />

    return <Suspense fallback={<>Loading...</>}>
        <div className="pt-[5rem]">
            <div className="ToastContainer">

                <ToastContainer />

            </div>

            {(!players.x || !players.o) ? <>Waiting for your opponent...</> :

                <Playground
                    room={room_id}
                    players={players}
                    player={localPlayer as Player}
                    current={currentSymbol as Symbol}
                    board={board}
                    setBoard={handleBoard}
                    opponentWinnerIndexes={opponentWinnerIndexes}
                    newGame={newGameHandler}
                    numberOfNewGames={numberOfNewGames}
                    numberOfTied={numberOfTied}
                />

            }


        </div>
    </Suspense>


}