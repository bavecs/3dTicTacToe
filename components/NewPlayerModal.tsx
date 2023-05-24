import React, { useState } from 'react'
import Player from '@/interfaces/Player.interface';

import { Symbol } from '@/interfaces/Symbol.enum';
import Modal from './Modal';


type Props = {
    onSave: (p: Player) => void,
    initName?: string,
    socketId?: string,
    symbol?: Symbol
}


export default function NewPlayerModal({ onSave, initName = "", socketId = "", symbol = Symbol.X }: Props) {

    const [player, setPlayer] = useState<Player>({
        name: initName,
        socketId: socketId,
        symbol: symbol,
        wins: 0
    });

    const savehandler = () => {
        if (player.name.length > 1) {
            onSave(player)
        }
    }

    return <Modal>
        <div className='mb-4'>
            <label htmlFor="user_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter a Nickname</label>
            <input value={player.name} onChange={(e: any) => { setPlayer({ ...player, name: e.target.value })}} type="text" id="user_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
        </div>
        <button onClick={savehandler} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
    </Modal>


}
