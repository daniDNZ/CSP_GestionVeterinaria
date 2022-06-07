# CSP_GestionVeterinaria
Proyecto final bootcamp CodeSpace.

El proyecto se compone de un front con un LandPage y el CRM "turdus", y de una API creada en symfony en el back.

La plataforma "turdus" está pensada para gestionar clientes, pacientes y visitas de una clínica veterinaria.

Identificándote desde la LandPage con un usuario del STAFF, accederás automáticamente a la plataforma de gestión de pacientes y visitas "turdus".

## Getting Started
Con estas instrucciones puedes hacer funcionar tanto el frontend como el backend en tu equipo.

### Prerrequisitos
- Frontend:
  - Node + npm.
- Backend: 
  - Servidor con PHP + MySQL (p.e. XAMPP).

### Instalación
- React: 
  - Puedes utilizar `npm install` para instalar las dependencias desde `f_end/turdus`.
  - En `src/global.js` puedes cambiar la url de las peticiones a la API (por defecto está localhost), modificando la propiedad del objeto `global.apiUri`.
  - Con `npm start` puedes iniciar el servidor de desarrollo.

- Symfony:
  - Puedes utilizar `composer install` desde `b_end/turdus`.
  - Después puedes abrir el servidor con el comando `php -S localhost:8888 -t public/`.
  - Puedes modificar la conexión a la base de datos en .env.

- MySQL:
  - Puedes importar la base de datos creando una nueva ('turdus') e importando el archivo `b_end/turdus.sql`.

### Usuario Administrador
Usuario con el que puedes identificarte, explorar las características de 'turdus' y crear o borrar usuarios miembros del STAFF. 

- Email/Username: `Admin`
- Pass:           `Admin`

## API: Endpoints y métodos.
A continuación una lista de los endpoints de la API con sus respectivos métodos, ordenados por controladores y empezando por el login. Toda la información se envía y recibe en formato JSON excepto algunos formularios que se enviarán con un objeto FormData (se especificará en su apartado). Las variables como `id` o `paid` son propiedades del objeto a enviar. Los parámetros son representados entre llaves: `{id}`.

Para ver cómo funcionan los endpoints en detalle acudir al controlador específico en `b_end/turdus/src/Controller/ControladorABuscarController.php`.

### Login

- Método: POST.
- Endpoint: `/api/login_check`.
- Respuesta: JWT Token.

El Token será necesario para todas las peticiones que se hagan en el CRM, ya que se necesita un rol 'STAFF' para operar en él.

### BillController.php -> Información sobre tickets y deudas.
<details><summary>MOSTRAR</summary>

| Endpoint                     | Método | Body                                                                  | Parámetros               | Respuesta                            |
| ---------------------------- | ------ | --------------------------------------------------------------------- | ------------------------ | ------------------------------------ |
| `/api/bill/find`             | POST   | `visit_id`->ID visita                                                 | X                        | Info del ticket                      |
| `/api/customer/{id}/debt`    | GET    | X                                                                     | `{id}` -> ID del cliente | Los tickets sin pagar con sus deudas |
| `/api/customer/{id}/debt/pay`| POST   | `paid`->Cantidad pagada                                               | `{id}` -> ID del cliente | Devuelve la deuda restante           |
| `/api/bill/update`           | POST   | `id`->ticket, `paid`->cantidad pagada                                 | X                        | Devuelve el ticket                   |
| `/api/bill/add`              | POST   | `visit_id`->ID visita, `paid`->cantidad pagada, `amount`-> suma total | X                        | Devuelve el ticket                   |

</details>

### ContactFormController.php -> Crea, elimina o muestra los mensajes del formulario de contacto.
<details><summary>MOSTRAR</summary>

| Endpoint                         | Método | Body                                 | Parámetros                     | Respuesta                      |  
| -------------------------------- | ------ | ------------------------------------ | ------------------------------ | ------------------------------ |
| `api/contact_form/{currentPage}` | GET    | X                                    | `{currentPage}`->página actual | [`data`,`maxPages`,`thisPage`] |        
| `api/contact_form/add`           | POST   | FormData -> `email`,`message`,`date` | X                              | Mensaje de éxito               | 
| `api/contact_form/remove/{id}`   | GET    | X                                    | `{id}`-> ID mensaje            | Mensaje de éxito               |

</details>

### CustomersController.php -> Lista, elimina, actualiza clientes y sus datos.
<details><summary>MOSTRAR</summary>

