import { Routes, Route, Navigate } from 'react-router';
import StartGame from './components/StartGame';
import Game from './components/Game';
import EndGame from './components/EndGame';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<StartGame />} />
        <Route path="/game" element={<Game />} />
        <Route path="/end" element={<EndGame />} />
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
  );
};

export default App;