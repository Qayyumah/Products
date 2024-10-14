import './App.css';
import AddProducts from './components/AddProducts';
import Ecommerce from './components/Ecommerce';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Read from './components/Read';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Ecommerce/>}/>
          <Route exact path='/add' element={<AddProducts/>}/>
          <Route exact path='/read' element={<Read/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
