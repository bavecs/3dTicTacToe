import React, { useReducer, useState } from 'react'

import Style from '@/styles/Game.module.css'


type SymbolType = "o" | "x" | null

type TGameBoard = Array<SymbolType>

type Props = {
    gameBoard: TGameBoard
    setGameBoard: (g: TGameBoard) => void,
    currentSymbol: SymbolType,
    nextSymbol: () => void
}

export default function Game({gameBoard, setGameBoard, currentSymbol, nextSymbol}: Props) {




    const handleClick = (i: number) => {
        if (gameBoard[i]) return;

        gameBoard[i] = currentSymbol
        setGameBoard(gameBoard)
        nextSymbol()
    }

    return <>

        <p>Current Symbol: {currentSymbol}</p>

        <div className={Style.Board}>
            {
                gameBoard.map((v, i) => <div key={i} data-cell={v} onClick={() => handleClick(i)}>{v}</div>)
            }
        </div>
    </>

    
}
