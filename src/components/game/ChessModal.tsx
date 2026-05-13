import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Brain,
  CircleDot,
  Crown,
  Gamepad2,
  RotateCcw,
  Sparkles,
  Swords,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import {
  applyChessMove,
  areSquaresEqual,
  generateLegalMoves,
  getChessGameStatus,
  getPieceGlyph,
  getSquareKey,
  initialChessGameState,
  isKingInCheck,
  pickComputerMove,
  type ChessDifficulty,
  type ChessGameState,
  type ChessSquare,
} from "../../lib/chess";

type ChessModalProps = {
  open: boolean;
  onClose: () => void;
};

const difficultyOptions: Array<{
  value: ChessDifficulty;
  label: string;
  description: string;
  icon: typeof Sparkles;
}> = [
  {
    value: "easy",
    label: "Easy",
    description: "Relaxed and forgiving play.",
    icon: Sparkles,
  },
  {
    value: "medium",
    label: "Medium",
    description: "Balanced pressure and tactics.",
    icon: Zap,
  },
  {
    value: "hard",
    label: "Hard",
    description: "Sharper search and stronger replies.",
    icon: Brain,
  },
];

const fileLabels = ["a", "b", "c", "d", "e", "f", "g", "h"];
const celebrationParticles = Array.from({ length: 16 }, (_, index) => index);

