import { BrowserRouter, Routes, Route } from 'react-router';

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