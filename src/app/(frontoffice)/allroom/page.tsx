"use client"
import { Room } from "@prisma/client"

import useFetch from "tt/hooks/useFetch"

export default function Rooms() {
    const { data, error } = useFetch<Room[]>('./api/room/')


    if (error) {
        console.log(error)
        return <p>There is an error.</p>
    }
    if (!data) return <p>Loading...</p>

    return <>
        <h1 className="text-md font-bold text-center">Rooms</h1>
        {
            data.map(room => <a href={"./room/" + room.id} key={room.id} className="flex p-2 justify-between border-b border-gray-300">
                <span>{room.id} {room.isFull && "- Full"}</span>
                <span>{new Date(room.activeAt).toLocaleDateString("HU")}</span>
                
            </a>)
        }
    </>
}