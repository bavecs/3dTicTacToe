import { useEffect } from "react"
import { Symbol } from "../interfaces/Symbol.enum"

export type Cell = Symbol | null

export type Cells = Array<Cell>

type Dimension = "row" | "column" | "diagonal"

enum Diagonal {
    LeftToRight = 0,
    RightToLeft = 1
}

interface getDimensionInterface {
    (n: number): { values: Cells, indexes: number[] }
}

export class Board {

    size: number
    _cells: Cells

    constructor(size: number, cells?: Cells) {
        this.size =  size || 3
        this._cells = cells || new Array(Math.pow(this.size, 2)).fill(null)


    }


    get cells() {
        return this._cells
    }

    set cells(cells: Cells) {
        if (cells.length === Math.pow(this.size, 2)) {
            this._cells = cells
        } else {
            throw Error("The number of cells is not equal to the size of the board")
        }
    }

    cell(i: number) {
        return this._cells[i]
    }

    setCell(i: number, cell: Cell) {
        this._cells[i] = cell
    }

    iterateDimension(callback: (index: number) => Cells) {
        let results: Cells[] = []

        for (let index = 0; index < this.size; index++) {
            results.push(callback(index) as Cells)
        }

        return results
    }

    getNthRow(n: number) {

        let values: Cells = []
        let indexes: number[] = []

        const size = this.size


        for (let i = 0; i < size; i++) {
            let cellPosition = size * n + i
            values.push(this.cell(cellPosition));
            indexes.push(cellPosition)
        }
        return { values, indexes }

    }

    getRows(): Cells[] {
        return this.iterateDimension(i => this.getNthRow(i).values)
    }


    getNthColumn(n: number) {
        let values: Cells = []
        let indexes: number[] = []

        for (let i = n; i < this.cells.length; i += this.size) {
            values.push(this.cell(i));
            indexes.push(i)
        }
        return { values, indexes }
    }


    getColumns(): Cells[] {
        return this.iterateDimension(ci => this.getNthColumn(ci).values)
    }


    getNthDiagonal(diagn: Diagonal) {
        const size = this.size
        let values = []
        let indexes = []

        

        for (let i = 0; i < size; i++) {
            const xi = diagn === Diagonal.LeftToRight ? i * (size + 1) : (i + 1) * (size - 1)

            values.push(this.cell(xi))
            indexes.push(xi)
        }

        return { values, indexes }
    }

    getDiagonals(): Cells[] {

        return [
            this.getNthDiagonal(Diagonal.LeftToRight).values,
            this.getNthDiagonal(Diagonal.RightToLeft).values
        ]
    }

    clear() {
        this.cells = this.cells.fill(null)
    }

    isEmpty() {
        return !this.cells.join('')
    }

    isFull() {
        return !this.cells.some(cell => !cell)
    }


    checkStack(i: number, getNth: getDimensionInterface, symbol: Symbol): boolean {
        return getNth(i).values.every(sym => sym === symbol)
    }


    getUnifiedCells(): number[] | null {

        let unifiedCells: null | number[] = null

        const check = (i: number, cells: Cells): boolean => {
            return !unifiedCells && cells.every(sym => sym === Symbol.O) || cells.every(sym => sym === Symbol.X)
        }

        for (let i = 0; i < this.size; i++) {

            if (check(i, this.getNthRow(i).values)) {
                unifiedCells = this.getNthRow(i).indexes
            }
            if (check(i, this.getNthColumn(i).values)) {
                unifiedCells = this.getNthColumn(i).indexes
            }
            if (check(i, this.getNthDiagonal(i).values)) {
                unifiedCells = this.getNthDiagonal(i).indexes 
            }

        }

        return unifiedCells

    }




} 