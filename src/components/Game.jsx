import './Game.css';
import { useState, useEffect } from 'react'; 

const Game = () => {

    const [gameState, setGameState] = useState('inicio'); // El estado puede ser 'inicio', 'jugando' o 'finalizado' 
  return (
    <div className="game-container">
        <div className="game-header">Game Header</div>
        <div className="game-content">Game Content</div>
    </div>
  );
}

export default Game;