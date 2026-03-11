Vamos a trabajar con la pantalla de detalle de propiedad individual.
Necesito que tu implementación considere las practicas que se encuentran en el archivo @best-practices.md y además realices las siguientes tareas:
- Implementar una columna que funcione como SLUG para la propiedad con lo cual nos permitirá implementar URL amigables en la navegación.
- Para las imagenes de una propiedad se debe cambiar para que se pueda manejar una colección de imágenes por propiedad
- Es importante que la navegación a la pantalla de detalle se implemente al presionar una de las tarjetas en la patnalal de home y una vez que te encuentres en la pantalla de detalle de una propiedad puedas retornar al home presionando el icono o logo de la empresa que se encuentre en la esquina superior izquierda del navbar
- Para la parte de mapas debemos usar Leaflet utiliza context7 para asegurarte de tener la referencia de uso actualizada
- Es fundamenteal que el diseño se alinee a los archivos @guidelines.md y @instructions.md para crear la página PropertyDetailsScreen la cual debe contener propiedades que se obtienen de la base de datos.
- El diseño de PropertyDetailsScreen debe lucir igual al código proporcionado en el archivo @.gemini/resources/property_details_screen/code.html
---
We are developing an individual property detail screen for our real estate application. This screen will display various information about properties and needs to align with best practices outlined in the file @best-practices.md. Additionally, we have specific tasks to implement, including the following:

I want you to create the PropertyDetailsScreen with the following requirements:

1. Implement a slug column for each property to facilitate user-friendly URLs in navigation.
2. Modify the current image handling to support a collection of images for each property.
3. Ensure that users can navigate to the property detail screen by clicking on any property card in the home panel. Once on the detail screen, users should be able to return to the home screen by clicking the company logo located in the upper left corner of the navbar.
4. Integrate Leaflet for the maps component and utilize context7 to maintain updated usage references.
5. Ensure the design adheres to @guidelines.md and @instructions.md, while the layout of PropertyDetailsScreen must match the code provided in @.gemini/resources/property_details_screen/code.html.

The outcome I want here is a fully functional PropertyDetailsScreen that includes:

- A slug for each property for SEO-friendly URLs
- A gallery feature for multiple property images
- Smooth navigation from the home panel to the property details and back
- A map feature implemented with Leaflet
- A design that matches the provided guidelines and code

This will ensure that the screen is user-friendly, visually appealing, and compliant with our project standards.
---

Actualmente en la tabla properties de la base de datos tenemos dos columnas una con el nombre "image" y otra con el nombre "images", necesito que en nuestra aplicación solo se utilice la propiedad "images", es decir el arreglo de iamgenes par aevitar duplicidad y confusion.

- También debes asegurarte que cada propiedad cuente con al menos 3 imagenes que puedan ser accedidas desde internet, evita usar enlaces rotos.
---

Currently, in the properties table of our database, we have two columns: one named "image" and another named "images." We need to ensure that our application exclusively utilizes the "images" property, which is the array of images, to avoid duplication and confusion. Additionally, it is essential that each property has at least three images accessible from the internet, and we must avoid using broken links.

I want you to update the application to only reference the "images" column instead of "image." 

Please follow these steps:
1. Identify all instances in the application where the "image" property is currently used.
2. Replace those instances with the "images" property.
3. Verify that each property has at least three valid image links that work without any broken links.
4. Create a report listing any properties that do not meet the image requirement, including their current image links.

The outcome I want here is a clear and concise report that includes:
- A summary of all changes made to the application
- A list of properties with fewer than three valid image links, along with their current image URLs
- Confirmation that the application now exclusively uses the "images" property

This report will help ensure that our application is streamlined and that all properties have sufficient image representations for user access.