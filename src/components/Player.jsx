import React, { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName); //Estado que almacena el nombre de los jugadores.
  const [isEditing, setIsEditing] = useState(false); // Estado que maneja si se esta editando el nombre de un jugador.

  //Cambia el estado de la edición.
  function handleEditClick() {
    //Verifica si el campo no está vacío antes de actualizar el nombre.
    if (isEditing && playerName.trim() !== "") {
      onChangeName(symbol, playerName);
    }
    
    //Si el campo esta vació restaura el nombre anterior
    if(isEditing && playerName.trim() === ''){
      setPlayerName(initialName)
    }

    setIsEditing((editing)=> !editing)
  }

  return (
    // Añade la clase "active" si el jugador está activo 
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {/* Campo de edición del nombre si está en modo edición */}
        {isEditing ? (
          <input
            type="text"
            required
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        ) : (
          // Muestra el nombre del jugador si no está en modo edición
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      {/* Botón para alternar entre editar y guardar el nombre */}
      <button onClick={handleEditClick}>
        {isEditing ? "Guardar" : "Editar"}
      </button>
    </li>
  );
}
