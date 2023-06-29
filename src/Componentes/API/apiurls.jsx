// URL base común
const baseURL = "http://localhost:8080/api";
//const baseURL = "http://181.224.251.187:8081/api";
//const baseURL = "http://192.168.0.214:8081/api";

// Rutas específicas
 
//Buses
export const busesURL = `${baseURL}/buses`;
export const busesPosURL = `${baseURL}/buses/pos`;
export const busesTURL = `${baseURL}/buses/busxempT`;
export const busesHURL = `${baseURL}/buses/busxempH/1`;
export const busesDURL = `${baseURL}/buses/busxempH/0`;
export const busesListado = `${baseURL}/buses/vista`;

//Distritos
export const distritosURL = `${baseURL}/distritos`;
export const distritosHURL = `${baseURL}/distritos/disH/1`;
export const distritosDURL = `${baseURL}/distritos/disH/0`;


//Distritos
export const trabajadorURL = `${baseURL}/trabajadores`;
export const trabajadorTURL = `${baseURL}/trabajadores/trabajadoresxEmpT`;
export const trabajadorHURL = `${baseURL}/trabajadores/trabajadoresxEmpH/1`;
export const trabajadorDURL = `${baseURL}/trabajadores/trabajadoresxEmpH/0`;

//Empresas
export const empresasURL = `${baseURL}/empresa`;
export const empresasHURL = `${baseURL}/empresa/empresasH/1`;
export const empresasDURL = `${baseURL}/empresa/empresasH/0`;

//Paraderos
export const paraderosURL = `${baseURL}/paraderos`;
export const paraderosHURL = `${baseURL}/paraderos/parH/1`;
export const paraderosDURL = `${baseURL}/paraderos/parH/0`;
 
//Roles
export const rolesURL = `${baseURL}/roles`;
export const rolesHURL = `${baseURL}/roles/disH/1`;
export const rolesDURL = `${baseURL}/roles/disH/0`;

//Rutas
export const rutasURL = `${baseURL}/rutas`;
export const rutasTURL = `${baseURL}/rutas/rutasXEmpT`;
export const rutasHURL = `${baseURL}/rutas/rutasXEmpH`;
export const rutasDURL = `${baseURL}/rutas/rutasXEmpD`;
 