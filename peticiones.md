

# RUTAS PETICIONES BBDD

## TRIPS

### /////////PETICIONES BÁSICAS/////////

- GET 
  - Recupera todos los viajes de la BBDD.

- POST 
  - Crea un viaje en la BBDD
  - En el body de la petición debe incluirse un objeto con los campos de 'trip'.

- PUT 
  - Edita el viaje cuya 'id' sea la que pasemos por la ruta.
  - En el body de la petición deben incluirse todos los campos de 'trip'.

- DELETE 
  - Elimina el viaje cuya 'id' sea la que pasemos por la ruta.  

### /////////PETICIONES AVANZADAS/////////

- //GET TRIP BY ID
  - Recupera el viaje cuya 'id' sea la que pasemos por la ruta.

- //GET TRIPS BY DESTINATION
  - Recupera los viajes cuyo destino sea el que pasemos en la ruta.

- //GET TRIPS BY DATE
  - Recupera los viajes cuyo fecha de salida sea la que pasemos en la ruta.

- //GET TRIPS BY DATE AND DESTINATION
  - Recupera los viajes cuyo fecha de salida y destino sea los que pasemos en la ruta.

- //GET TRIPS BY USERS
  - Recupera los viajes a los que se ha suscrito un usuario cuya 'id' sea la que pasemos por la ruta.
  

## USERS

### /////////PETICIONES BÁSICAS/////////

- GET 
  - Recupera todos los usuarios de la BBDD.

- POST 
  - Crea un usuario en la BBDD
  - En el body de la petición debe incluirse un objeto con los campos de 'users'.

- PUT 
  - Edita el usuario cuya 'id' sea la que pasemos por la ruta.
  - En el body de la petición deben incluirse todos los campos de 'user'.

- DELETE 
  - Elimina el usuario cuya 'id' sea la que pasemos por la ruta.  

### /////////PETICIONES AVANZADAS/////////

- //GET USER BY ID
  - Recupera el usuario cuya 'id' sea la que pasemos por la ruta.

- //GET USERS BY TRIP
  - Recupera los usuarios suscritos a un viaje cuya 'id' sea la que pasemos por la ruta.

- //POST REGISTER 
  - Registra un nuevo usuario con encriptación.

- //POST LOGIN
  - Permite el login de un usuario registrado con token válido.

