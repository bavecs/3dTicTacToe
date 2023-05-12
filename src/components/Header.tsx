import Player from "tt/interfaces/Player.interface"

import { IoCloseSharp, IoRadioButtonOffOutline } from "react-icons/io5";
import {CgShapeCircle} from "react-icons/cg"
import {GrFormClose} from "react-icons/gr"
type Props = {
    players: {
        o?: Player | 0,
        x?: Player | 0
    }
}

function PlayerItem({ sym, player }: { sym: "o" | "x", player?: Player | 0 }) {
    return <div className="flex gap-2 p-1 mx-2 items-center">
        {(sym === "x") ? <GrFormClose /> : <CgShapeCircle />}
        <span>{(!!player) ? player.name : "--"}</span>
    </div>
}

export default function Header({ players }: Props) {
    return <div className=" bg-white border-b border-gray-400 p-1 flex">
        <PlayerItem sym="o" player={players?.o} />
        <PlayerItem sym="x" player={players?.x} />
    </div>
}   