| Endpoint                         | Método | Body                                 | Parámetros                     | Respuesta                      |  
| -------------------------------- | ------ | ------------------------------------ | ------------------------------ | ------------------------------ |
| `/api/{currentPage}/customers`   | POST   | Info del formulario de búsqueda      | `{currentPage}`->página actual | Clientes paginados y filtrados |        
| `/api/{currentPage}/customers`   | GET    | X                                    | `{currentPage}`->página actual | Clientes paginados             |  
| `/api/customers/get_current`     | POST   | `email`                              | X                              | Info breve del cliente         |
| `/api/customers/{id}`            | GET    | X                                    | `{id}`-> ID del cliente        | Info expandida del cliente     |
| `/api/customer/update`           | POST   | `id` + registros a modificar         | X                              | Info del cliente modificado    |  
| `/api/customer/add`              | POST   | Info del nuevo cliente               | X                              | Info del nuevo cliente         |  
| `/api/customers/{id}/remove`     | GET    | X                                    | `{id}`-> ID del cliente        | Info del cliente               |
  
</details>

### PatientsController.php -> Lista, elimina, actualiza pacientes y sus datos.
<details><summary>MOSTRAR</summary>

| Endpoint                         | Método | Body                                 | Parámetros                     | Respuesta                       |  
| -------------------------------- | ------ | ------------------------------------ | ------------------------------ | ------------------------------- |
| `/api/{currentPage}/patients`    | POST   | Info del formulario de búsqueda      | `{currentPage}`->página actual | Pacientes paginados y filtrados |        
| `/api/{currentPage}/patients`    | GET    | X                                    | `{currentPage}`->página actual | Pacientes paginados             |  
| `/api/patients/{id}`             | GET    | X                                    | `{id}`-> ID del paciente       | Info del paciente               |
| `/api/customers/{id}/patients`   | GET    | X                                    | `{id}`-> ID del cliente        | Pacientes a nombre del cliente  |  
| `/api/patient/update`            | POST   | `id` + registros a modificar         | X                              | Info del paciente modificado    |  
| `/api/patient/add`               | POST   | Info del nuevo paciente              | X                              | Info del nuevo paciente         |  
| `/api/patients/{id}/remove`      | GET    | X                                    | `{id}`-> ID del paciente       | Paciente eliminado              |
  
</details>

### PostalCodeController.php -> Lista, elimina, actualiza códigos postales y sus datos.
<details><summary>MOSTRAR</summary>

| Endpoint                                   | Método | Body                                     | Parámetros                     | Respuesta                         |  
| ------------------------------------------ | ------ | ---------------------------------------- | ------------------------------ | --------------------------------- |
| `/api/postal_code`                         | GET    | X                                        | X                              | Todos los códigos postales        |        
| `/api/postal_code/{id}`                    | GET    | X                                        | `{id}`->ID del código postal   | Info del código postal            |        
| `/api/postal_codes/paginate/{currentPage}` | GET    | X                                        | `{currentPage}`->página actual | Códigos postales paginados        |  
| `/api/postal_code/update`                  | POST   | FormData ->`pc` + registros a modificar  | X                              | Info del código postal modificado |  
| `/api/postal_code/add`                     | POST   | FormData -> Info del nuevo código postal | X                              | Info del nuevo código postal      |  
| `/api/postal_code/{id}/remove`             | GET    | X                                        | `{id}`-> ID del código postal  | Código postal eliminado           |
  
</details>

### ProductsController.php -> Lista, elimina, actualiza productos y sus datos.
<details><summary>MOSTRAR</summary>

| Endpoint                                   | Método | Body                                      | Parámetros                     | Respuesta                         |  
| ------------------------------------------ | ------ | ----------------------------------------- | ------------------------------ | --------------------------------- |
| `/api/products/{id}`                       | GET    | X                                         | `{id}`->ID del producto        | Info del producto                 |        
| `/api/products/{currentPage}/filter`       | POST   | Info del formulario de búsqueda           | `{currentPage}`->página actual | Productos paginados y filtrados   |  
| `/api/products/update`                     | POST   | FormData ->`code` + registros a modificar | X                              | Info del producto modificado      |  
| `/api/products/add`                        | POST   | FormData -> Info del nuevo producto       | X                              | Info del nuevo producto           |  
| `/api/products/{id}/remove`                | GET    | X                                         | `{id}`-> ID del producto       | Producto eliminado                |
  
</details>

### ProductsLogController.php -> Asocia los productos al ticket correspondiente.
<details><summary>MOSTRAR</summary>

