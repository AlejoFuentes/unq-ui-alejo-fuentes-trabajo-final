import './EndGame.css';
import { useNavigate, useLocation } from 'react-router';

const EndGame = () => {

    const location = useLocation();
    const navigate = useNavigate();
    
    const puntaje = location.state?.puntaje || 0;
    const palabrasEncadenadas = location.state?.palabrasEncadenadas || 0;
    

    return (
        <div className="h-100 align-items-center justify-content-center d-flex flex-column">
            <h1 className='mb-5 text-danger'>¡Te quedaste sin tiempo!</h1>
            <h5>Puntaje Final: <span className='fw-bold'>{puntaje}</span></h5>
            <h5>Lograste encadenar <span className='fw-bold'>{palabrasEncadenadas}</span> palabras!</h5>
            <button className='btn btn-primary mt-4' onClick={() => navigate('/game')}>
                Jugar de nuevo
            </button>
        </div>
    );
}

export default EndGame;