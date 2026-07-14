export const obtenerLeaderboard = () => {
  return JSON.parse(localStorage.getItem('leaderboard')) || [];
};

export const agregarPuntaje = (puntaje) => {
  localStorage.setItem('leaderboard', puntaje);
};
