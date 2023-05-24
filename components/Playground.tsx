"use client"

import Player, { Players } from "@/interfaces/Player.interface";
import { memo, useEffect, useState } from "react";

import Header from "./Header";
import { Symbol } from "@/interfaces/Symbol.enum";
import { Cells, Board } from "@/lib/Board.class";

import GameStyle from '@/styles/Game.module.css'


type Props = {
    room: string
    players: Players,
    player: Player,
    current: Symbol,
    board: Board,
    setBoard: (v: Board, winner?: number[] | null) => void,
    opponentWinnerIndexes?: number[] | null,
    newGame: () => void,
    numberOfNewGames: number,
    numberOfTied: number
}


const Playground = memo(({
     room,
     players,
     player,
     current,
     board,
     setBoard,
     opponentWinnerIndexes = null,
     newGame,
     numberOfNewGames,
     numberOfTied
    }: Props) =>{
    


    const [myWinnerIndexes, setMyWinnerIndexes] = useState<number[]>([])

    const isCurrentPlayer = current === player.symbol

    const clickable = !myWinnerIndexes.length && !opponentWinnerIndexes?.length && isCurrentPlayer


    useEffect(()=> {


        setMyWinnerIndexes([])
        

    }, [numberOfNewGames])


    function handleClick(index: number) {
        if (!clickable) return;

        let win: number[] | null = null

        if (!board.cell(index) && !win) {

            board.setCell(index, player.symbol)


            win  = board.getUnifiedCells()
            setBoard(board, win)

            if (win) {
                setMyWinnerIndexes(win)
            }

        }
    }



    function newGameHandler() {
        if (!confirm("You lose the game. Are you sure you're starting a new one?")) return;
        newGame()
    }

    return <>
        <Header players={players} current={players[current]} playerSymbol={player.symbol} tied={numberOfTied} clear={newGameHandler} />


            <div className={GameStyle.Board} >
                {
                    board.cells.map((cell, index) =>
                        <div
                            key={index}
                            data-clickable={clickable && !cell}
                            data-cell={cell}
                            data-mywinner={myWinnerIndexes.includes(index)}
                            data-opponentwinner={opponentWinnerIndexes && opponentWinnerIndexes.includes(index)}
                            onClick={() => handleClick(index)}
                        >
                            {cell}
                        </div>)
                }
            </div>



    </>
})

export default Playground

