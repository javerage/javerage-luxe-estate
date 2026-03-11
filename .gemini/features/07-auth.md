### Configurar el Signin provider de supabase
En la sección de Authentication, selecciona la opcion Sign In / Providers y debes buscar el proveedro GitHub para obtener la URL Callback que se va a configurar en el siguiente paso

---
### Configurar el Signin de github
- Selecciona la opción settings en el perfil de tu cuenta
- Selecciona la opción Developer settings en las opciones de configuración
- Selecciona la opción OAuth en la pantalla Developer Settings
- Selecciona la opción NewOAuth
--- 

### Configurar el Signin provider de supabase
En la sección de Authentication, selecciona la opcion Sign In / Providers y debes buscar el proveedro Google para obtener la URL Callback que se va a configurar en el siguiente paso
---

### Crear un proyecto de google para autenticarnos
- ingresa a la consola de google y crea un nuevo proyecto con el nombre luxe-estate-[iniciales]
- Seleccionar la opción "APIs y servicios"
- Selecciona la opción Credenciales
- En el menú "Create Credentials" selecciona la opción "OAuth client ID"
- Configura tu pantalla de consentimiento si es la primera vez que accedes

---
vamos a crear el diseño de nuestra funcionalidad de inicio de sesión basada en el diseño que puedes analizar en la imagen @.gemini/resources/social_login_and_registration/screen.png y utilizar el código del archivo @.gemini/resources/social_login_and_registration/code.html como base para implementar el código final del feature, reqcuerda que siempre debes validar el uso de los componentes y código generado utilizando el mcp context7.

- Para el icono de la aplicaciónen en la pantalla de autenticación puedes utilizar el mismo icono que se esta utilizando en el navbar de la pantalla de HomeScreen

- Cuando el usuario que haya iniciado sesión cuente con un avatar de google o github, entonces este se debe mostrar en el navbar, por lo cual debes autorizar la fuente de imágenes desde GitHub y de Google para poder visualizar los avatar de los usuarios.

- Implementa Google SignIn y Github SignIn basado en Supabase asegurate de usar context7 para garantizar seguir las prácticas recomendadas en la autenticación con estas funciones, es importnte que verifiques la respuesta de ambos proveedores porque retornan diferentes nombres para los campos de respuesta.

- En el proceso de autenticación evita usar el cache, siempre debes realizar la validación en fresco

- Es fundamenteal que el diseño se alinee a los archivos @guidelines.md y @instructions.md para crear la página PropertyDetailsScreen la cual debe contener propiedades que se obtienen de la base de datos.

---

We are developing a login functionality for our application, guided by the design in the image located at “@.gemini/resources/social_login_and_registration/screen.png”. Additionally, we will use the code from the file “@.gemini/resources/social_login_and_registration/code.html” as a foundation for the final implementation. It is essential to validate the use of components and generated code using the MCP Context7 framework. 

I want you to create the login feature that includes displaying a user’s Google or GitHub avatar in the navbar if they have logged in with either service. Ensure to authorize image sourcing from GitHub and Google to display user avatars properly. Implement Google Sign-In and GitHub Sign-In using Supabase, making sure to adhere to Context7 best practices for authentication.

Furthermore, the design must align with the guidelines specified in “@guidelines.md” and “@instructions.md” for the PropertyDetailsScreen page. This page should display properties retrieved from the database.

Please follow these steps to complete the task:

1. Analyze the design from the provided image and ensure it aligns with the guidelines.
2. Use the code in “@.gemini/resources/social_login_and_registration/code.html” as a starting point.
3. Implement the Google and GitHub Sign-In functionalities using Supabase, following Context7 protocols.
4. Ensure user avatars from Google and GitHub display correctly in the navbar by authorizing the image sources.
5. Create the PropertyDetailsScreen page, ensuring it pulls property data from the database and aligns with the provided guidelines.

The outcome I want here is a fully functional login feature that includes:

- A navbar displaying user avatars if logged in with Google or GitHub.
- Working Google and GitHub Sign-In buttons integrated with Supabase.
- A PropertyDetailsScreen page that shows property listings from the database, adhering to the design guidelines.

This implementation should be clean, efficient, and align with the specified design and guidelines.
