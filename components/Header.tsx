"use client"

import Player, { Players } from "@/interfaces/Player.interface"

import { IoCloseSharp, IoRadioButtonOffOutline } from "react-icons/io5";
import { CgShapeCircle } from "react-icons/cg"
import { GrFormClose } from "react-icons/gr"
import { BiCircle, BiX } from "react-icons/bi"
import { FiX } from "react-icons/fi"

import Style from "@/styles/Header.module.css"
import { Symbol } from "@/interfaces/Symbol.enum";

type Props = {
    players: Players
    current?: Player
    clear: () => void,
    playerSymbol?: Symbol,
    tied: number
}


export default function Header({ players, current = undefined, clear, playerSymbol, tied }: Props) {


    const PlayerItem = (props: { player: Player, isCurrent: boolean, browserPlayer: boolean }) => {
        const { player, isCurrent, browserPlayer } = props
        return <div className={Style.ResultIndicator} data-current={isCurrent} data-player={browserPlayer}>

            <span className={Style.WinCount}>
                <b>{player.symbol === Symbol.O ? "⭕" : "❌"} </b>
                {player.wins}
                </span>

            <div className=" flex flex-col">
                <span className={Style.PlayerIndicator}> {browserPlayer ? "You" : "Opponent"}</span>
                <span className="text-sm font-semibold ">{player.name}</span>
            </div>
        </div>
    }

    return <div className={Style.Header}>
        <button onClick={clear}>Exit</button>


        <div className="flex">
            <PlayerItem player={players.x as Player} browserPlayer={playerSymbol === Symbol.X} isCurrent={current?.symbol === Symbol.X} />



            <PlayerItem player={players.o as Player} browserPlayer={playerSymbol === Symbol.O} isCurrent={current?.symbol === Symbol.O} />

        </div>


        <button onClick={clear}>New</button>



    </div>
}   