export const ChessModal = ({ open, onClose }: ChessModalProps) => {
  const [game, setGame] = useState<ChessGameState>(() => initialChessGameState());
  const [difficulty, setDifficulty] = useState<ChessDifficulty>("medium");
  const [selectedSquare, setSelectedSquare] = useState<ChessSquare | null>(null);
  const [showIntro, setShowIntro] = useState(false);

  const status = getChessGameStatus(game);
  const aiThinking = open && game.turn === "b" && status.status === "playing";
  const playerMoves = status.status === "playing" ? generateLegalMoves(game, "w") : [];
  const selectedMoves = selectedSquare
    ? playerMoves.filter((move) => areSquaresEqual(move.from, selectedSquare))
    : [];
  const selectedTargets = new Set(selectedMoves.map((move) => getSquareKey(move.to)));
  const whiteKingInCheck = isKingInCheck(game, "w");
  const blackKingInCheck = isKingInCheck(game, "b");

  useEffect(() => {
    if (!open) {
      return;
    }

    const introStart = window.setTimeout(() => {
      setShowIntro(true);
    }, 10);
    const introEnd = window.setTimeout(() => {
      setShowIntro(false);
    }, 1850);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(introStart);
      window.clearTimeout(introEnd);
      setShowIntro(false);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || game.turn !== "b" || status.status !== "playing") {
      return;
    }

    const timer = window.setTimeout(() => {
      setGame((currentState) => {
        if (currentState.turn !== "b") {
          return currentState;
        }

        const nextMove = pickComputerMove(currentState, difficulty);

        return nextMove ? applyChessMove(currentState, nextMove) : currentState;
      });
      setSelectedSquare(null);
    }, difficulty === "hard" ? 520 : difficulty === "medium" ? 390 : 260);

    return () => {
      window.clearTimeout(timer);
    };
  }, [difficulty, game, open, status.status]);

  const handleRestart = () => {
    setGame(initialChessGameState());
    setSelectedSquare(null);
    setShowIntro(true);
    window.setTimeout(() => {
      setShowIntro(false);
    }, 1650);
  };

  const handleSquareClick = (row: number, col: number) => {
    if (!open || aiThinking || showIntro || game.turn !== "w" || status.status !== "playing") {
      return;
    }

    const square = { row, col };
    const clickedPiece = game.board[row][col];
    const chosenMove = selectedMoves.find((move) => areSquaresEqual(move.to, square));

    if (chosenMove) {
      setGame(applyChessMove(game, chosenMove));
      setSelectedSquare(null);
      return;
    }

    if (clickedPiece?.color === "w") {
      const movesFromSquare = playerMoves.filter((move) => areSquaresEqual(move.from, square));
      setSelectedSquare(movesFromSquare.length > 0 ? square : null);
      return;
    }

    setSelectedSquare(null);
  };

  const turnLabel =
    status.status === "playing"
      ? game.turn === "w"
        ? "Your move"
        : aiThinking
          ? "Vineeth is thinking..."
          : "Vineeth is playing"
      : status.status === "stalemate"
        ? "Draw"
        : status.winner === "w"
          ? "You win"
          : "Vineeth wins";

  const statusTone =
    status.status === "checkmate"
      ? "is-danger"
      : status.status === "stalemate"
        ? "is-muted"
        : game.turn === "w"
          ? "is-player"
          : "is-bot";

  const resultTitle =
    status.status === "checkmate"
      ? status.winner === "w"
        ? "You beat Vineeth"
        : "Vineeth takes the win"
      : "Draw game";

  const resultCopy =
    status.status === "checkmate"
      ? status.winner === "w"
        ? "Clean finish. Reset the board and see if Vineeth answers differently."
        : "Vineeth closed it out this time. Run it back and try another line."
      : "Nobody could break through. Try another opening and pressure the board again.";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="game-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="game-modal-shell"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="game-modal-header">
              <div className="space-y-3">
                <div className="game-kicker">
                  <Gamepad2 size={14} />
                  Play a game?
                </div>
                <div>
                  <h3 className="game-modal-title">Challenge Vineeth to a quick chess match.</h3>
                  <p className="game-modal-copy">
                    You play White. Vineeth plays Black with easy, medium, and hard modes.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="game-close-button"
                onClick={onClose}
                aria-label="Close chess modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="game-modal-body">
              <div className="game-board-panel">
                <div className="game-board-topbar">
                  <div className={`game-status-pill ${statusTone}`}>
                    <Swords size={14} />
                    {turnLabel}
                  </div>
                  <div className="game-status-copy">{status.message}</div>
                </div>

                <div className="game-board-frame">
                  <AnimatePresence>
                    {showIntro ? (
                      <motion.div
                        className="game-start-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className="game-start-panel"
                          initial={{ opacity: 0, y: 18, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.98 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                        >
                          <div className="game-start-kicker">
                            <CircleDot size={14} />
                            Match initializing
                          </div>
                          <h4>Vineeth is stepping onto the board.</h4>
                          <p>
                            White opens first. Pick your line and make the first move.
                          </p>
                          <div className="game-start-bars" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                          </div>
                        </motion.div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <AnimatePresence>
                    {status.status !== "playing" ? (
                      <motion.div
                        className={`game-result-overlay ${
                          status.winner === "w"
                            ? "is-win"
                            : status.winner === "b"
                              ? "is-loss"
                              : "is-draw"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="game-result-particles" aria-hidden="true">
                          {celebrationParticles.map((particle) => (
                            <span
                              key={particle}
                              style={
                                {
                                  "--particle-x": `${(particle % 4) * 22 + 10}%`,
                                  "--particle-delay": `${particle * 0.04}s`,
                                } as CSSProperties
                              }
                            />
                          ))}
                        </div>
                        <motion.div
                          className="game-result-panel"
                          initial={{ opacity: 0, y: 20, scale: 0.94 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 12, scale: 0.98 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                        >
                          <div className="game-result-kicker">
                            <Crown size={14} />
                            {status.status === "checkmate" ? "Match finished" : "Board locked"}
                          </div>
                          <h4>{resultTitle}</h4>
                          <p>{resultCopy}</p>
                          <button
                            type="button"
                            className="game-action-button"
                            onClick={handleRestart}
                          >
                            <RotateCcw size={15} />
                            Play again
                          </button>
                        </motion.div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <div className="game-board">
                    {game.board.map((row, rowIndex) =>
                      row.map((piece, colIndex) => {
                        const square = { row: rowIndex, col: colIndex };
                        const isLightSquare = (rowIndex + colIndex) % 2 === 0;
                        const isSelected =
                          selectedSquare !== null && areSquaresEqual(selectedSquare, square);
                        const isTargetSquare = selectedTargets.has(getSquareKey(square));
                        const isCheckedKing =
                          piece?.type === "k" &&
                          ((piece.color === "w" && whiteKingInCheck) ||
                            (piece.color === "b" && blackKingInCheck));

                        return (
                          <button
                            key={getSquareKey(square)}
                            type="button"
                            className={[
                              "game-square",
                              isLightSquare ? "is-light" : "is-dark",
                              isSelected ? "is-selected" : "",
                              isTargetSquare ? "is-target" : "",
                              isCheckedKing ? "is-check" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            onClick={() => handleSquareClick(rowIndex, colIndex)}
                          >
                            {piece ? (
                              <span
                                className={`game-piece ${
                                  piece.color === "w" ? "is-white" : "is-black"
                                }`}
                              >
                                {getPieceGlyph(piece)}
                              </span>
                            ) : null}
                            {isTargetSquare && !piece ? <span className="game-target-dot" /> : null}
                            {colIndex === 0 ? (
                              <span className="game-rank-label">{8 - rowIndex}</span>
                            ) : null}
                            {rowIndex === 7 ? (
                              <span className="game-file-label">{fileLabels[colIndex]}</span>
                            ) : null}
                          </button>
                        );
                      }),
                    )}
                  </div>
                </div>
              </div>

              <div className="game-side-panel">
                <div className="game-side-card">
                  <div className="game-side-heading">
                    <Crown size={16} />
                    Difficulty
                  </div>
                  <div className="game-difficulty-grid">
                    {difficultyOptions.map((option) => {
                      const Icon = option.icon;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          className={`game-difficulty-card ${
                            difficulty === option.value ? "is-active" : ""
                          }`}
                          onClick={() => setDifficulty(option.value)}
                        >
                          <div className="game-difficulty-top">
                            <Icon size={15} />
                            <span>{option.label}</span>
                          </div>
                          <p>{option.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="game-side-card">
                  <div className="game-side-heading">
                    <Bot size={16} />
                    Match state
                  </div>
                  <div className="game-side-stats">
                    <div className="game-side-stat">
                      <span>You</span>
                      <strong>White</strong>
                    </div>
                    <div className="game-side-stat">
                      <span>Vineeth</span>
                      <strong>Black</strong>
                    </div>
                    <div className="game-side-stat">
                      <span>Turn</span>
                      <strong>{game.turn === "w" ? "White" : "Black"}</strong>
                    </div>
                    <div className="game-side-stat">
                      <span>Pressure</span>
                      <strong>
                        {whiteKingInCheck ? "White in check" : blackKingInCheck ? "Black in check" : "Stable"}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="game-side-card">
                  <div className="game-side-heading">
                    <Sparkles size={16} />
                    Controls
                  </div>
                  <div className="game-controls">
                    <button type="button" className="game-action-button" onClick={handleRestart}>
                      <RotateCcw size={15} />
                      Restart match
                    </button>
                    <button
                      type="button"
                      className="game-action-button is-secondary"
                      onClick={onClose}
                    >
                      <X size={15} />
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
