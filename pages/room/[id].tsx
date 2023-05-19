"use client"

import NewPlayerModal from "@/components/NewPlayerModal";
import Playground from "@/components/Playground"
import useLocalStorage from "@/hooks/useLocalStorage";
import Player, { Players } from "@/interfaces/Player.interface";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import { Socket, io } from "socket.io-client";

import { Symbol } from "@/interfaces/Symbol.enum"





type Props = {
    params: { id: string }
}

export default function Room({ params }: Props) {
    const router = useRouter();
    const room_id = String(router.query.id);

    const [socket, setSocket] = useState<Socket | null>(null);

    const [players, setPLayers] = useState<Players>({})

    const [localPlayer, setLocalPlayer] = useLocalStorage<Player | null>("player", null)

    const [currentSymbol, setCurrentSymbol] = useReducer((currentSymbol: Symbol) => {
        return currentSymbol === Symbol.X ? Symbol.O : Symbol.X
    }, Symbol.X)


    useEffect(() => {
        if (localPlayer && !socket) {

            socketInit(localPlayer)

            setPLayers({
                [localPlayer.symbol]: localPlayer
            })

        }



    }, [localPlayer]);


    const socketInit = (localPlayer: Player) => {

        fetch('/api/room/' + room_id);

        let socket: Socket = io({
            extraHeaders: {
                "player-name": localPlayer.name,
                "player-symbol": localPlayer.symbol
            }
        })

        socket.on('connect', () => {

            setSocket(socket)
            setLocalPlayer({ ...localPlayer, socketId: socket.id })
        });


        socket.on("game.begin", (players: Players) => {
            console.log(players)
            setPLayers(players)
        })

        socket.on("opponent.left", (symbol: Symbol) => {
            console.log(symbol)
            delete players[symbol]
            setPLayers(players)
        })
    }

    const playerSaveHandler = (p: Player) => {
        setLocalPlayer(p)
        players[p.symbol] = p
        setPLayers(players)
    }


    return <div>

        {!localPlayer && <NewPlayerModal onSave={playerSaveHandler} />}

        {(room_id && localPlayer) &&
            <Playground
                room={room_id}
                players={players}
                player={localPlayer as Player}
                current={currentSymbol as Symbol}
            />
        }


    </div>



}