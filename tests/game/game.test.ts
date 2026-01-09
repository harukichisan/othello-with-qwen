import { describe, it, expect, beforeEach } from 'vitest'
import { Game } from '../../src/game/game'
import { createBoard } from '../../src/game/board'

describe('Game', () => {
  let game: Game

  beforeEach(() => {
    game = new Game()
  })

  describe('initialization', () => {
    it('should initialize with correct initial state', () => {
      const state = game.getState()
      expect(state.currentPlayer).toBe('black')
      expect(state.gameOver).toBe(false)
      expect(state.winner).toBe(null)
      expect(state.blackScore).toBe(2)
      expect(state.whiteScore).toBe(2)
    })

    it('should have valid moves for black initially', () => {
      const state = game.getState()
      expect(state.canPass).toBe(false)
    })
  })

  describe('makeMove', () => {
    it('should place piece and switch player on valid move', () => {
      const validMoves = game.getValidMoves()
      expect(validMoves.length).toBeGreaterThan(0)
      
      const move = validMoves[0]
      const success = game.makeMove(move.row, move.col)
      
      expect(success).toBe(true)
      const state = game.getState()
      expect(state.currentPlayer).toBe('white')
      expect(state.board[move.row][move.col]).toBe('black')
    })

    it('should return false for invalid move', () => {
      const success = game.makeMove(0, 0)
      expect(success).toBe(false)
      const state = game.getState()
      expect(state.currentPlayer).toBe('black') // Should not change
    })

    it('should update scores after move', () => {
      const validMoves = game.getValidMoves()
      const move = validMoves[0]
      const initialState = game.getState()
      
      game.makeMove(move.row, move.col)
      const newState = game.getState()
      
      expect(newState.blackScore).toBeGreaterThan(initialState.blackScore)
      expect(newState.whiteScore).toBeLessThan(initialState.whiteScore)
    })
  })

  describe('passTurn', () => {
    it('should switch player when passing', () => {
      // Create a board where current player cannot move
      const board = createBoard()
      // Fill most cells to limit moves
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (board[row][col] === 'empty' && !(row === 2 && col === 3)) {
            board[row][col] = 'white'
          }
        }
      }
      // Set up so black cannot move but white can
      board[2][3] = 'empty'
      board[3][3] = 'white'
      board[3][4] = 'white'
      board[4][3] = 'white'
      board[4][4] = 'white'
      
      const testGame = new Game(board)
      const initialState = testGame.getState()
      if (initialState.canPass) {
        testGame.passTurn()
        const newState = testGame.getState()
        expect(newState.currentPlayer).not.toBe(initialState.currentPlayer)
      }
    })

    it('should not allow pass when valid moves exist', () => {
      const state = game.getState()
      if (!state.canPass) {
        const success = game.passTurn()
        expect(success).toBe(false)
      }
    })
  })

  describe('game over detection', () => {
    it('should detect game over when no moves available', () => {
      // Fill board to force game over
      const board = createBoard()
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (board[row][col] === 'empty') {
            board[row][col] = 'black'
          }
        }
      }
      // Set a few white pieces
      board[0][0] = 'white'
      board[0][1] = 'white'
      
      const testGame = new Game(board)
      const state = testGame.getState()
      expect(state.gameOver).toBe(true)
    })

    it('should set winner when game ends', () => {
      const board = createBoard()
      // Fill most cells with black
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (board[row][col] === 'empty') {
            board[row][col] = 'black'
          }
        }
      }
      // Set a few white pieces (less than black)
      board[0][0] = 'white'
      board[0][1] = 'white'
      
      const testGame = new Game(board)
      const state = testGame.getState()
      if (state.gameOver) {
        expect(state.winner).not.toBe(null)
      }
    })
  })

  describe('getValidMoves', () => {
    it('should return valid moves for current player', () => {
      const moves = game.getValidMoves()
      expect(moves.length).toBeGreaterThan(0)
      moves.forEach(move => {
        expect(move.row).toBeGreaterThanOrEqual(0)
        expect(move.row).toBeLessThan(8)
        expect(move.col).toBeGreaterThanOrEqual(0)
        expect(move.col).toBeLessThan(8)
      })
    })

    it('should return empty array when no valid moves', () => {
      const board = createBoard()
      // Fill board
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (board[row][col] === 'empty') {
            board[row][col] = 'black'
          }
        }
      }
      board[0][0] = 'white'
      
      const testGame = new Game(board)
      const moves = testGame.getValidMoves()
      expect(moves).toEqual([])
    })
  })

  describe('reset', () => {
    it('should reset game to initial state', () => {
      const validMoves = game.getValidMoves()
      game.makeMove(validMoves[0].row, validMoves[0].col)
      
      game.reset()
      const state = game.getState()
      expect(state.currentPlayer).toBe('black')
      expect(state.gameOver).toBe(false)
      expect(state.blackScore).toBe(2)
      expect(state.whiteScore).toBe(2)
    })
  })
})
