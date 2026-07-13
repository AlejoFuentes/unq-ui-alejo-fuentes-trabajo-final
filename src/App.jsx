import { BrowserRouter, Routes, Route } from 'react-router';
import StartGame from './components/StartGame';
import Game from './components/Game';
import EndGame from './components/EndGame';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartGame />} />
        <Route path="/game" element={<Game />} />
        <Route path="/end" element={<EndGame />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;