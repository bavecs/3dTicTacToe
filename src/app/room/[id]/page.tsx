"use client"

import { useEffect, useReducer, useState } from "react"

import useLocalStorage from "tt/hooks/useLocalStorage"
import NewPlayerModal from "tt/components/NewPlayerModal"
import Header from "tt/components/Header"

import Player, { PlayerWSymbol } from "tt/interfaces/Player.interface"

import { onValue, ref } from "@firebase/database"
import db from "tt/firebase/db"


import SymSelector from "tt/components/SymSelector"
import { set } from "firebase/database"
import Game from "tt/components/GameComponent/Game"
import { gameBoardToArray, gameBoardToString } from "tt/lib/gameBoardUtils"
import useFetch from "tt/hooks/useFetch"

import { Room } from "@prisma/client"



type Props = {
    params: { id: string }
}

export type SymbolType = "x" | "o" | null


export default function GameRoom({ params }: Props) {

    const {data, error} = useFetch<Room>('/api/room/' + params.id)

    
    const [room, setRoom] = useState<Room | null>(null)
    const room_ref = ref(db, `rooms/${params.id}`)

    const [player, setPlayer] = useLocalStorage<Player | null>("player", null)
    const [symbol, setSymbol] = useState<SymbolType>(null)

    const [currentSymbol, nextSymbol] = useReducer((current)=> {
        return current === "x" ? "o" : "x"
    }, "x")

/* 
    const playersAreEmpty = (room_data: Room) => !room_data.players?.o && !room_data.players?.x

    const playerInTheRoom = (room_data: Room, player: Player) => 
            Object.values(room_data).find(r => r.id === player.id)
    
    const getUnusedSymbol = () => {
        let sym: SymbolType = null
        if (room && !playersAreEmpty(room)) {
            sym = (room.players.o === 0) ? "o" : "x"
        }
        return sym
    }

    const placePlayerInRoom = (r: Room) => {

        if (playersAreEmpty(r) || !player) {
            return r;
        }

        if (playerInTheRoom(r, player)) {
            return r;
        }


        const symb:SymbolType = (() => {
            let sym: SymbolType = null

            if (r.players.o && r.players.o.id === player.id) {
                sym = "o"
            }
            if (r.players.x && r.players.x.id === player.id) {
                sym = "x"
            }
            return sym
        })()

        setSymbol(symb)

        return r;
    }

    useEffect(() => {
        onValue(room_ref, sp => {
            let room_data = sp.val()

            room_data.gameBoard = gameBoardToArray(room_data.gameBoard)

            room_data = placePlayerInRoom(room_data);


            setRoom(room_data)


        })

    }, [])

    useEffect(() => {
        const currentRoom = room

        const eff = () => {
            console.log(currentRoom)
            if((symbol) && currentRoom) {
                currentRoom.players[symbol] = 0
                setRoom(null)
                set(room_ref, {...currentRoom, gameBoard: gameBoardToString(currentRoom.gameBoard)})

            }
        }
        if (currentRoom && symbol) {
            window.addEventListener("beforeunload", eff);
        }

      }, [room]);

    useEffect(() => {
        if (!!room) {
            const currentRoom = placePlayerInRoom(room);

            currentRoom.isFull = !!(currentRoom.players.o && currentRoom.players.x)


            setRoom(currentRoom)
            set(room_ref, {...currentRoom, gameBoard: gameBoardToString(currentRoom.gameBoard)})

        }
    }, [room])




    if (typeof room === "undefined" || room === null) return <>Loading...</>



    const playerSaveHandler = (p: Player | PlayerWSymbol, sym?:SymbolType) => {
        setPlayer(p)
        if (sym) {
            setRoom({ ...room, players: {
                ...room.players,
                [sym]: p
            } })
        }
    }



    return <>
        {
            !player ? <NewPlayerModal symbol={getUnusedSymbol()} onSave={playerSaveHandler} /> :
                playersAreEmpty(room) && <SymSelector onSave={playerSaveHandler} initPlayer={player} />
        }

        <Header players={room.players} current={room.players[currentSymbol]} />


        {
            !room.isFull ? <h1>Waiting for your partner...</h1> :
            <Game
                gameBoard={room.gameBoard}
                setGameBoard={(g: any) => setRoom({...room, gameBoard: g})}
                currentSymbol={currentSymbol}
                nextSymbol={nextSymbol}
            />
        }

    </>
    */
}