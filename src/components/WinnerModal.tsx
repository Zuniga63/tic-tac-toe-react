import Square from './Square';
import styles from './WinnerModal.module.css';
import appStyles from '../App.module.css';

type Props = {
  winner: null | string | boolean;
  reset(): void;
};

export default function WinnerModal({ winner, reset }: Props) {
  if (winner === null) return null;

  const winnerText = winner === false ? 'Empate' : 'Ganó:';

  return (
    <section className={styles.winner}>
      <div className={styles.winner__text}>
        <h2>{winnerText}</h2>

        <header className={styles.winner__win}>
          {winner && <Square>{winner}</Square>}
        </header>

        <footer>
          <button onClick={reset} className={appStyles.board__button}>
            Empezar de nuevo
          </button>
        </footer>
      </div>
    </section>
  );
}
