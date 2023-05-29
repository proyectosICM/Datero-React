import { Route, Routes, BrowserRouter as  Router} from 'react-router-dom';
import './App.css';
import { NavbarP } from './Componentes/BarraNav/navbarP';
import { Inicio } from './Componentes/Pruebas/inicio';
import { Prueba2 } from './Componentes/Pruebas/prueba2';
import { Prueba3 } from './Componentes/Pruebas/prueba3';
import { Monitoreo } from './Componentes/Monitoreo/monitoreo';


function App() {
  return (
    <Router>
      <div className="App">
        <NavbarP />

      </div>
      <Routes>
        <Route exact path='/' element={<Inicio />} />
        <Route exact path='/monitoreo' element={<Monitoreo />}/>
        <Route exact path='/prueba2' element={<Prueba2 />}/>
        <Route exact path='/prueba3' element={<Prueba3 />}/>
      </Routes>
    </Router>

  );
}

export default App;
