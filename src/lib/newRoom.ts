import { push, ref, set } from '@firebase/database';
import { uid } from 'uid';
import db from "../firebase/db"
import Room from 'tt/interfaces/Room.interface';


const now:number =  Date.now()

const emptyRoom:Room = {
    id: uid(),
    players: {
        o: 0,
        x: 0
    },
    created_at: now,
    last_activeDate: now,
    isFull: false,
    playedGames: 0,
    gameBoard: new Array(9),
}

export default function newRoom() {
    const roomsRef = ref(db, "rooms/" + emptyRoom.id)
    set(roomsRef, emptyRoom)

    return emptyRoom.id
}