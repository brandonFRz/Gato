import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS";
import GameOver from "./components/GameOver";

//Tablero de juego Inicial con una matriz de 3X3
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

//Nombres Iniciales de los jugadores
let INITIAL_PLAYERS_NAME = {
  X: "Player 1",
  O: "Player 2",
};

//Función que determina cual es el jugador activo en función a los turnos anteriores 
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  //Estado que almacena los turnos del juego
  const [gameTurns, setGameTurns] = useState([]);
  //Estado que almacena el nombre de los jugadores
  const [players, setPlayers] = useState(INITIAL_PLAYERS_NAME);

  const activePlayer = deriveActivePlayer(gameTurns);
  let winner;

  //Se hace una copia del tablero original para aplicar los turnos de los jugadores
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  //Rellena el tablero con los turnos realizados
  for (const turn of gameTurns) {
    const { square, player } = turn; // player almacena el símbolo del jugador 'X','O'.
    const { row, col } = square; // square almacena la posición que eligió el jugador.

    gameBoard[row][col] = player;
  }

  // Comprobación de combinaciones ganadoras.
  WINNING_COMBINATIONS.forEach((combination) => {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

  // Si hay una combinación ganadora, se establece el ganador
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  });
  // O si pasan 9 turnos si ganador se declara empate.
  const hasDraw = gameTurns.length === 9 && !winner;

  // Maneja la selección de una casilla en el tablero
  function handleSelectSquare(rowIndex, columnIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      // Agrega el nuevo turno al estado
      const updateTurns = [
        { square: { row: rowIndex, col: columnIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updateTurns;
    });
  }

  //Reinicia el juego al comenzar una revancha.
  function handleRematch() {
    setGameTurns([]);
  }

  //Maneja el cambio de nombre de los jugadores.
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">

          {/* Lista de jugadores */}
          <Player
            initialName={INITIAL_PLAYERS_NAME.X}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={INITIAL_PLAYERS_NAME.O}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>

        {/* Muestra la pantalla del fin de juego si hay un ganador */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onResart={handleRematch} />
        )}

        {/* Tablero del juego */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      
      {/* Registro de turnos del juego */}
      <Log turns={gameTurns} playerName={players} />
    </main>
  );
}

export default App;
