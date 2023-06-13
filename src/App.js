import { Route, Routes, BrowserRouter as  Router} from 'react-router-dom';
import './App.css';
import { NavbarP } from './Componentes/BarraNav/navbarP';
import { Inicio } from './Componentes/Pruebas/inicio';
import { Prueba2 } from './Componentes/Pruebas/prueba2';
import { Monitoreo } from './Componentes/Monitoreo/monitoreo';
import { Registros } from './Componentes/Registros/registros';
import { ListadoVehiculos } from './listadovehiculos';
import { MenuCRUD } from './Componentes/TablasCRUD/menuCRUD';
import { EmpresasC } from './Componentes/TablasCRUD/EmpresasCRUD/empresaC';
import { MenuEBuses } from './Componentes/TablasCRUD/BusesCRUD/menuEBuses';
import { BusesC } from './Componentes/TablasCRUD/BusesCRUD/BusesC';
import { MenuETrabajadoresE } from './Componentes/TablasCRUD/TrabajadorCRUD/menuETrabajadores';
import { TrabajadorC } from './Componentes/TablasCRUD/TrabajadorCRUD/trabajadorC';
import { MenuERutas } from './Componentes/TablasCRUD/RutasCRUD/menuERutas';
import { RutasC } from './Componentes/TablasCRUD/RutasCRUD/rutasC';
import { DistritoC } from './Componentes/TablasCRUD/DistritoCRUD/distritoC';
//import { RolesTabla } from './Componentes/TablasCRUD/RolesCRUD/rolesTabla';
import { RolesC } from './Componentes/TablasCRUD/RolesCRUD/rolesC';
import { ParaderosC } from './Componentes/TablasCRUD/ParaderosCRUD/ParaderosC';
import { Login } from './Componentes/Login/login';
import { Ruta1 } from './Componentes/Mapas/ruta1';





function App() {
  return (
    <Router>
      <div className="App">
        <NavbarP />
      </div>
      <Routes>
        <Route exact path='/' element={<Inicio />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/listvehiculos' element={<ListadoVehiculos />}/>
        <Route exact path='/monitoreo' element={<Monitoreo />}/>
        <Route exact path='/prueba2' element={<Prueba2 />}/>
        <Route exact path='/ruta1' element={<Ruta1 />}/>
        <Route exact path='/registros' element={<Registros />}/>
        <Route exact path='/menuCRUD' element={<MenuCRUD />}/>
        <Route exact path='/empresasCRUD' element={<EmpresasC />}/>
        <Route exact path='/trabajadoresCRUD' element={<MenuETrabajadoresE />}/>
        <Route exact path='/distritosCRUD' element={<DistritoC />}/>
        <Route exact path='/paraderosCRUD' element={<ParaderosC />}/>
        <Route exact path='/rutasCRUD' element={<MenuERutas />}/>
        <Route exact path='/menuBuses' element={<MenuEBuses />}/>
        <Route exact path='/rutasxemp/:id_emp' element={<RutasC />}/>
        <Route exact path='/busesxemp/:id_emp' element={<BusesC />}/>
        <Route exact path='/trabajadoresxemp/:id_emp' element={<TrabajadorC />}/>
        <Route exact path='/rolesCRUD' element={<RolesC />}/>
      </Routes>
    </Router>

  );
}

export default App;
