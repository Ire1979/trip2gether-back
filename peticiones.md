

# RUTAS PETICIONES BBDD

## TRIPS

### /////////PETICIONES BÁSICAS/////////

- GET /api/trips
  - Recupera todos los viajes de la BBDD.

- POST /api/trips
  - Crea un viaje en la BBDD
  - En el body de la petición debe incluirse un objeto con los campos de 'trip'.

- PUT /api/trips/1
  - Edita el viaje cuya 'id' sea la que pasemos por la ruta.
  - En el body de la petición deben incluirse todos los campos de 'trip'.

- DELETE /api/trips/1
  - Elimina el viaje cuya 'id' sea la que pasemos por la ruta.  

### /////////PETICIONES AVANZADAS/////////

- GET /api/trips/1 //GET TRIP BY ID
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

- GET /api/users
  - Recupera todos los usuarios de la BBDD.

- POST /api/users
  - Crea un usuario en la BBDD
  - En el body de la petición debe incluirse un objeto con los campos de 'users'.

- PUT /api/users/1
  - Edita el usuario cuya 'id' sea la que pasemos por la ruta.
  - En el body de la petición deben incluirse todos los campos de 'user'.

- DELETE /api/user/1
  - Elimina el usuario cuya 'id' sea la que pasemos por la ruta.  

### /////////PETICIONES AVANZADAS/////////

- GET /api/user/1 //GET USER BY ID
  - Recupera el usuario cuya 'id' sea la que pasemos por la ruta.

- //GET USERS BY TRIP
  - Recupera los usuarios suscritos a un viaje cuya 'id' sea la que pasemos por la ruta.
