import { obtenerLeaderboard, agregarPuntaje } from './storage';

export const guardarPuntaje = (puntaje, palabras) => {
  if (puntaje === 0) return;

  const nuevoRegistro = { 
    puntaje: puntaje, 
    palabras: palabras, 
    fecha: new Date().toLocaleDateString() 
  };

  const leaderboard = obtenerLeaderboard();
  
  leaderboard.push(nuevoRegistro);

  leaderboard.sort((a, b) => b.puntaje - a.puntaje);

  const top10 = leaderboard.slice(0, 10);

  agregarPuntaje(JSON.stringify(top10));
};