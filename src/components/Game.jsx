import './Game.css';
import { useState, useEffect } from 'react'; 
import { validarPalabra } from '../services/api';
import { useNavigate } from 'react-router';

const Game = () => {

  const [estadoDelJuego, setEstadoDelJuego] = useState('inicio'); // El estado puede ser 'inicio', 'jugando' o 'finalizado' 
  const [tiempoRestante, setTiempoRestante] = useState(3); 
  const [puntaje, setPuntaje] = useState(0); 
  const [palabraActual, setPalabraActual] = useState(''); 
  const [palabrasUsadas, setPalabrasUsadas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (estadoDelJuego !== 'jugando') return;

    if (tiempoRestante === 0) {
      navigate('/end', { 
        state: { 
          puntaje: puntaje, 
          palabrasEncadenadas: palabrasUsadas.length 
        } 
      });
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
      if(data.exists) {
        setPalabrasUsadas([...palabrasUsadas, palabraLimpia]);
        setPuntaje(puntaje + palabraLimpia.length);
        setTiempoRestante(3);
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

  return (
    <div className="h-100 align-items-center justify-content-center d-flex flex-column">
      <div className='w-50 d-flex align-items-center justify-content-between mb-4'>
        <div className='fs-3 text-muted'>Puntaje: <span className='text-black fs-2'>{puntaje}</span></div>
        <div className='fs-3 text-muted'>Tiempo: <span className={tiempoRestante <= 5 ? 'text-danger fw-bold fs-2' : 'text-black fs-2'}>{tiempoRestante}s</span></div>
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
      {error && <div className='text-danger text-start mt-2 ms-2 w-25'>{error}</div>}
      
      {palabrasUsadas.length > 0 && (
        <div className='mt-5 w-75 mx-auto'>
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
  );
}

export default Game;