Debes diseñar e implementar una estrategia utilizando el mcp context7 para desarrollar la funcionalidad de multi-idioma para nuestro sitio LUXE ESTATE, los idiomas en los que estará disponible nuestro sitio son:
- Español
- Inglés
- Frances
Ademas de estos idiomas es posible que en un corto plazo se implementen otros idioma en el sitio.

Para poder mantener la configuración del idioma en nuestro sitio necesito que guardes uan cookie con el idioma del usuario; adicional a esto se debe implementar un mecanismo que nos permita seleccionar el idioma de preferencia para el suuario en caso dequerer cambiarlo.

El selecctor correspondiente al idioma se debe encontrar en la esquina superior dereccha del navbar. Tambien debes incluir la creación de los archivos de traducción para poder agregar otros idiomas de manera rápida y fácil.
---

To enhance the multilingual functionality of our LUXE ESTATE website, we aim to implement a strategy using the MCP Context7 framework. The languages available on our site will include: 
- Spanish
- English
- French

In the near future, we may also add more languages. 

I want you to design and implement a multilingual strategy that involves:

1. Storing a cookie to remember the user's selected language across sessions.
2. Creating a language selector in the top right corner of the navbar to allow users to change their preferred language.
3. Developing translation files for each language to facilitate easy addition of new languages in the future.

The final result should include:
- A functional language selector in the navbar
- Proper implementation of cookies to manage language preferences
- Translation files structured for quick integration of additional languages
- Clear documentation outlining how to update or add translations

This implementation will ensure a seamless multilingual experience for users visiting LUXE ESTATE.
---

 es importante que te asegures de que todas las etiquetas de la página @app/page.tsx cuenten con una traducción adecuada de acuerdo al idioma seleccionado; tambien debes incluir latraducción de las páginas @app/property/\[slug\]/page.tsx y el archivo searchfilter