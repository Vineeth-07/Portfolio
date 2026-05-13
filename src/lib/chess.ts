export type ChessColor = "w" | "b";
export type PieceType = "p" | "n" | "b" | "r" | "q" | "k";

export type ChessPiece = {
  color: ChessColor;
  type: PieceType;
};

export type ChessSquare = {
  row: number;
  col: number;
};

export type ChessMove = {
  from: ChessSquare;
  to: ChessSquare;
  promotion?: PieceType;
  isEnPassant?: boolean;
  castle?: "kingside" | "queenside";
};

type CastlingSide = {
  kingside: boolean;
  queenside: boolean;
};

export type ChessGameState = {
  board: (ChessPiece | null)[][];
  turn: ChessColor;
  castling: {
    w: CastlingSide;
    b: CastlingSide;
  };
  enPassant: ChessSquare | null;
};

export type ChessDifficulty = "easy" | "medium" | "hard";

export type ChessGameStatus = {
  status: "playing" | "checkmate" | "stalemate";
  winner: ChessColor | "draw" | null;
  message: string;
};

const BOARD_SIZE = 8;

const PIECE_VALUES: Record<PieceType, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20_000,
};

const createBackRank = (color: ChessColor): ChessPiece[] => [
  { color, type: "r" },
  { color, type: "n" },
  { color, type: "b" },
  { color, type: "q" },
  { color, type: "k" },
  { color, type: "b" },
  { color, type: "n" },
  { color, type: "r" },
];

const createPawnRank = (color: ChessColor) =>
  Array.from({ length: BOARD_SIZE }, () => ({ color, type: "p" as const }));

const createEmptyRank = () => Array.from({ length: BOARD_SIZE }, () => null);

const cloneBoard = (board: ChessGameState["board"]) => board.map((row) => row.slice());

const isInsideBoard = (row: number, col: number) =>
  row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;

export const getSquareKey = ({ row, col }: ChessSquare) => `${row}-${col}`;

export const areSquaresEqual = (a: ChessSquare, b: ChessSquare) =>
  a.row === b.row && a.col === b.col;

export const getOppositeColor = (color: ChessColor): ChessColor => (color === "w" ? "b" : "w");

export const getPieceGlyph = (piece: ChessPiece | null) => {
  if (!piece) {
    return "";
  }

  const glyphMap: Record<ChessColor, Record<PieceType, string>> = {
    w: {
      p: "♙",
      n: "♘",
      b: "♗",
      r: "♖",
      q: "♕",
      k: "♔",
    },
    b: {
      p: "♟",
      n: "♞",
      b: "♝",
      r: "♜",
      q: "♛",
      k: "♚",
    },
  };

  return glyphMap[piece.color][piece.type];
};

export const initialChessGameState = (): ChessGameState => ({
  board: [
    createBackRank("b"),
    createPawnRank("b"),
    createEmptyRank(),
    createEmptyRank(),
    createEmptyRank(),
    createEmptyRank(),
    createPawnRank("w"),
    createBackRank("w"),
  ],
  turn: "w",
  castling: {
    w: { kingside: true, queenside: true },
    b: { kingside: true, queenside: true },
  },
  enPassant: null,
});

const getKingSquare = (
  board: ChessGameState["board"],
  color: ChessColor,
): ChessSquare | null => {
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const piece = board[row][col];

      if (piece?.color === color && piece.type === "k") {
        return { row, col };
      }
    }
  }

  return null;
};