| Endpoint                | Método | Body                                                        | Parámetros | Respuesta                               |  
| ----------------------- | ------ | ----------------------------------------------------------- | ---------- | --------------------------------------- |
| `/api/products_log/add` | POST   | `visit`->ID visita, `id`->ID producto, `quantity`->cantidad | X          | PLog con el ticket, producto y cantidad | 
  
</details>

### RaceController.php -> Lista, elimina, actualiza razas y sus datos.
<details><summary>MOSTRAR</summary>

| Endpoint                                   | Método | Body                                      | Parámetros                     | Respuesta                         |  
| ------------------------------------------ | ------ | ----------------------------------------- | ------------------------------ | --------------------------------- |
| `/api/races`                               | GET    | X                                         | X                              | Todas las razas                   |
| `/api/races`                               | POST   | `species`->Nombre de la especie           | X                              | Todas las razas de una especie    |
| `/api/races/{id}`                          | GET    | X                                         | `{id}`->ID de la raza          | Info de la raza                   |        
| `/api/races/paginate/{currentPage}`        | GET    | X                                         | `{currentPage}`->página actual | Razas paginadas                   |  
| `/api/race/update`                         | POST   | FormData ->`id` + registros a modificar   | X                              | Info de la raza modificada        |  
| `/api/race/add`                            | POST   | FormData -> `name`, `species`             | X                              | Info de la nueva raza             |  
| `/api/races/{id}/remove`                   | GET    | X                                         | `{id}`-> ID de la raza         | Raza eliminada                    |
  
</details>

### ServicesController.php -> Lista, elimina, actualiza servicios y sus datos.
<details><summary>MOSTRAR</summary>

| Endpoint                                   | Método | Body                                      | Parámetros                     | Respuesta                         |  
| ------------------------------------------ | ------ | ----------------------------------------- | ------------------------------ | --------------------------------- |
| `/api/services/{id}`                       | GET    | X                                         | `{id}`->ID del servicio        | Info del servicio                 |        
| `/api/services/{currentPage}/filter`       | POST   | Info del formulario de búsqueda           | `{currentPage}`->página actual | Servicios paginados y filtrados   |  
| `/api/services/update`                     | POST   | FormData ->`id` + registros a modificar   | X                              | Info del servicio modificado      |  
| `/api/services/add`                        | POST   | FormData -> Info del nuevo servicio       | X                              | Info del nuevo servicio           |  
| `/api/services/{id}/remove`                | GET    | X                                         | `{id}`-> ID del servicio       | Servicio eliminado                |
  
</details>

### ServicesLogController.php -> Asocia los servicios al ticket correspondiente.
<details><summary>MOSTRAR</summary>

| Endpoint                | Método | Body                                                        | Parámetros | Respuesta                               |  
| ----------------------- | ------ | ----------------------------------------------------------- | ---------- | --------------------------------------- |
| `/api/services_log/add` | POST   | `visit`->ID visita, `id`->ID servicio, `quantity`->cantidad | X          | SLog con el ticket, servicio y cantidad | 
  
</details>

### SpeciesController.php -> Lista, elimina, actualiza razas y sus datos.
<details><summary>MOSTRAR</summary>

| Endpoint                                   | Método | Body                                      | Parámetros                     | Respuesta                         |  
| ------------------------------------------ | ------ | ----------------------------------------- | ------------------------------ | --------------------------------- |
| `/api/species`                             | GET    | X                                         | X                              | Todas las especies                |
| `/api/species`                             | POST   | Campos del formulario de búsqueda         | X                              | Todas las especies filtradas      |
| `/api/species/{id}`                        | GET    | X                                         | `{id}`->ID de la especie       | Info de la especie                |        
| `/api/species/paginate/{currentPage}`      | GET    | X                                         | `{currentPage}`->página actual | Especies paginadas                |  
| `/api/species/update`                      | POST   | FormData ->`id` + registros a modificar   | X                              | Info de la especie modificada     |  
| `/api/species/add`                         | POST   | FormData -> `name`, `sciName`             | X                              | Info de la nueva especie          |  
| `/api/species/{id}/remove`                 | GET    | X                                         | `{id}`-> ID de la especie      | Especie eliminada                 |
  
</details>

### SupplierController.php -> Lista, elimina, actualiza proveedores y sus datos.
<details><summary>MOSTRAR</summary>

