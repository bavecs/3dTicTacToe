"use client"
import { useEffect, useState } from "react"
import Room from "tt/interfaces/Room.interface"

import db from "tt/firebase/db"
import { onValue, ref } from "@firebase/database"

export default function Rooms() {
    const [rooms, setRooms] = useState<Array<Room>>([])



    useEffect(() => {
        onValue(ref(db, "rooms"), (snapshot) => {


            const data: Record<string, Room> = snapshot.val()

            if (data === null) return
            const dataArray = Object.entries(data).map(([key, value]) => ({
                ...value,
                id: String(key)
            }))

            setRooms(dataArray)
        })
    }, [])


    if (!rooms.length) return <h1>Loading...</h1>

    return <>
        <h1 className="text-md font-bold text-center">Rooms</h1>
        {
            rooms.map(room => <a href={"./room/" + room.id} key={room.id} className="flex p-2 justify-between border-b border-gray-300">
                <span>{room.id} {room.isFull && "- Full"}</span>
                <span>{new Date(room.last_activeDate).toLocaleDateString("HU")}</span>
                
            </a>)
        }
    </>
}