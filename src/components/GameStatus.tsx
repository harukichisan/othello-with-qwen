import type { Player } from '../game/types'

interface GameStatusProps {
  currentPlayer: Player
  blackScore: number
  whiteScore: number
  gameOver: boolean
  winner: Player | null
  canPass: boolean
}

export default function GameStatus({
  currentPlayer,
  blackScore,
  whiteScore,
  gameOver,
  winner,
  canPass,
}: GameStatusProps) {
  const getPlayerName = (player: Player): string => {
    return player === 'black' ? '黒' : '白'
  }

  const getStatusMessage = (): string => {
    if (gameOver) {
      if (winner === null) {
        return '引き分けです！'
      }
      return `${getPlayerName(winner)}の勝ちです！`
    }
    if (canPass) {
      return `${getPlayerName(currentPlayer)}はパスです`
    }
    return `現在のプレイヤー: ${getPlayerName(currentPlayer)}`
  }

  return (
    <div className="game-status">
      <div className="scores">
        <div className="score black-score">
          <span className="score-label">黒:</span>
          <span className="score-value">{blackScore}</span>
        </div>
        <div className="score white-score">
          <span className="score-label">白:</span>
          <span className="score-value">{whiteScore}</span>
        </div>
      </div>
      <div className="status-message">{getStatusMessage()}</div>
    </div>
  )
}
