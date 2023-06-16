import { useState } from 'react';
import confetti from 'canvas-confetti';
import styles from './App.module.css';
import Square from './components/Square';
import { LOCAL_STORAGE_KEY, TURNS } from './constants';
import WinnerModal from './components/WinnerModal';
import { checkEndGameFrom, checkWinnerFrom } from './logic/board';

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem(
      LOCAL_STORAGE_KEY.board
    );
    if (boardFromLocalStorage)
      return JSON.parse(boardFromLocalStorage) as (string | null)[];
    return Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem(
      LOCAL_STORAGE_KEY.turn
    );
    if (turnFromLocalStorage) return turnFromLocalStorage as string;
    return TURNS.X;
  });
  const [winner, setWinner] = useState<null | string | boolean>(null);

  const updateBoard = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    window.localStorage.setItem(
      LOCAL_STORAGE_KEY.board,
      JSON.stringify(newBoard)
    );
    window.localStorage.setItem(LOCAL_STORAGE_KEY.turn, newTurn);

    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGameFrom(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem(LOCAL_STORAGE_KEY.board);
    window.localStorage.removeItem(LOCAL_STORAGE_KEY.turn);
  };

  return (
    <main className={styles.board}>
      <h1 className={styles.title}>Tic Tac Toe</h1>
      <button className={styles.board__button} onClick={resetGame}>
        Empezar de nuevo
      </button>
      <section className={styles.game}>
        {board.map((_, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            <span>{board[index]}</span>
          </Square>
        ))}
      </section>

      <section className={styles.turn}>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} reset={resetGame} />
    </main>
  );
}

export default App;
