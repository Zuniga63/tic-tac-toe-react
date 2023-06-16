import { WINNER_COMBOS } from '../constants';

export function checkWinnerFrom(board: (string | null)[]) {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

export function checkEndGameFrom(board: (string | null)[]) {
  return board.every(square => square !== null);
}
