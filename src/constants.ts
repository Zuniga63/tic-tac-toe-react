export const TURNS = {
  X: 'x',
  O: 'o',
};

export const LOCAL_STORAGE_KEY = {
  board: 'board',
  turn: 'turn',
};

export const WINNER_COMBOS = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //Verticals
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //Diagonals
  [0, 4, 8],
  [2, 4, 6],
];
