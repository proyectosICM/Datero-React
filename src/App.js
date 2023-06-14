import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Componentes
import  NavbarP  from './Componentes/BarraNav/navbarP';


// Rutas
import { routes } from './routes';

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarP />
      </div>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} exact path={route.path} element={route.component} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;