export const isSquareAttacked = (
  board: ChessGameState["board"],
  target: ChessSquare,
  byColor: ChessColor,
) => {
  const pawnRow = target.row + (byColor === "w" ? 1 : -1);

  for (const offset of [-1, 1]) {
    const pawnCol = target.col + offset;

    if (!isInsideBoard(pawnRow, pawnCol)) {
      continue;
    }

    const piece = board[pawnRow][pawnCol];

    if (piece?.color === byColor && piece.type === "p") {
      return true;
    }
  }

  const knightOffsets = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  for (const [rowOffset, colOffset] of knightOffsets) {
    const row = target.row + rowOffset;
    const col = target.col + colOffset;

    if (!isInsideBoard(row, col)) {
      continue;
    }

    const piece = board[row][col];

    if (piece?.color === byColor && piece.type === "n") {
      return true;
    }
  }

  const kingOffsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const [rowOffset, colOffset] of kingOffsets) {
    const row = target.row + rowOffset;
    const col = target.col + colOffset;

    if (!isInsideBoard(row, col)) {
      continue;
    }

    const piece = board[row][col];

    if (piece?.color === byColor && piece.type === "k") {
      return true;
    }
  }

  const slidingDirections: Array<{
    rowStep: number;
    colStep: number;
    allowedTypes: PieceType[];
  }> = [
    { rowStep: -1, colStep: 0, allowedTypes: ["r", "q"] },
    { rowStep: 1, colStep: 0, allowedTypes: ["r", "q"] },
    { rowStep: 0, colStep: -1, allowedTypes: ["r", "q"] },
    { rowStep: 0, colStep: 1, allowedTypes: ["r", "q"] },
    { rowStep: -1, colStep: -1, allowedTypes: ["b", "q"] },
    { rowStep: -1, colStep: 1, allowedTypes: ["b", "q"] },
    { rowStep: 1, colStep: -1, allowedTypes: ["b", "q"] },
    { rowStep: 1, colStep: 1, allowedTypes: ["b", "q"] },
  ];

  for (const { rowStep, colStep, allowedTypes } of slidingDirections) {
    let row = target.row + rowStep;
    let col = target.col + colStep;

    while (isInsideBoard(row, col)) {
      const piece = board[row][col];

      if (piece) {
        if (piece.color === byColor && allowedTypes.includes(piece.type)) {
          return true;
        }

        break;
      }

      row += rowStep;
      col += colStep;
    }
  }

  return false;
};

export const isKingInCheck = (state: ChessGameState, color: ChessColor) => {
  const kingSquare = getKingSquare(state.board, color);

  return kingSquare ? isSquareAttacked(state.board, kingSquare, getOppositeColor(color)) : false;
};

const buildPawnMoves = (state: ChessGameState, square: ChessSquare, piece: ChessPiece) => {
  const moves: ChessMove[] = [];
  const direction = piece.color === "w" ? -1 : 1;
  const startRow = piece.color === "w" ? 6 : 1;
  const promotionRow = piece.color === "w" ? 0 : 7;
  const nextRow = square.row + direction;

  if (isInsideBoard(nextRow, square.col) && !state.board[nextRow][square.col]) {
    moves.push({
      from: square,
      to: { row: nextRow, col: square.col },
      promotion: nextRow === promotionRow ? "q" : undefined,
    });

    const doubleRow = square.row + direction * 2;

    if (
      square.row === startRow &&
      isInsideBoard(doubleRow, square.col) &&
      !state.board[doubleRow][square.col]
    ) {
      moves.push({
        from: square,
        to: { row: doubleRow, col: square.col },
      });
    }
  }

  for (const offset of [-1, 1]) {
    const captureCol = square.col + offset;

    if (!isInsideBoard(nextRow, captureCol)) {
      continue;
    }

    const targetPiece = state.board[nextRow][captureCol];

    if (targetPiece && targetPiece.color !== piece.color) {
      moves.push({
        from: square,
        to: { row: nextRow, col: captureCol },
        promotion: nextRow === promotionRow ? "q" : undefined,
      });
    }

    if (
      state.enPassant &&
      state.enPassant.row === nextRow &&
      state.enPassant.col === captureCol
    ) {
      moves.push({
        from: square,
        to: { row: nextRow, col: captureCol },
        isEnPassant: true,
      });
    }
  }

  return moves;
};

