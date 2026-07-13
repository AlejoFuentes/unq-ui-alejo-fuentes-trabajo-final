import './Game.css';
import { useState, useEffect } from 'react'; 

const Game = () => {

  const [gameState, setGameState] = useState('inicio'); // El estado puede ser 'inicio', 'jugando' o 'finalizado' 
  const [tiempoRestante, setTiempoRestante] = useState(15); 
  const [puntaje, setPuntaje] = useState(0); 
  const [palabraActual, setPalabraActual] = useState(''); 
  const [palabrasUsadas, setPalabrasUsadas] = useState([]);
  
  return (
    <div className="h-100 align-items-center justify-content-center d-flex flex-column">
      <div className='w-50 d-flex align-items-center justify-content-between mb-4'>
        <div className='fs-3'>Puntaje: {puntaje}</div>
        <div className='fs-3'>Tiempo: {tiempoRestante}s</div>
      </div>

      <div className="">
        <h4 className='text-center'>Ultima Palabra:</h4>
        <p className='text-center'>{palabrasUsadas[palabrasUsadas.length - 1] || 'Ninguna'}</p>
        <p className='text-center'>La siguiente palabra debe empezar con la letra: {palabrasUsadas[palabrasUsadas.length - 1] ? palabrasUsadas[palabrasUsadas.length - 1].slice(-1).toUpperCase() : 'Ninguna'}</p>
      </div>

      <form className="d-flex gap-2 mt-3">
        <input 
          className='form-control'
          type="text" 
          value={palabraActual}
          onChange={(e) => setPalabraActual(e.target.value)}
          placeholder="Ingresá una palabra..."
          />
        <button className='btn btn-primary' type="submit">Enviar</button>
      </form>
      
    </div>
  );
}

export default Game;