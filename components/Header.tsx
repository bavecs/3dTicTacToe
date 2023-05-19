"use client"

import Player, { Players } from "@/interfaces/Player.interface"

import { IoCloseSharp, IoRadioButtonOffOutline } from "react-icons/io5";
import {CgShapeCircle} from "react-icons/cg"
import {GrFormClose} from "react-icons/gr"

import Style from "@/styles/Header.module.css"
import { Symbol } from "@/interfaces/Symbol.enum";

type Props = {
    players: Players
    current?: Player
}


export default function Header({ players, current = undefined }: Props) {


    const PlayerItem = (props: {player: Player, isCurrent: boolean}) => {
        const {player, isCurrent} = props
        return <div className={Style.PlayerItem} data-current={isCurrent}>
            <span>{player.symbol}</span>
        <span>{player.name}</span>
    </div>
    }

    return <div className=" bg-white border-b border-gray-300 p-1 flex">

        {
            Object.values(players).map((player, i) => <PlayerItem key={i} player={player} isCurrent={player === current} />)
        }

        
    </div>
}   