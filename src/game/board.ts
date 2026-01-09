import type { Board, Player, Position } from './types'

const BOARD_SIZE = 8

const DIRECTIONS = [
  { row: -1, col: -1 }, // top-left
  { row: -1, col: 0 },  // top
  { row: -1, col: 1 },  // top-right
  { row: 0, col: -1 },  // left
  { row: 0, col: 1 },   // right
  { row: 1, col: -1 },  // bottom-left
  { row: 1, col: 0 },   // bottom
  { row: 1, col: 1 },   // bottom-right
]

export function createBoard(): Board {
  const board: Board = Array(BOARD_SIZE).fill(null).map(() => 
    Array(BOARD_SIZE).fill('empty' as const)
  )
  
  // Initial setup: center 4 cells
  board[3][3] = 'white'
  board[3][4] = 'black'
  board[4][3] = 'black'
  board[4][4] = 'white'
  
  return board
}

export function isValidMove(
  board: Board,
  player: Player,
  row: number,
  col: number
): boolean {
  // Check bounds
  if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) {
    return false
  }
  
  // Check if cell is empty
  if (board[row][col] !== 'empty') {
    return false
  }
  
  // Check if any pieces can be flipped
  return getFlippableCells(board, player, row, col).length > 0
}

export function getFlippableCells(
  board: Board,
  player: Player,
  row: number,
  col: number
): Position[] {
  const flippable: Position[] = []
  const opponent: Player = player === 'black' ? 'white' : 'black'
  
  for (const dir of DIRECTIONS) {
    const cells: Position[] = []
    let currentRow = row + dir.row
    let currentCol = col + dir.col
    
    // Collect opponent pieces in this direction
    while (
      currentRow >= 0 && currentRow < BOARD_SIZE &&
      currentCol >= 0 && currentCol < BOARD_SIZE &&
      board[currentRow][currentCol] === opponent
    ) {
      cells.push({ row: currentRow, col: currentCol })
      currentRow += dir.row
      currentCol += dir.col
    }
    
    // If we found opponent pieces and next cell is player's piece, all are flippable
    if (
      cells.length > 0 &&
      currentRow >= 0 && currentRow < BOARD_SIZE &&
      currentCol >= 0 && currentCol < BOARD_SIZE &&
      board[currentRow][currentCol] === player
    ) {
      flippable.push(...cells)
    }
  }
  
  return flippable
}

export function placePiece(
  board: Board,
  player: Player,
  row: number,
  col: number
): Board {
  if (!isValidMove(board, player, row, col)) {
    return board
  }
  
  // Create deep copy of board
  const newBoard: Board = board.map(row => [...row])
  
  // Place piece
  newBoard[row][col] = player
  
  // Flip pieces
  const flippable = getFlippableCells(board, player, row, col)
  for (const pos of flippable) {
    newBoard[pos.row][pos.col] = player
  }
  
  return newBoard
}

export function getScore(board: Board): { black: number; white: number } {
  let black = 0
  let white = 0
  
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === 'black') {
        black++
      } else if (board[row][col] === 'white') {
        white++
      }
    }
  }
  
  return { black, white }
}

export function isGameOver(board: Board, currentPlayer: Player): boolean {
  // Check if current player can move
  if (getValidMoves(board, currentPlayer).length > 0) {
    return false
  }
  
  // Check if opponent can move
  const opponent: Player = currentPlayer === 'black' ? 'white' : 'black'
  if (getValidMoves(board, opponent).length > 0) {
    return false
  }
  
  // Neither player can move
  return true
}

export function getValidMoves(board: Board, player: Player): Position[] {
  const moves: Position[] = []
  
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (isValidMove(board, player, row, col)) {
        moves.push({ row, col })
      }
    }
  }
  
  return moves
}
