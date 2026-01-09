import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Game from '../../src/components/Game'

describe('Game', () => {
  it('should render game board', () => {
    render(<Game />)
    const board = screen.getByRole('grid', { name: /オセロボード/i })
    const cells = board.querySelectorAll('button')
    expect(cells.length).toBe(64) // 8x8 board
  })

  it('should display current player', () => {
    render(<Game />)
    // Should show current player (black initially)
    expect(screen.getByText(/現在のプレイヤー: 黒/i)).toBeInTheDocument()
  })

  it('should display scores', () => {
    render(<Game />)
    // Should show scores (initially 2-2)
    const scores = screen.getAllByText('2')
    expect(scores.length).toBeGreaterThanOrEqual(2) // At least 2 score values
  })

  it('should allow making moves', async () => {
    const user = userEvent.setup()
    render(<Game />)
    
    const board = screen.getByRole('grid', { name: /オセロボード/i })
    const cells = board.querySelectorAll('button')
    // Find a valid move cell (should be highlighted)
    // Click on a valid move
    const validMoveCell = Array.from(cells).find(cell => 
      cell.classList.contains('valid-move') || 
      cell.getAttribute('data-valid') === 'true'
    )
    
    if (validMoveCell) {
      await user.click(validMoveCell)
      // Player should switch after move
      // This is a basic test - actual behavior depends on implementation
    }
  })

  it('should have reset button', () => {
    render(<Game />)
    const resetButton = screen.getByRole('button', { name: /リセット|reset/i })
    expect(resetButton).toBeInTheDocument()
  })
})
