# MISW4103-Semana-VI
- Daniel Andrade Suárez - d.andrades@uniandes.edu.co
- Daniel Oicatá Hernández - d.oicata@uniandes.edu.co
- Felix Orduz - f.orduz@uniandes.edu.co
- Nixon Ortiz - nf.ortiz@uniandes.edu.co

## Ejecutar las pruebas

### Prerequisitios
- Node JS (versión superior a la 15.0)

### Instalación librerías para pruebas de regresión visual
- Para realizar la comparación de imágenes, es necesario instalar las librerías `ResembleJS` y `PixelMatch`, que permiten implementar esta funcionalidad. La instalación de `ResembleJS` se realiza mediante el comando `npm install resemblejs`, recomendándose usar Node.js en la versión 16 para garantizar la compatibilidad. Por otro lado, `PixelMatch` se instala ejecutando `npm install --save-dev pixelmatch`. En este proyecto, se utilizaron las versiones `^5.0.0` de ResembleJS y `^6.0.0` de PixelMatch.

### Construcción de reporte para pruebas en Cypress
- Para comenzar, el script encargado de construir el reporte para las pruebas de Cypress se encuentra en la ruta `.\cypress\vrt`. En esta ubicación hay dos archivos: `vrt_pixelmatch.js`, que genera el reporte, y `vrt.config.js`, que define los parámetros utilizados para la comparación de imágenes.
  
- Para generar el reporte de las pruebas de Cypress, se recomienda seguir los siguientes pasos:
    1. En la ruta `.\cypress\e2e\version_base` se encuentran los escenarios correspondientes a **Ghost 4.5**, mientras que en `.\cypress\e2e\version_rc` están los escenarios de **Ghost 5.96**. Primero, se debe ejecutar un escenario en la versión 4.5 y luego repetir la ejecución del mismo escenario en la versión 5.96. Esto es sencillo, ya que las pruebas están identificadas con un código en el formato `E000XXX.cy.js`.

    2. Al ejecutar las pruebas, se generará un directorio llamado `screenshots` en la ruta `.\cypress\screenshots`. Este contendrá dos subdirectorios: **ghost-4.5** y **ghost-5.96**. Si la ejecución se realizó correctamente, ambos directorios deben contener la misma cantidad de imágenes, nombradas según el formato `E000XXX-X-BS.png` para la versión base y `E000XXX-X-RC.png` para la versión RC.
 
    3. Finalmente, para generar el reporte, se debe ejecutar el siguiente comando en la consola `node ./cypress/vrt/vrt_pixelmatch.js`. Este comando creará un archivo llamado **reporte_cypress.html** en la raíz del proyecto. Es importante verificar que ambas carpetas (**ghost-4.5** y **ghost-5.96**) contengan la misma cantidad de imágenes correspondientes a los escenarios ejecutados, ya que de lo contrario el reporte no se generará correctamente. Por ello, se recomienda ejecutar y validar cada escenario en ambas versiones antes de generar el reporte final de las pruebas de regresión visual.

