import './App.css';
import Home from './Components/Home'
import Admin from './Components/Admin'
import User from './Components/User'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} exact={true} />
        <Route path="/admin" element={<Admin />} exact={true} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
