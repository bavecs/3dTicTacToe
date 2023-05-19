import React, { useState } from 'react'
import Player from '@/interfaces/Player.interface';

import Style from "@/styles/NewPlayerModal.module.css"
import { Symbol } from '@/interfaces/Symbol.enum';

type Props = {
    onSave: (p: Player, s: Symbol | null) => void,
    symbol?: Symbol | null
}

export default function NewPlayerModal({onSave, symbol = null}: Props) {

    const [sym, setSym] = useState<Symbol | null>(symbol)

    const [player, setPlayer] = useState<Player>({
        name: "",
        socketId: "",
        symbol: Symbol.X
    });

    const changeHandler = (e: any) => {
        setPlayer({...player, name: e.target.value})
    }

    const selectSymbol = (symA: Symbol) => {
        if (symbol !== null) return;
        setSym(symA)
    }


    return <>
        <div className="fixed top-0 bg-slate-800/50 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-lg max-h-full mx-auto ">

                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-5">

                    { !symbol &&  <div className='mb-2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select symbol</label>
                        <div className={Style.SymSelector}>
                            <span data-selected={sym === Symbol.O} data-selectable={!symbol} onClick={() => selectSymbol(Symbol.O)}>O</span>
                            <span data-selected={sym === Symbol.X} data-selectable={!symbol} onClick={() => selectSymbol(Symbol.X)}>X</span>
                        </div>
                    </div>
                    }

                    <div className='mb-4'>
                        <label htmlFor="user_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter a Nickname</label>
                        <input value={player.name} onChange={changeHandler} type="text" id="user_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                    </div>

                    <button onClick={() => onSave(player, sym)} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>

                </div>

            </div>
        </div>
    </>
}