const buildKnightMoves = (state: ChessGameState, square: ChessSquare, piece: ChessPiece) => {
  const moves: ChessMove[] = [];
  const offsets = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  for (const [rowOffset, colOffset] of offsets) {
    const row = square.row + rowOffset;
    const col = square.col + colOffset;

    if (!isInsideBoard(row, col)) {
      continue;
    }

    const targetPiece = state.board[row][col];

    if (!targetPiece || targetPiece.color !== piece.color) {
      moves.push({
        from: square,
        to: { row, col },
      });
    }
  }

  return moves;
};

const buildSlidingMoves = (
  state: ChessGameState,
  square: ChessSquare,
  piece: ChessPiece,
  directions: Array<[number, number]>,
) => {
  const moves: ChessMove[] = [];

  for (const [rowStep, colStep] of directions) {
    let row = square.row + rowStep;
    let col = square.col + colStep;

    while (isInsideBoard(row, col)) {
      const targetPiece = state.board[row][col];

      if (!targetPiece) {
        moves.push({
          from: square,
          to: { row, col },
        });
      } else {
        if (targetPiece.color !== piece.color) {
          moves.push({
            from: square,
            to: { row, col },
          });
        }

        break;
      }

      row += rowStep;
      col += colStep;
    }
  }

  return moves;
};

const buildKingMoves = (state: ChessGameState, square: ChessSquare, piece: ChessPiece) => {
  const moves: ChessMove[] = [];
  const opponent = getOppositeColor(piece.color);
  const offsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const [rowOffset, colOffset] of offsets) {
    const row = square.row + rowOffset;
    const col = square.col + colOffset;

    if (!isInsideBoard(row, col)) {
      continue;
    }

    const targetPiece = state.board[row][col];

    if (!targetPiece || targetPiece.color !== piece.color) {
      moves.push({
        from: square,
        to: { row, col },
      });
    }
  }

  const homeRow = piece.color === "w" ? 7 : 0;
  const rights = state.castling[piece.color];

  if (
    square.row === homeRow &&
    square.col === 4 &&
    !isSquareAttacked(state.board, square, opponent)
  ) {
    if (
      rights.kingside &&
      !state.board[homeRow][5] &&
      !state.board[homeRow][6] &&
      state.board[homeRow][7]?.type === "r" &&
      state.board[homeRow][7]?.color === piece.color &&
      !isSquareAttacked(state.board, { row: homeRow, col: 5 }, opponent) &&
      !isSquareAttacked(state.board, { row: homeRow, col: 6 }, opponent)
    ) {
      moves.push({
        from: square,
        to: { row: homeRow, col: 6 },
        castle: "kingside",
      });
    }

    if (
      rights.queenside &&
      !state.board[homeRow][1] &&
      !state.board[homeRow][2] &&
      !state.board[homeRow][3] &&
      state.board[homeRow][0]?.type === "r" &&
      state.board[homeRow][0]?.color === piece.color &&
      !isSquareAttacked(state.board, { row: homeRow, col: 3 }, opponent) &&
      !isSquareAttacked(state.board, { row: homeRow, col: 2 }, opponent)
    ) {
      moves.push({
        from: square,
        to: { row: homeRow, col: 2 },
        castle: "queenside",
      });
    }
  }

  return moves;
};

const generatePseudoMoves = (state: ChessGameState, color: ChessColor) => {
  const moves: ChessMove[] = [];

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const piece = state.board[row][col];

      if (!piece || piece.color !== color) {
        continue;
      }

      const square = { row, col };

      switch (piece.type) {
        case "p":
          moves.push(...buildPawnMoves(state, square, piece));
          break;
        case "n":
          moves.push(...buildKnightMoves(state, square, piece));
          break;
        case "b":
          moves.push(
            ...buildSlidingMoves(state, square, piece, [
              [-1, -1],
              [-1, 1],
              [1, -1],
              [1, 1],
            ]),
          );
          break;
        case "r":
          moves.push(
            ...buildSlidingMoves(state, square, piece, [
              [-1, 0],
              [1, 0],
              [0, -1],
              [0, 1],
            ]),
          );
          break;
        case "q":
          moves.push(
            ...buildSlidingMoves(state, square, piece, [
              [-1, -1],
              [-1, 1],
              [1, -1],
              [1, 1],
              [-1, 0],
              [1, 0],
              [0, -1],
              [0, 1],
            ]),
          );
          break;
        case "k":
          moves.push(...buildKingMoves(state, square, piece));
          break;
        default:
          break;
      }
    }
  }

  return moves;
};

