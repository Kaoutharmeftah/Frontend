import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './components/register';
import Login from './components/login';

function App() {
  return (
    <div>
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />}/>
    </Routes>
    </div>
  );
}

export default App;