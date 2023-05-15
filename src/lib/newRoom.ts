import { push, ref, set } from '@firebase/database';
import { uid } from 'uid';
import db from "../firebase/db"
import Room from 'tt/interfaces/Room.interface';
import { gameBoardToString } from './gameBoardUtils';


const now:number =  Date.now()

const emptyRoom:Room = {
    id: uid(4),
    players: {
        o: 0,
        x: 0
    },
    created_at: now,
    last_activeDate: now,
    isFull: false,
    playedGames: 0,
    gameBoard: new Array(9).fill(null)
}

export default function newRoom() {
    const roomsRef = ref(db, "rooms/" + emptyRoom.id)

    set(roomsRef, {
        ...emptyRoom,
        gameBoard: gameBoardToString(emptyRoom.gameBoard)
    })

    return emptyRoom.id
}