export const applyChessMove = (state: ChessGameState, move: ChessMove): ChessGameState => {
  const board = cloneBoard(state.board);
  const piece = board[move.from.row][move.from.col];

  if (!piece) {
    return state;
  }

  const targetPiece = state.board[move.to.row][move.to.col];
  board[move.from.row][move.from.col] = null;

  if (move.isEnPassant) {
    const captureRow = move.to.row + (piece.color === "w" ? 1 : -1);
    board[captureRow][move.to.col] = null;
  }

  if (move.castle) {
    const rookFromCol = move.castle === "kingside" ? 7 : 0;
    const rookToCol = move.castle === "kingside" ? 5 : 3;
    board[move.to.row][rookToCol] = board[move.to.row][rookFromCol];
    board[move.to.row][rookFromCol] = null;
  }

  board[move.to.row][move.to.col] = {
    color: piece.color,
    type: move.promotion ?? piece.type,
  };

  const castling = {
    w: { ...state.castling.w },
    b: { ...state.castling.b },
  };

  if (piece.type === "k") {
    castling[piece.color].kingside = false;
    castling[piece.color].queenside = false;
  }

  if (piece.type === "r") {
    if (piece.color === "w" && move.from.row === 7 && move.from.col === 0) {
      castling.w.queenside = false;
    }

    if (piece.color === "w" && move.from.row === 7 && move.from.col === 7) {
      castling.w.kingside = false;
    }

    if (piece.color === "b" && move.from.row === 0 && move.from.col === 0) {
      castling.b.queenside = false;
    }

    if (piece.color === "b" && move.from.row === 0 && move.from.col === 7) {
      castling.b.kingside = false;
    }
  }

  if (targetPiece?.type === "r") {
    if (targetPiece.color === "w" && move.to.row === 7 && move.to.col === 0) {
      castling.w.queenside = false;
    }

    if (targetPiece.color === "w" && move.to.row === 7 && move.to.col === 7) {
      castling.w.kingside = false;
    }

    if (targetPiece.color === "b" && move.to.row === 0 && move.to.col === 0) {
      castling.b.queenside = false;
    }

    if (targetPiece.color === "b" && move.to.row === 0 && move.to.col === 7) {
      castling.b.kingside = false;
    }
  }

  const enPassant =
    piece.type === "p" && Math.abs(move.to.row - move.from.row) === 2
      ? { row: (move.to.row + move.from.row) / 2, col: move.from.col }
      : null;

  return {
    board,
    turn: getOppositeColor(state.turn),
    castling,
    enPassant,
  };
};

export const generateLegalMoves = (state: ChessGameState, color: ChessColor) =>
  generatePseudoMoves(state, color).filter((move) => {
    const nextState = applyChessMove(state, move);

    return !isKingInCheck(nextState, color);
  });

export const getChessGameStatus = (state: ChessGameState): ChessGameStatus => {
  const legalMoves = generateLegalMoves(state, state.turn);

  if (legalMoves.length > 0) {
    return {
      status: "playing",
      winner: null,
      message: isKingInCheck(state, state.turn)
        ? state.turn === "w"
          ? "Check. Find a safe move."
          : "Vineeth is under pressure."
        : state.turn === "w"
          ? "Your move."
          : "Vineeth is thinking through the next move.",
    };
  }

  if (isKingInCheck(state, state.turn)) {
    const winner = getOppositeColor(state.turn);

    return {
      status: "checkmate",
      winner,
      message:
        winner === "w"
          ? "Checkmate. You beat Vineeth."
          : "Checkmate. Vineeth wins this round.",
    };
  }

  return {
    status: "stalemate",
    winner: "draw",
    message: "Stalemate. Nobody could force the finish.",
  };
};

