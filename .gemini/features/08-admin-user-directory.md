En este momento vamos a iniciar con la construcción del dashboard administrativo que permita:
- Visualizar todos los usuarios que se han autenticado en el sitio, el diseño del dashboard debe ser igual al que se especifica en la imagen @/.gemini/resources/admin_user_directory_cards/screen.png; puedes utilizar como código base el contenido del archivo @/.gemini/resources/admin_user_directory_cards/code.html; recuerda que debes utilizar el MCP agent7 para validar el uso de las mejores prácticas de código.

- Con el objetivo de poder editar los roles de los usuarios autenticados en nuestra base de datos, debes crear una tabla en la base de datos para esta tarea. También debes asegurarte que todos los usuarios que se autentiquen en nuestro sitio se les asigne un rol por defecto "Viewer" o similar.

- Los roles que puedes considear para  los usuarios son: "Administrador", "Cliente", "Vendedor", "Agente Inmobiliario".

- Crear un middleware que permita validar el role del usuario que se encuentra autenticado, con la finalidad de que solamente los usuarios con un rol administrador pueden acceder a la página de Usuarios.

- Es fundamenteal que el diseño se alinee a los archivos @guidelines.md y @instructions.md para crear la página. recuerda consultar el archivo @best-practices.md para mantener las mejores prácticas para aplicaciones de real-estate.

- Al finalizar debes proporcionarme la dirección URL para poder acceder a la página del Dashboard de usuarios.
---

We are developing an administrative dashboard to manage user authentication for our website. This dashboard must visually display all authenticated users, aligning with the design specified in the image located at @/.gemini/resources/admin_user_directory_cards/screen.png. You can utilize the base code found in @/.gemini/resources/admin_user_directory_cards/code.html. It's essential to implement the MCP agent7 to ensure best coding practices are followed.

I want you to create the dashboard that fulfills the following requirements:

- Implement a user authentication display that matches the provided design.
- Create a database table for managing user roles, ensuring that all authenticated users are assigned a default role of "Viewer" or a similar designation.
- Define user roles, including "Administrador," "Cliente," "Vendedor," and "Agente Inmobiliario."
- Develop middleware to validate user roles, restricting access to the Users page exclusively for users with an administrator role.
- Ensure the design adheres to the guidelines outlined in the files @guidelines.md and @instructions.md. Refer to @best-practices.md to maintain best practices for real estate applications.

The outcome I want here is a fully functional user dashboard accessible via a URL. The final result should include:

- A dashboard displaying all authenticated users in the specified format.
- A properly structured database table for user roles with the required default settings.
- Middleware that effectively restricts access based on user roles.
- Adherence to the design and coding guidelines mentioned.

Please provide the URL to access the user dashboard upon completion.

---

 Analiza el flujo de información durante el proceso de autenticación con el objetivo de identificar la causa del error que impide que la información del usuario que se autentica se registre en la tabla profiles de supabase; una vez que identifiques el problema implementa una solución adecuada validando el código que sugieras a travez del mcp context7    