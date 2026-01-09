import Cell from './Cell'
import type { Board as BoardType, Position } from '../game/types'

interface BoardProps {
  board: BoardType
  onCellClick: (row: number, col: number) => void
  validMoves: Position[]
}

export default function Board({ board, onCellClick, validMoves }: BoardProps) {
  const isValidMove = (row: number, col: number): boolean => {
    return validMoves.some(move => move.row === row && move.col === col)
  }

  return (
    <div className="board" role="grid" aria-label="オセロボード">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              state={cell}
              position={{ row: rowIndex, col: colIndex }}
              isValidMove={isValidMove(rowIndex, colIndex)}
              onClick={onCellClick}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
