import React from 'react';
import { Inicio } from './Componentes/Pruebas/inicio';
import { Prueba2 } from './Componentes/Pruebas/prueba2';
import { Monitoreo } from './Componentes/Monitoreo/monitoreo';
import { Registros } from './Componentes/Registros/registros';
import { ListadoVehiculos } from './listadovehiculos';
import { MenuCRUD } from './Componentes/menuCRUD';
import { EmpresasC } from './Componentes/TablasCRUD/EmpresasCRUD/empresaC';
import { MenuEBuses } from './Componentes/TablasCRUD/BusesCRUD/menuEBuses';
import { BusesC } from './Componentes/TablasCRUD/BusesCRUD/BusesC';
import { MenuETrabajadoresE } from './Componentes/TablasCRUD/TrabajadorCRUD/menuETrabajadores';
import { TrabajadorC } from './Componentes/TablasCRUD/TrabajadorCRUD/trabajadorC';
import { MenuERutas } from './Componentes/TablasCRUD/RutasCRUD/menuERutas';
import { RutasC } from './Componentes/TablasCRUD/RutasCRUD/rutasC';
import { DistritoC } from './Componentes/TablasCRUD/DistritoCRUD/distritoC';
import { RolesC } from './Componentes/TablasCRUD/RolesCRUD/rolesC';
import { ParaderosC } from './Componentes/TablasCRUD/ParaderosCRUD/ParaderosC';
import { Login } from './Componentes/Login/login';
import { Ruta1 } from './Componentes/Mapas/ruta1';
import { ParaderosMapa } from './Componentes/TablasCRUD/ParaderosCRUD/paraderosMapa';
import { ParaderoXRutaTabla } from './Componentes/TablasCRUD/ParaderosXRuta/paraderoXRutaTabla';
import { BusesMapa } from './Componentes/TablasCRUD/BusesCRUD/BusesMapa/busesMapa';

export const routes = [
  
  { path: '/', component: <Inicio /> },
  { path: '/login', component: <Login /> },

  { path: '/listvehiculos', component: <ListadoVehiculos /> },
  { path: '/monitoreo', component: <Monitoreo /> },
  { path: '/prueba2', component: <Prueba2 /> },
  { path: '/ruta1', component: <Ruta1 /> },
  { path: '/registros', component: <Registros /> },
  { path: '/menuCRUD', component: <MenuCRUD /> },
  { path: '/empresasCRUD', component: <EmpresasC /> },
  { path: '/trabajadoresCRUD', component: <MenuETrabajadoresE /> },
  { path: '/distritosCRUD', component: <DistritoC /> },
  { path: '/paraderosCRUD', component: <ParaderosC /> },
  { path: '/rutasCRUD', component: <MenuERutas /> },
  { path: '/menuBuses', component: <MenuEBuses /> },
  { path: '/rutasxemp/:id_emp', component: <RutasC /> },
  { path: '/busesxemp/:id_emp', component: <BusesC /> },
  { path: '/trabajadoresxemp/:id_emp', component: <TrabajadorC /> },
  { path: '/rolesCRUD', component: <RolesC /> },
  { path: '/paraderoxmap/:nombre/:longitud/:latitud', component: <ParaderosMapa /> },
  { path: '/paraderoxruta/:ruta', component: <ParaderoXRutaTabla /> },

  { path: '/listadoBuses/:dts/:rt', component: <BusesMapa /> },
];
