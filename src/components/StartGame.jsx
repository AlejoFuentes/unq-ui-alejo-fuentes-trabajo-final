import './StartGame.css';
import { useNavigate } from 'react-router';

const StartGame = () => {
  
  const navigate = useNavigate();

  return (
    <div className='h-100 align-items-center justify-content-center d-flex flex-column'>
      <h1 className='mb-5 fw-bold'>* Palabras Encadenadas *</h1>
      <div className='d-flex text-center'>
        <p>Formá la cadena de palabras más larga posible antes de que se acabe el tiempo! <br />
          Tenés <strong>15 segundos</strong> para ingresar una palabra que empiece con la última letra de la palabra anterior. <br />
        </p>
      </div>
      <h2 className='mt-3'>¿Estás listo para jugar?</h2>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/game')}>
        Comenzar Partida
      </button>
    </div>
  );
}

export default StartGame;