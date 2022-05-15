# Servidor para el proyecto (angular-adv-adminpro)

Este es un servidor de Node.js que implementa a cors para limitar el acceso a la API, Express, express-fileupload,
express-validator, google-auth-library, JWT, mongoose, escape-string-regexp, y MongoDB CRUD.

Más información sobre este servidor y su el Cliente lo encuentra aquí:
[https://dennysjmarquez.medium.com/angular-10-mean-google-auth-jwt-lazyload-upload-de-archivos-guards-pipes-zona-admin-bfa2e5ef9074](https://dennysjmarquez.medium.com/angular-10-mean-google-auth-jwt-lazyload-upload-de-archivos-guards-pipes-zona-admin-bfa2e5ef9074)


## Como hacerlo funcionar

Instale las dependencias del proyecto:

```bash
npm install
```

Cree un archivo **.env** en el directorio del proyecto y agregue las siguientes configuraciones:

```bash
PORT=
DB_CNN=
JWT_SECRET=
GOOGLE_ID=
PAGINATION_LIMIT=
```

**PORT** Es el puerto en el que se va a montar el servidor

**DB_CNN** Este la URL con el nombre y pass del usuario de la dB creada en MongoDB Atlas
EJEMLPO: `DB_CNN='mongodb+srv://user:868g6iy6jjgj67jg@cluster0.dznfv.mongodb.net/hospitaldb'`

**JWT_SECRET** Es una clave full segura para generar y comprobar el token de JWT

**GOOGLE_ID** Es el ID generado en la App OAuth2 de Google, puedes conseguir uno aquí 
Es el ID generado en la App OAuth2 de Google, puedes conseguir uno aquí 
[https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**PAGINATION_LIMIT** Ya que el proyecto puede usar paginaciones en sus resultados, esto establece el número de resultados por página, yo use 10

Ya con las configuraciones en **.env** corra el servidor con el siguiente comando:

```bash
npm start
```

Si quieres que se recargue cuando hagas cambios cuando estás programando ejecuta este comando en vez que el otro

```bash
npm run start:demon
```

Para servir **El proyecto de angular asociado a este back** agregar una versión compilada para producción de **angular-adv-adminpro**, la compilas y la agregas en la carpeta **public** de este servidor **remplazando todo lo que esté en public** por el de tu proyecto.

**Proyecto angular-adv-adminpro aquí https://github.com/dennysjmarquez/angular-adv-adminpro**
