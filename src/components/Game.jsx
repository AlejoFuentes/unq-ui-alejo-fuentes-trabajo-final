import EndGame from './EndGame'
import { useState, useEffect, useRef } from 'react'; 
import { validarPalabra } from '../services/api';
import { useNavigate } from 'react-router';
import { guardarPuntaje } from '../services/leaderboard';

const Game = () => {

  const [estadoDelJuego, setEstadoDelJuego] = useState('inicio'); // El estado puede ser 'inicio', 'jugando' o 'finalizado' 
  const [tiempoRestante, setTiempoRestante] = useState(15); 
  const [puntaje, setPuntaje] = useState(0); 
  const [palabraActual, setPalabraActual] = useState(''); 
  const [palabrasUsadas, setPalabrasUsadas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const juegoTerminadoRef = useRef(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (estadoDelJuego !== 'jugando') return;

    if (tiempoRestante === 0) {
      guardarPuntaje(puntaje, palabrasUsadas.length);
      juegoTerminadoRef.current = true;
      setEstadoDelJuego('finalizado');
      return;
    }

    const timer = setInterval(() => {
      setTiempoRestante((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [tiempoRestante, estadoDelJuego, navigate, puntaje, palabrasUsadas.length]);

  const handleIngresarPalabra = async (e) => {
    e.preventDefault();

    if (loading) return;

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
        setError(`La palabra debe empiezar con la letra '${ultimaLetra.toUpperCase()}'.`);
        return;
      }
    }

    setLoading(true);

    try {
      const data = await validarPalabra(palabraLimpia);

      if (juegoTerminadoRef.current) {
          return; 
      }

      if(data.exists) {
        setPalabrasUsadas([...palabrasUsadas, palabraLimpia]);
        setPuntaje(puntaje + palabraLimpia.length);
        setTiempoRestante(15);
        setEstadoDelJuego('jugando');
        setPalabraActual('');
        setError('');
      } else {
        setError('Esa palabra no es válida.');
      }
    } catch (error) {
      setError("Error al validar la palabra.");
    } finally {
      setLoading(false);
    }
  }

  const reiniciarPartida = () => {
    juegoTerminadoRef.current = false;
    setEstadoDelJuego('inicio');
    setTiempoRestante(15);
    setPuntaje(0);
    setPalabrasUsadas([]);
    setPalabraActual('');
    setError('');
  };

  return (
    <>
      {estadoDelJuego === 'finalizado' ? (
        <EndGame 
          puntaje={puntaje} 
          palabrasEncadenadas={palabrasUsadas.length} 
          volverAJugar={reiniciarPartida} 
        />
      ) : (
      <div className="h-100 align-items-center justify-content-center d-flex flex-column">
        <div className='w-100 px-3 mx-auto d-flex align-items-center justify-content-between mb-4' style={{ maxWidth: '600px' }}>
          <div className='fs-3 text-muted'>
            <i className="bi bi-star-fill text-warning me-2"></i>
            Puntaje <br />
            <span className='d-flex justify-content-center text-black fs-2'>{puntaje}</span>
          </div>
          <div className='fs-3 text-muted'>
            <i className="bi bi-stopwatch text-black me-2"></i>
            Tiempo <br />
            <span className={tiempoRestante <= 5 ? 'text-danger d-flex justify-content-center fw-bold fs-2' : 'text-black d-flex justify-content-center fs-2'}>{tiempoRestante}s</span>
          </div>
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

        <form className="d-flex gap-2 mt-4 w-100 px-3 mx-auto" style={{ maxWidth: '500px' }} onSubmit={handleIngresarPalabra}>
          <input 
            className='form-control input-palabra shadow'
            type="text" 
            value={palabraActual}
            onChange={(e) => setPalabraActual(e.target.value)}
            placeholder="Escribí una palabra..."
            />
          <button className='btn btn-primary shadow' type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
        <div className='text-danger text-start mt-2 px-3 w-100 mx-auto' style={{ maxWidth: '500px', minHeight: '24px' }}>
          {error}
        </div>
        
        {palabrasUsadas.length > 0 && (
          <div className='mt-5 w-100 px-3 mx-auto' style={{ maxWidth: '800px' }}>
            <div className='text-center m-1 fs-4 mb-3'>Palabras Encadenadas:</div>

            <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 text-muted fs-5">
              {palabrasUsadas.map((palabra, index) => (
                <div key={index} className="d-flex align-items-center">
                  <span>{palabra.toUpperCase()}</span>
                  {index < palabrasUsadas.length - 1 && (
                    <span className="ms-2">-&gt;</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      )}
    </>
  );  
} 

export default Game;