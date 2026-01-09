import { useState, useCallback } from 'react'
import { Game as GameLogic } from '../game/game'
import Board from './Board'
import GameStatus from './GameStatus'

export default function Game() {
  const [game] = useState(() => new GameLogic())
  const [gameState, setGameState] = useState(() => game.getState())

  const handleCellClick = useCallback((row: number, col: number) => {
    const success = game.makeMove(row, col)
    if (success) {
      setGameState(game.getState())
    }
  }, [game])

  const handlePass = useCallback(() => {
    const success = game.passTurn()
    if (success) {
      setGameState(game.getState())
    }
  }, [game])

  const handleReset = useCallback(() => {
    game.reset()
    setGameState(game.getState())
  }, [game])

  return (
    <div className="game-container">
      <GameStatus
        currentPlayer={gameState.currentPlayer}
        blackScore={gameState.blackScore}
        whiteScore={gameState.whiteScore}
        gameOver={gameState.gameOver}
        winner={gameState.winner}
        canPass={gameState.canPass}
      />
      <Board
        board={gameState.board}
        onCellClick={handleCellClick}
        validMoves={game.getValidMoves()}
      />
      <div className="game-controls">
        {gameState.canPass && !gameState.gameOver && (
          <button onClick={handlePass} className="pass-button">
            パス
          </button>
        )}
        <button onClick={handleReset} className="reset-button">
          リセット
        </button>
      </div>
    </div>
  )
}
