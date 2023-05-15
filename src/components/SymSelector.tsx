import React, { useState } from 'react'
import Player, { PlayerWSymbol } from 'tt/interfaces/Player.interface';
import { uid } from 'uid';

import Style from "./NewPlayerModal.module.css"
import { SymbolType } from 'tt/app/room/[id]/page';

export default function SymSelector({onSave, initPlayer}: {onSave: (p: Player, sym?: SymbolType) => void, initPlayer: Player}) {

    const [sym, setSym] = useState<SymbolType>(null)



    return <>
        <div className="fixed top-0 bg-slate-800/50 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-lg max-h-full mx-auto ">

                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-5">

                    <div className='mb-2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select symbol</label>
                        <div className={Style.SymSelector}>
                            <span data-selected={sym === "o"} data-selectable={true} onClick={() => setSym("o")}>O</span>
                            <span data-selected={sym === "x"} data-selectable={true} onClick={() => setSym("x")}>X</span>
                        </div>
                    </div>
                    


                    <button onClick={() => onSave(initPlayer, sym)} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>

                </div>

            </div>
        </div>
    </>
}
