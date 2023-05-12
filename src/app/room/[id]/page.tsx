"use client"

import { useEffect, useState } from "react"

import useLocalStorage from "tt/hooks/useLocalStorage"
import NewPlayerModal from "tt/components/NewPlayerModal"
import Header from "tt/components/Header"

import Player, { PlayerWSymbol } from "tt/interfaces/Player.interface"

import { onValue, ref } from "@firebase/database"
import db from "tt/firebase/db"
import Room from "tt/interfaces/Room.interface"
import SymSelector from "tt/components/SymSelector"
import { set } from "firebase/database"



type Props = {
    params: { id: string }
}

type SymbolType = "x" | "o" | null


export default function GameRoom({ params }: Props) {

    const [room, setRoom] = useState<Room | null>(null)
    const room_ref = ref(db, `rooms/${params.id}`)

    const [player, setPlayer] = useLocalStorage<Player | null>("player", null)
    const [symbol, setSymbol] = useState<SymbolType>(null)


    const playersAreEmpty = (room_data: Room) => !room_data.players?.o && !room_data.players?.x


    const placePlayerInRoom = (r: Room) => {

        if (playersAreEmpty(r) || !player) {
            return r;
        }

        if (!r.players.o && r.players.x) {
            r.players.o = player
        }
        if (!r.players.x && r.players.o) {
            r.players.x = player
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
            let room_data: Room = sp.val()

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
                setRoom(currentRoom)
                set(room_ref, currentRoom)
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
            set(room_ref, currentRoom)

        }
    }, [room, player])




    if (typeof room === "undefined" || room === null) return <>Loading...</>



    const playerSaveHandler = (p: Player | PlayerWSymbol) => {
        setPlayer(p)
        let players = {
            o: room.players?.o,
            x: room.players?.x,
        }
        if ("sym" in p && p.sym) {
            players[p.sym] = p
        }
        setRoom({ ...room, players })
    }


    return <>
        {
            !player ? <NewPlayerModal symbol={symbol} onSave={playerSaveHandler} /> :
                playersAreEmpty(room) && <SymSelector onSave={playerSaveHandler} initPlayer={player} />
        }

        <Header players={room.players} />

        <h1>Room: {room.id}</h1>

    </>
}