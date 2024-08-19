import React from "react";

//Muestra un mensaje de fin del juego con una felicitación si hay un ganador, o un mensaje de empate si no lo hay.
export default function GameOver({ winner, onResart }) {
  return (
    <div id="game-over">
      <h2>Fin del Juego</h2>
      {winner &&<p>Felicidades, {winner} ganaste el juego!</p>}
      {!winner &&<p>Empate</p>}
      <p>
        <button onClick={onResart}>Jugar de Nuevo</button>
      </p>
    </div>
  );
}
