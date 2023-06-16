import { ReactNode } from 'react';
import styles from './Square.module.css';

type Props = {
  children?: ReactNode;
  index?: number;
  isSelected?: boolean;
  updateBoard?(index: number): void;
};
export default function Square({
  children,
  updateBoard = () => null,
  index,
  isSelected = false,
}: Props) {
  const handleClick = () => {
    if (updateBoard && typeof index !== 'undefined') {
      updateBoard(index);
    }
  };
  return (
    <div
      className={`${styles.square} ${isSelected ? styles.is_selected : ''}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
