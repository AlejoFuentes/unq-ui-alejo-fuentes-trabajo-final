import { useState, useEffect } from 'react';
import { obtenerLeaderboard } from '../services/storage'; 

const EndGame = ({ puntaje, palabrasEncadenadas, volverAJugar }) => {
    
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        setLeaderboard(obtenerLeaderboard());
    }, []);

    return (
        <div className="min-vh-100 align-items-center justify-content-center d-flex flex-column py-5">
            <i className="bi bi-alarm mb-3" style={{ fontSize: '50px'}}></i>
            <h1 className='mb-4 text-danger fw-bold'>¡Te quedaste sin tiempo!</h1>
            <h4 className='text-muted'>Puntaje Final:<span className='text-black fw-bold fs-2 ms-2'>{puntaje}</span></h4>
            <h5 className='text-muted mt-2'>Lograste encadenar <span className='text-black fw-bold'>{palabrasEncadenadas}</span> palabras!</h5>
            
            <button className='btn btn-primary btn-lg mt-4 shadow px-4' onClick={volverAJugar}>
                <i className="bi bi-arrow-repeat me-2"></i> Jugar de nuevo
            </button>

            {/* <-- LEADERBOARD --> */}
            {leaderboard.length > 0 && (
                <div className="w-100 mt-5" style={{ maxWidth: '500px' }}>
                    <h4 className="text-center text-secondary mb-3">
                        <i className="bi bi-trophy-fill text-warning me-2"></i> Top 10 Histórico
                    </h4>
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-0">
                            <table className="table table-hover table-borderless mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th className="text-center">Puntaje</th>
                                        <th className="text-center">Palabras</th>
                                        <th className="text-center">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboard.map((registro, index) => (
                                        <tr key={index}>
                                            <td className="text-center fw-bold text-muted">{index + 1}</td>
                                            <td className="text-center fw-bold text-primary">{registro.puntaje}</td>
                                            <td className="text-center">{registro.palabras}</td>
                                            <td className="text-center text-muted fs-6">{registro.fecha}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EndGame;