import './Game.css';
import { useState, useEffect } from 'react'; 
import { validarPalabra } from '../services/api';

const Game = () => {

  const [gameState, setGameState] = useState('inicio'); // El estado puede ser 'inicio', 'jugando' o 'finalizado' 
  const [tiempoRestante, setTiempoRestante] = useState(15); 
  const [puntaje, setPuntaje] = useState(0); 
  const [palabraActual, setPalabraActual] = useState(''); 
  const [palabrasUsadas, setPalabrasUsadas] = useState([]);
  const [error, setError] = useState('');
  
  const handleIngresarPalabra = async (e) => {
    e.preventDefault();
    const palabraLimpia = palabraActual.trim().toLowerCase();
    if (palabraLimpia === '') {
      setError('Por favor, ingresa una palabra.');
      return;
    }

    if (palabrasUsadas.includes(palabraLimpia)) {
      setError('La palabra ya fue utilizada.');
      return;
    }

    if (palabrasUsadas.length > 0) {
      const ultimaPalabra = palabrasUsadas[palabrasUsadas.length - 1];
      const ultimaLetra = ultimaPalabra.slice(-1);
      const primeraLetra = palabraLimpia.charAt(0);

      if (primeraLetra !== ultimaLetra) {
        setError(`La palabra debe empiezar con la letra '${ultimaLetra}'.`);
        return;
      }
    }

    try {
      const data = await validarPalabra(palabraLimpia);
      if(data.exists) {
        setPalabrasUsadas([...palabrasUsadas, palabraLimpia]);
        setPuntaje(puntaje + palabraLimpia.length);
        setTiempoRestante(15);
        setPalabraActual('');
        setError('');
      } else {
        setError('La palabra no es válida.');
      }
    } catch (error) {
      setError("Error al validar la palabra.");
    }
  }

  return (
    <div className="h-100 align-items-center justify-content-center d-flex flex-column">
      <div className='w-50 d-flex align-items-center justify-content-between mb-4'>
        <div className='fs-3 text-muted'>Puntaje: <span className='text-black'>{puntaje}</span></div>
        <div className='fs-3 text-muted'>Tiempo: <span className='text-black'>{tiempoRestante}s</span></div>
      </div>

        {palabrasUsadas && palabrasUsadas.length > 0 ? (
          <div>
            <p className='text-center text-muted m-1'>Ultima Palabra:</p>
            <h2 className='text-center fw-bold mb-4'>{palabrasUsadas[palabrasUsadas.length - 1].toUpperCase()}</h2>
            <div className='text-center'>La siguiente palabra debe empezar con la letra: <span className='fw-bold fs-3'>{palabrasUsadas[palabrasUsadas.length - 1] ? palabrasUsadas[palabrasUsadas.length - 1].slice(-1).toUpperCase() : 'Ninguna'}</span></div>
          </div>
        ) : (
          <h3 className='text-center my-4'>
            Ingresá una palabra para comenzar el juego!
          </h3>
        )}

      <form className="d-flex gap-2 mt-4 w-25" onSubmit={handleIngresarPalabra}>
        <input 
          className='form-control'
          type="text" 
          value={palabraActual}
          onChange={(e) => setPalabraActual(e.target.value)}
          placeholder="Escribí una palabra..."
          />
        <button className='btn btn-primary' type="submit">Enviar</button>
      </form>
      {error && <div className='text-danger mt-2 text-start'>{error}</div>}
      
    </div>
  );
}

export default Game;