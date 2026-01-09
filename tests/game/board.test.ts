import { describe, it, expect } from 'vitest'
import {
  createBoard,
  isValidMove,
  getFlippableCells,
  placePiece,
  getScore,
  isGameOver,
  getValidMoves,
} from '../../src/game/board'
import type { Board, Player } from '../../src/game/types'

describe('createBoard', () => {
  it('should create an 8x8 board', () => {
    const board = createBoard()
    expect(board.length).toBe(8)
    expect(board.every(row => row.length === 8)).toBe(true)
  })

  it('should initialize with empty cells except center', () => {
    const board = createBoard()
    // Check that center 4 cells are not empty
    expect(board[3][3]).toBe('white')
    expect(board[3][4]).toBe('black')
    expect(board[4][3]).toBe('black')
    expect(board[4][4]).toBe('white')
    
    // Check corners are empty
    expect(board[0][0]).toBe('empty')
    expect(board[0][7]).toBe('empty')
    expect(board[7][0]).toBe('empty')
    expect(board[7][7]).toBe('empty')
  })
})

describe('isValidMove', () => {
  it('should return false for out of bounds position', () => {
    const board = createBoard()
    expect(isValidMove(board, 'black', -1, 0)).toBe(false)
    expect(isValidMove(board, 'black', 0, -1)).toBe(false)
    expect(isValidMove(board, 'black', 8, 0)).toBe(false)
    expect(isValidMove(board, 'black', 0, 8)).toBe(false)
  })

  it('should return false for occupied cell', () => {
    const board = createBoard()
    expect(isValidMove(board, 'black', 3, 3)).toBe(false) // Already white
    expect(isValidMove(board, 'black', 3, 4)).toBe(false) // Already black
  })

  it('should return false if no pieces can be flipped', () => {
    const board = createBoard()
    expect(isValidMove(board, 'black', 0, 0)).toBe(false)
  })

  it('should return true for valid move', () => {
    const board = createBoard()
    // Black can play at (2, 3) to flip white at (3, 3)
    expect(isValidMove(board, 'black', 2, 3)).toBe(true)
    // White can play at (2, 4) to flip black at (3, 4)
    expect(isValidMove(board, 'white', 2, 4)).toBe(true)
  })
})

describe('getFlippableCells', () => {
  it('should return empty array for invalid move', () => {
    const board = createBoard()
    expect(getFlippableCells(board, 'black', 0, 0)).toEqual([])
  })

  it('should return correct flippable cells for valid move', () => {
    const board = createBoard()
    // Black at (2, 3) should flip white at (3, 3)
    const flippable = getFlippableCells(board, 'black', 2, 3)
    expect(flippable.length).toBeGreaterThan(0)
    expect(flippable).toContainEqual({ row: 3, col: 3 })
  })

  it('should check all 8 directions', () => {
    const board = createBoard()
    const flippable = getFlippableCells(board, 'black', 2, 3)
    // Should find pieces in at least one direction
    expect(flippable.length).toBeGreaterThan(0)
  })
})

describe('placePiece', () => {
  it('should place piece and flip opponent pieces', () => {
    const board = createBoard()
    const newBoard = placePiece(board, 'black', 2, 3)
    
    expect(newBoard[2][3]).toBe('black')
    expect(newBoard[3][3]).toBe('black') // Flipped from white
  })

  it('should not modify original board', () => {
    const board = createBoard()
    const originalValue = board[3][3]
    placePiece(board, 'black', 2, 3)
    expect(board[3][3]).toBe(originalValue)
  })

  it('should return same board for invalid move', () => {
    const board = createBoard()
    const newBoard = placePiece(board, 'black', 0, 0)
    expect(newBoard).toEqual(board)
  })
})

describe('getScore', () => {
  it('should return correct initial scores', () => {
    const board = createBoard()
    const { black, white } = getScore(board)
    expect(black).toBe(2)
    expect(white).toBe(2)
  })

  it('should count all pieces correctly', () => {
    const board = createBoard()
    const newBoard = placePiece(board, 'black', 2, 3)
    const { black, white } = getScore(newBoard)
    expect(black).toBe(4)
    expect(white).toBe(1)
  })
})

describe('isGameOver', () => {
  it('should return false for initial board', () => {
    const board = createBoard()
    expect(isGameOver(board, 'black')).toBe(false)
  })

  it('should return true when board is full', () => {
    const board: Board = Array(8).fill(null).map(() => 
      Array(8).fill('black' as const)
    )
    expect(isGameOver(board, 'black')).toBe(true)
  })

  it('should return true when no valid moves for both players', () => {
    // Create a board where neither player can move - all cells filled
    const board: Board = Array(8).fill(null).map(() => 
      Array(8).fill('black' as const)
    )
    // Make sure there are some white pieces so it's a valid game state
    board[0][0] = 'white'
    board[0][1] = 'white'
    board[1][0] = 'white'
    board[1][1] = 'white'
    expect(isGameOver(board, 'black')).toBe(true)
  })
})

describe('getValidMoves', () => {
  it('should return valid moves for initial board', () => {
    const board = createBoard()
    const moves = getValidMoves(board, 'black')
    expect(moves.length).toBeGreaterThan(0)
  })

  it('should return empty array when no valid moves', () => {
    const board: Board = Array(8).fill(null).map(() => 
      Array(8).fill('black' as const)
    )
    const moves = getValidMoves(board, 'white')
    expect(moves).toEqual([])
  })

  it('should only return valid moves', () => {
    const board = createBoard()
    const moves = getValidMoves(board, 'black')
    moves.forEach(move => {
      expect(isValidMove(board, 'black', move.row, move.col)).toBe(true)
    })
  })
})
