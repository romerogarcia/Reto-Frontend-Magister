import { Route, Routes } from 'react-router-dom';
import '../styles/main.scss';
import Landing from './Landing';
import Specialized from './Specialized';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/" element={<Specialized />} />
      </Routes>
    </>
  );
}

export default App;
