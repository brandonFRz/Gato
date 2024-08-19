
export default function GameBoard({ onSelectSquare, board }) {

  return (
    <div>
      <ol id="game-board">
        {/* Contenedor principal del tablero */}
        {board.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {/* Mapeo de las columnas en cada fila */}
              {row.map((column, columnIndex) => (
                <li key={columnIndex}>
                  {/* Botón que representa cada casilla del tablero */}
                  <button
                    onClick={() => onSelectSquare(rowIndex, columnIndex)}
                    disabled={column !== null}
                  >
                    {/* Muestra el símbolo del jugador en la casilla (X , O) */}
                    {column}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
}