| Endpoint                                    | Método | Body                                      | Parámetros                     | Respuesta                         |  
| ------------------------------------------- | ------ | ----------------------------------------- | ------------------------------ | --------------------------------- |
| `/api/suppliers`                            | GET    | X                                         | X                              | Todos los proveedores             |
| `/api/suppliers/{id}`                       | GET    | X                                         | `{id}`->ID del proveedor       | Info del proveedor                |        
| `/api/suppliers/paginate/{currentPage}`     | GET    | X                                         | `{currentPage}`->página actual | Proveedores paginados             |  
| `/api/supplier/update`                      | POST   | FormData ->`id` + registros a modificar   | X                              | Info del proveedor modificado     |  
| `/api/supplier/add`                         | POST   | FormData -> Info del nuevo proveedor      | X                              | Info del nuevo proveedor          |  
| `/api/suppliers/{id}/remove`                | GET    | X                                         | `{id}`-> ID del proveedor      | Proveedor eliminado               |
  
</details>

### UsersController.php -> Lista, elimina, actualiza usuarios y sus datos.
<details><summary>MOSTRAR</summary>

| Endpoint                         | Método | Body                                            | Parámetros                     | Respuesta                       |  
| -------------------------------- | ------ | ----------------------------------------------- | ------------------------------ | ------------------------------- |
| `/api/{currentPage}/users`       | POST   | Info del formulario de búsqueda                 | `{currentPage}`->página actual | Usuarios paginados y filtrados  |        
| `/api/users/get_current`         | POST   | `username`                                      | X                              | Info importante del usuario     |
| `/api/user/{id}`                 | GET    | X                                               | `{id}`-> ID del usuario        | Info expandida del usuario      |
| `/api/vets`                      | GET    | X                                               | X                              | Todos los usuarios veterinarios | 
| `/api/vets`                      | POST   | Info del formulario de búsqueda                 | X                              | Veterinarios filtrados          | 
| `/api/user/update`               | POST   | `id` + registros a modificar                    | X                              | Info del usuario modificado     |  
| `/api/user/add`                  | POST   | Info del nuevo usuario                          | X                              | Info del nuevo usuario          |  
| `/api/users/{id}/remove`         | GET    | X                                               | `{id}`-> ID del usuario        | Mensaje de éxito                |
| `/api/user/{id}/update_profile`  | POST   | Registros a modificar                           | `{id}`-> ID del usuario        | Info del usuario modificado     | 
| `/api/user/change_pswd`          | POST   | `id`->ID del usuario, `pswd`->Nueva constraseña | X                              | ID del usuario                  | 

</details>

### VisitsController.php -> Lista, elimina, actualiza visitas y sus datos.
<details><summary>MOSTRAR</summary>

| Endpoint                         | Método | Body                                            | Parámetros                     | Respuesta                                            |
| -------------------------------- | ------ | ----------------------------------------------- | ------------------------------ | ---------------------------------------------------- |
| `/api/{currentPage}/visits`      | GET    | X                                               | `{currentPage}`->página actual | Visitas paginadas                                    |
| `/api/{currentPage}/visits`      | POST   | Info del formulario de búsqueda                 | `{currentPage}`->página actual | Visitas paginadas y filtradas                        |
| `/api/visits/today`              | POST   | `datePicker`->fecha, `uId`->ID del usuario      | X                              | Visitas de la fecha especificada                     |
| `/api/visits/{id}`               | GET    | X                                               | `{id}`-> ID de la visita       | Info expandida de la visita                          |
| `/api/patients/{id}/visits`      | GET    | X                                               | `{id}`-> ID del paciente       | Todas las visitas del paciente                       |
| `/api/visits/update`             | POST   | `id` + registros a modificar                    | X                              | Info de la visita modificada                         |
| `/api/visits/add`                | POST   | Info de la nueva visita                         | X                              | Info de la nueva visita                              |  
| `/api/visits/{id}/remove`        | GET    | X                                               | `{id}`-> ID de la visita       | Visita eliminada                                     |
| `/api/visits/{id}/cart`          | POST   | `cart`->Array de objetos                        | `{id}`-> ID de la visita       | Devuelve la visita                                   |
| `/api/visits/{id}/close`         | GET    | X                                               | `{id}`-> ID de la visita       | Devuelve la visita cerrada                           |
| `/api/visits/time`               | POST   | `date`->Fecha, `user`->Usuario                  | X                              | Horas y duración de las visitas en la fecha indicada |
| `/api/week_schedule`             | POST   | `username`->Nombre de usuario, `week`->Semana   | X                              | Visitas de la semana indicada                        |

</details>

## Frameworks y lenguajes utilizados
- ReactJS
- Symfony
- HTML5
- CSS3
- JavaScript
- PHP
- MySQL
- Bootstrap 5