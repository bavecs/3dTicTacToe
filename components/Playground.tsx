"use client"

import Player, { Players } from "@/interfaces/Player.interface";
import { useEffect, useState } from "react";

import Header from "./Header";
import { Symbol } from "@/interfaces/Symbol.enum";

type Props = {
    room: string
    players: Players,
    player: Player,
    current: Symbol
}

export default function Playground({room, players, player, current}: Props) {

    return <>
        <Header players={players} current={players[current]} />
        <h1 className="text-md font-bold">{"Room id: "+room}</h1>
        {
            players && Object.values(players).map((sPlayer: Player, i:number) =>
                <p key={i}>
                    {sPlayer.socketId === player?.socketId && '->'} {sPlayer.symbol}: {sPlayer.socketId}
                </p>
            )
        }
        
         <h2>{'You: '+player.name+' socket: '+player.socketId}</h2>
        
        
    </>
}

