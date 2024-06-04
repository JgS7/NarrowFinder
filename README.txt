Instalación y uso

Clona el repositorio mediante url, la CLI de github con GitHub, mediante GitHub Desktop o descarga todo el codigo en un archivo ".zip"

Si no tienes NodeJs instalado, instálalo, puedes encontrarlo en (https://nodejs.org/en). Haz lo mismo con PostgreSQL (https://www.postgresql.org/download/) y sigue las instrucciones del instalador dejando el puerto por defecto (5432).

Una vez instalado, crea un nuevo "Login/Group Role" (usuario) con el nombre "NarrowFinder" con permisos de superusuario y que pueda loguearse, también es necesario poner como contraseña "nArrowfInder.". 

Después, crea una nueva base de datos con la ayuda de pgAdmin con "NarrowFinder" como nombre de la base de datos y propietario "NarrowFinder" (el usuario recién creado).

Una vez creada la base de datos y el usuario, haz click derecho sobre ella y selecciona "Restaurar" o "Restore". En la ventana emergente selecciona el fichero "/narrowFinder_db.sql" y usuario "postgres". Haz click en "Restore" o "Restaurar" para restaurar los datos.

Terminada la configuración de la base de datos, ejecuta "npn install" en la carpeta del proyecto para instalar las dependencias. 

Accede a la carpeta del proyecto y ejecuta el archivo "start.bat"

Abre tu navegador y busca "http://localhost:3000/" para acceder a la aplicación web

Listo para buscar las vías estrechas ;)

Revisa la ayuda para las dudas
