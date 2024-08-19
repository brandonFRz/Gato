//Muestra un registro con la lista de jugadas realizadas por cada jugador
export default function Log({ turns, playerName }) {
  return (
    <ol id="log">
      <p>Registro de jugadas</p>

      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          
          {playerName[turn.player]} seleccionó la (Fila: {turn.square.row}, 
           Columna: {turn.square.col})
        </li>
      ))}
    </ol>
  );
}
