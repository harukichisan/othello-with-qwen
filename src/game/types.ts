export type CellState = 'empty' | 'black' | 'white'

export type Player = 'black' | 'white'

export type Board = CellState[][]

export type Position = {
  row: number
  col: number
}

export type GameState = {
  board: Board
  currentPlayer: Player
  gameOver: boolean
  winner: Player | null
  blackScore: number
  whiteScore: number
  canPass: boolean
}
