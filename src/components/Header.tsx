import Player from "tt/interfaces/Player.interface"

import { IoCloseSharp, IoRadioButtonOffOutline } from "react-icons/io5";
import {CgShapeCircle} from "react-icons/cg"
import {GrFormClose} from "react-icons/gr"

import Style from "./Header.module.css"

type Props = {
    players: {
        o?: Player | 0,
        x?: Player | 0
    }
    current?: Player | 0
}

function PlayerItem({ sym, player, current }: { sym: "o" | "x", current: boolean, player?: Player | 0 }) {
    return <div className={Style.PlayerItem} data-current={current}>
        {(sym === "x") ? <GrFormClose /> : <CgShapeCircle />}
        <span>{(!!player) ? player.name : "--"}</span>
    </div>
}

export default function Header({ players, current = 0 }: Props) {
    return <div className=" bg-white border-b border-gray-300 p-1 flex">
        <PlayerItem sym="o" player={players?.o} current={players.o === current} />
        <PlayerItem sym="x" player={players?.x} current={players.x === current} />
    </div>
}   