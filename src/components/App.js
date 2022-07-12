import { Route, Routes } from 'react-router-dom';
import '../styles/main.scss';
import Landing from './Landing';
import Specialized from './Specialized';
import Modality from './Modality';
import Rates from './Rates';
import Data from './Data';
import Address from './Address';
import Payment from './Payment';
import Final from './Final';
import NotFound from './Notfound';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/Specialized" element={<Specialized />} />
        <Route path="/Modality" element={<Modality />} />
        <Route path="/Rates" element={<Rates />} />
        <Route path="/Data" element={<Data />} />
        <Route path="/Address" element={<Address />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
