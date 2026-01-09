import type { CellState, Position } from '../game/types'

interface CellProps {
  state: CellState
  position: Position
  isValidMove: boolean
  onClick: (row: number, col: number) => void
}

export default function Cell({ state, position, isValidMove, onClick }: CellProps) {
  const handleClick = () => {
    onClick(position.row, position.col)
  }

  return (
    <button
      className={`cell ${state} ${isValidMove ? 'valid-move' : ''}`}
      onClick={handleClick}
      disabled={state !== 'empty' && !isValidMove}
      aria-label={`Cell ${position.row}, ${position.col}, ${state === 'empty' ? 'empty' : state === 'black' ? 'black piece' : 'white piece'}`}
      data-row={position.row}
      data-col={position.col}
      data-valid={isValidMove}
    >
      {state === 'black' && <span className="piece black">●</span>}
      {state === 'white' && <span className="piece white">○</span>}
      {isValidMove && <span className="hint"></span>}
    </button>
  )
}
