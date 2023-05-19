"use client"
import { useEffect, useState } from "react";
import HallLayout from "@/components/layout/HallLayout";
import Room from "@/interfaces/Room.interface";


export default function Rooms() {

    const [rooms, setRooms] = useState<Room[]>([])

    return <>
    <HallLayout>
        <h1 className="text-md font-bold text-center">Rooms</h1>
        {
            rooms.map(room => <a href={"./room/" + room.id} key={room.id} className="flex p-2 justify-between border-b border-gray-300">
                <span>{room.id} {room.isFull && "- Full"}</span>
                <span>{new Date(room.active_at).toLocaleDateString("HU")}</span>

            </a>)
        }
    </HallLayout>
    </>
}