const getOrderedMoves = (state: ChessGameState, moves: ChessMove[]) =>
  [...moves].sort((moveA, moveB) => {
    const targetA = state.board[moveA.to.row][moveA.to.col];
    const targetB = state.board[moveB.to.row][moveB.to.col];
    const scoreA = (targetA ? PIECE_VALUES[targetA.type] : 0) + (moveA.promotion ? 800 : 0);
    const scoreB = (targetB ? PIECE_VALUES[targetB.type] : 0) + (moveB.promotion ? 800 : 0);

    return scoreB - scoreA;
  });

const evaluateBoard = (state: ChessGameState) => {
  let score = 0;

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const piece = state.board[row][col];

      if (!piece) {
        continue;
      }

      const baseValue = PIECE_VALUES[piece.type];
      const centerDistance = Math.abs(3.5 - row) + Math.abs(3.5 - col);
      const centerBonus = Math.max(0, 3.5 - centerDistance) * 6;
      const pawnAdvance = piece.type === "p" ? (piece.color === "b" ? row : 7 - row) * 8 : 0;
      const activityBonus =
        piece.type === "b" || piece.type === "n" ? Math.max(0, 14 - centerDistance * 2) : 0;
      const signedValue = baseValue + centerBonus + pawnAdvance + activityBonus;

      score += piece.color === "b" ? signedValue : -signedValue;
    }
  }

  const status = getChessGameStatus(state);

  if (status.status === "checkmate") {
    return status.winner === "b" ? 999_999 : -999_999;
  }

  if (status.status === "stalemate") {
    return 0;
  }

  return score;
};

const minimax = (
  state: ChessGameState,
  depth: number,
  alpha: number,
  beta: number,
): number => {
  const status = getChessGameStatus(state);

  if (depth === 0 || status.status !== "playing") {
    return evaluateBoard(state);
  }

  const legalMoves = getOrderedMoves(state, generateLegalMoves(state, state.turn));

  if (state.turn === "b") {
    let best = Number.NEGATIVE_INFINITY;

    for (const move of legalMoves) {
      const score = minimax(applyChessMove(state, move), depth - 1, alpha, beta);
      best = Math.max(best, score);
      alpha = Math.max(alpha, best);

      if (beta <= alpha) {
        break;
      }
    }

    return best;
  }

  let best = Number.POSITIVE_INFINITY;

  for (const move of legalMoves) {
    const score = minimax(applyChessMove(state, move), depth - 1, alpha, beta);
    best = Math.min(best, score);
    beta = Math.min(beta, best);

    if (beta <= alpha) {
      break;
    }
  }

  return best;
};

const difficultyDepth: Record<ChessDifficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

export const pickComputerMove = (
  state: ChessGameState,
  difficulty: ChessDifficulty,
): ChessMove | null => {
  const legalMoves = getOrderedMoves(state, generateLegalMoves(state, "b"));

  if (legalMoves.length === 0) {
    return null;
  }

  const depth = difficultyDepth[difficulty];
  const scoredMoves = legalMoves.map((move) => ({
    move,
    score: minimax(
      applyChessMove(state, move),
      Math.max(0, depth - 1),
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
    ),
  }));

  scoredMoves.sort((a, b) => b.score - a.score);

  if (difficulty === "easy") {
    const candidates = scoredMoves.slice(0, Math.min(3, scoredMoves.length));
    return candidates[Math.floor(Math.random() * candidates.length)].move;
  }

  if (difficulty === "medium") {
    const topScore = scoredMoves[0].score;
    const candidates = scoredMoves.filter((entry) => topScore - entry.score <= 60).slice(0, 3);
    return candidates[Math.floor(Math.random() * candidates.length)].move;
  }

  return scoredMoves[0].move;
};
