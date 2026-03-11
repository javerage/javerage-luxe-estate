Debes diseñar una estrategia que permita implementar los filtros y búsquedas de propiedades en el HomeScreen que se encuentra en @/app/page.tsx, la sección de los filtros que vamos a trabajar es la que se aprecia en la imagen @home_filter_section.png.

- Para el botón de filtros "Filters" debe abrir una ventana modal y la ventana que se abra debe lucir exactamente al diseño del SearchFiltersScreen que corresponde al código proporcionado en el archivo @.gemini/resources/search_filters_screen/code.html

- Es fundamenteal que el diseño se alinee a los archivos @guidelines.md y @instructions.md para crear la página SearchFiltersScreen la cual debe permitir realizar el filtro de las propiedades que se tienen almacenadas en la base de datos.

- También debes agregar 25 nuevas propiedades para poder tener diferetnes opciones de búsqueda y comprobar que todo funciona, los valores para las nuevas propiedades deben ser valores aleatorios pero apegados a nombres reales y lugares reales que nos servirán como placeholders
---

We are developing a property search feature for our application located at "@/app/page.tsx". The goal is to implement filters and search functionalities for properties, specifically focusing on the filter section illustrated in "home_filter_section.png". This feature is crucial for enhancing user experience by allowing users to find properties based on specific criteria.

I want you to design a strategy to implement the filters and searches for properties on the HomeScreen. The filters button labeled "Filters" should trigger a modal window that matches the design of the SearchFiltersScreen found in "@/gemini/resources/search_filters_screen/code.html". 

Additionally, you must ensure that the design aligns with the guidelines provided in "guidelines.md" and "instructions.md". The SearchFiltersScreen should allow users to filter properties stored in our database effectively.

Moreover, you should add 25 new properties to the database for testing purposes. These properties should have randomly generated but realistic names and locations that can serve as placeholders.

The outcome I want here is a comprehensive plan that includes:

• Steps to implement the filter and search functionality on the HomeScreen
• A description of how the modal window should be structured and styled to match the SearchFiltersScreen
• A summary of the filtering options that will be available for users
• A list of the 25 new properties added, including their names and locations
• Validation criteria to ensure that the filter and search functions work as intended

This plan will help our team at LUXE-ESTATE successfully implement the property search feature and verify its functionality with diverse property listings.
---

We are currently working on the design of the SearchFiltersScreen in our application. The existing design does not align with the intended user experience, as highlighted in the image located at "@/gemini/resources/search_filters_screen/screen.png". A specific issue has been documented in the bug report @search_filter_screen_bug, which illustrates the discrepancies between the current implementation and the expected design specifications.

I want you to develop a strategy to standardize the design of the controls on the SearchFiltersScreen. This should ensure that the current implementation adheres to the design guidelines outlined in the referenced image.

Please follow these detailed steps:

1. Review the design in "@/gemini/resources/search_filters_screen/screen.png" and compare it with the existing implementation shown in the bug report @search_filter_screen_bug.
2. Identify specific elements that do not conform to the design (e.g., layout, color, font, button styles).
3. Outline changes needed for each non-compliant element to match the design specifications.
4. Create a timeline for implementing these changes, including any required testing phases to ensure the new design enhances user experience.
5. Provide recommendations on how to maintain design consistency across other screens in the application.

The outcome I want here is a comprehensive strategy document that includes:

- A detailed comparison of the current design versus the desired design.
- A list of specific changes needed to achieve design compliance.
- A clear implementation timeline with milestones.
- Recommendations for maintaining consistent design across the application.

This strategy will help our team at LUXE ESTATE to improve the user interface and ensure a cohesive user experience throughout the application.

---
Ahora es momento de trabajar con los "chips" de la pantalla de home para poder utilizar los filtros rápidos correspondientes al tipo de propiedad, para ello debes asegurarte que en la tabla de nuestra base de datos esta columna se encuentre configurada de manera correcta y unicamente cuente con los valores que sea aprecian en los chips; tambien este filtro debe ser funcional en la pantalla de filtros, la sección en la cual deseamos implementar la funcionalidad se encuentra en @/app/page.tsx y puedes confirmar la ubicación de los chips en la imagen @home_filter_section.png
---

We are currently developing a user interface for our property management application that includes "chips" on the home screen to facilitate quick filtering of property types. It is crucial that the database table linked to these filters is correctly configured, ensuring that it only contains values that correspond to the chips displayed. Additionally, we want the filter functionality to be fully operational within the filter section of the app.

I want you to ensure that the database column related to property types is correctly set up. This involves verifying that it only includes values that match the chips shown on the home screen. Furthermore, the filter should also work seamlessly in the filter section of the application.

To complete this task, please follow these steps:

1. Access the database and locate the relevant column for property types.
2. Review the current values in this column and compare them to the values displayed on the chips in the home screen.
3. Make any necessary corrections to ensure that the database values align with the chip values.
4. Confirm that the filter functionality works properly in the filter section located at '@/app/page.tsx'.
5. Check the layout to match the chips as shown in the image '@home_filter_section.png'.

The outcome I want here is a fully functional filter system that allows users to quickly and accurately filter properties based on the types represented by the chips. You should confirm that the database values are correct, and provide a summary report detailing any changes made, as well as a confirmation that the filter works as intended. This report should include:

- A brief description of the changes made to the database.
- Confirmation that the values in the database correspond with the chips.
- A verification that the filter functionality is operational in both the home screen and the filter section.
- Any additional observations regarding the implementation.

This will ensure a smooth user experience when filtering properties within the application.
---

Cuando se aplique un filtro por medio de los chips de homescreen o de los filtros seleccionados en la pantalla filterscreen, al desplegar los resultados la sección featured collections debería ocultarse, debido a que causa confusión al usuario y solo deberia mostrarse de nuevo al seleccionar la opción "All" de los chips de homescreen o al seleccionar la opcion "Clear all filters" de filtersscreen; diseña una estrategia para implementar estos cambios, asegurate que el código que implementes cumpla con las recomendaciones actuales del lenguaje y el framework utilizando el mcp context7
---

When users apply filters using the chips on the homescreen or the selected filters on the filterscreen, the "featured collections" section should be hidden to avoid user confusion. This section should only reappear when the user selects the "All" option on the homescreen chips or clicks the "Clear all filters" option on the filterscreen. We need to design a strategy to implement these changes in compliance with the current recommendations of the language and framework using the MCP context7.

I want you to create a plan to implement this functionality. 

Please ensure that you:

1. Identify the necessary code changes needed to hide and show the "featured collections" section based on the filter status.
2. Specify the triggers for hiding and showing the section, including the "All" option and the "Clear all filters" option.
3. Ensure that the code adheres to best practices for the MCP context7 framework.
4. Provide comments in the code for clarity and maintainability.

The outcome I want here is a clear implementation plan that includes:

- A summary of the code changes needed
- The exact code snippets for hiding and showing the "featured collections" section
- Comments explaining each part of the code for ease of understanding
- Confirmation that the implementation follows the current guidelines for MCP context7

This will help our development team at LUZE ESTATE to enhance user experience by reducing confusion when filters are applied.