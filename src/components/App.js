import { Route, Routes } from 'react-router-dom';
import '../styles/main.scss';
import Landing from './Landing';
import Specialized from './Specialized';
import NotFound from './Notfound';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />} />

        <Route path="*" element={<Specialized />} />
      </Routes>
    </>
  );
}

export default App;
