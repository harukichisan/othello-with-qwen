import { createBoard, placePiece, getScore, getValidMoves as getValidMovesForPlayer } from './board'
import type { Board, Player, GameState, Position } from './types'

export class Game {
  private board: Board
  private currentPlayer: Player
  private gameOver: boolean
  private winner: Player | null

  constructor(board?: Board) {
    this.board = board || createBoard()
    this.currentPlayer = 'black'
    this.gameOver = false
    this.winner = null
    this.updateGameState()
  }

  getState(): GameState {
    const scores = getScore(this.board)
    const validMoves = getValidMovesForPlayer(this.board, this.currentPlayer)
    
    return {
      board: this.board.map(row => [...row]), // Deep copy
      currentPlayer: this.currentPlayer,
      gameOver: this.gameOver,
      winner: this.winner,
      blackScore: scores.black,
      whiteScore: scores.white,
      canPass: validMoves.length === 0 && !this.gameOver,
    }
  }

  makeMove(row: number, col: number): boolean {
    if (this.gameOver) {
      return false
    }

    const validMoves = getValidMovesForPlayer(this.board, this.currentPlayer)
    const isValid = validMoves.some(move => move.row === row && move.col === col)

    if (!isValid) {
      return false
    }

    this.board = placePiece(this.board, this.currentPlayer, row, col)
    this.switchPlayer()
    this.updateGameState()
    return true
  }

  passTurn(): boolean {
    if (this.gameOver) {
      return false
    }

    const validMoves = getValidMovesForPlayer(this.board, this.currentPlayer)
    if (validMoves.length > 0) {
      return false // Cannot pass when valid moves exist
    }

    this.switchPlayer()
    this.updateGameState()
    return true
  }

  getValidMoves(): Position[] {
    return getValidMovesForPlayer(this.board, this.currentPlayer)
  }

  reset(): void {
    this.board = createBoard()
    this.currentPlayer = 'black'
    this.gameOver = false
    this.winner = null
    this.updateGameState()
  }

  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black'
  }

  private updateGameState(): void {
    // Check if current player can move
    const currentPlayerMoves = getValidMovesForPlayer(this.board, this.currentPlayer)
    
    if (currentPlayerMoves.length === 0) {
      // Current player cannot move, check opponent
      const opponent: Player = this.currentPlayer === 'black' ? 'white' : 'black'
      const opponentMoves = getValidMovesForPlayer(this.board, opponent)
      
      if (opponentMoves.length === 0) {
        // Neither player can move - game over
        this.gameOver = true
        this.determineWinner()
      }
      // If opponent can move, they will get a turn (handled by passTurn or makeMove)
    }
  }

  private determineWinner(): void {
    const scores = getScore(this.board)
    if (scores.black > scores.white) {
      this.winner = 'black'
    } else if (scores.white > scores.black) {
      this.winner = 'white'
    } else {
      this.winner = null // Draw
    }
  }
}
