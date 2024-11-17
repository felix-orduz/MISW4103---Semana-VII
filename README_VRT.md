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
- Para empezar, el script encargado de construir el reporte para las pruebas de Cypress se encuentra en la ruta `.\cypress\vrt`. En esta ubicación hay dos archivos: `vrt_pixelmatch.js`, que genera el reporte, y `vrt.config.js`, que define los parámetros utilizados para la comparación de imágenes.
  
- Para generar el reporte de las pruebas de Cypress, se recomienda seguir los siguientes pasos:
    1. En la ruta `.\cypress\e2e\version_base` se encuentran los escenarios correspondientes a **Ghost 4.5**, mientras que en `.\cypress\e2e\version_rc` están los escenarios de **Ghost 5.96**. Primero, se debe ejecutar un escenario en la versión 4.5 y luego repetir la ejecución del mismo escenario en la versión 5.96. Esto es sencillo, ya que las pruebas están identificadas con un código en el formato `E000XXX.cy.js` solo se debe tener desplegada la versión correcta de Ghost.

    2. Al ejecutar las pruebas, se generará un directorio llamado `screenshots` en la ruta `.\cypress\screenshots`. Este contendrá dos subdirectorios: **ghost-4.5** y **ghost-5.96**. Si la ejecución se realizó correctamente, ambos directorios deben contener la misma cantidad de imágenes, nombradas según el formato `E000XXX-X-BS.png` para la versión base y `E000XXX-X-RC.png` para la versión RC.
 
    3. Finalmente, para generar el reporte, se debe ejecutar el siguiente comando en la consola `node ./cypress/vrt/vrt_pixelmatch.js`. Este comando creará un archivo llamado **reporte_cypress.html** en la raíz del proyecto. Es importante verificar que ambas carpetas (**ghost-4.5** y **ghost-5.96**) contengan la misma cantidad de imágenes correspondientes a los escenarios ejecutados, ya que de lo contrario el reporte no se generará correctamente. Por ello, se recomienda ejecutar y validar cada escenario en ambas versiones antes de generar el reporte final de las pruebas de regresión visual.

### Construcción de reporte para pruebas en Kraken
- Para empezar, el script encargado de construir el reporte para las pruebas de Kraken se encuentra en la ruta `.\kraken\vrt`. En esta ubicación hay dos archivos: `vrt_resemble.js`, que genera el reporte, y `config.json`, que define los parámetros utilizados para la comparación de imágenes.
  
- Para generar el reporte de las pruebas de Kraken, se recomienda seguir los siguientes pasos:
    1. Para construir el reporte, es fundamental crear previamente el directorio **screenshots** en la ruta `.\kraken`. Dentro de este directorio, se deben crear tres subdirectorios: `ghost-4.5`, `ghost-5.96` y `comparisons`. Si estos directorios no existen, los pantallazos no se guardarán correctamente y la ejecución de las pruebas fallará.
       
    2. En la ruta `.\kraken\features\features\version_base` se encuentran los escenarios correspondientes a **Ghost 4.5**, mientras que en `.\kraken\features\features\version_rc` están los escenarios de **Ghost 5.96**. Primero, se debe ejecutar un escenario en la versión 4.5 y luego repetir la ejecución del mismo escenario en la versión 5.96. Esto es sencillo, ya que las pruebas están identificadas con un código en el formato `E000XXX.feature` solo se debe tener desplegada la versión correcta de Ghost. Es importante destacar que, para la ejecución de cada escenario, se deben copiar los pasos definidos en el archivo correspondiente (`E000XXX.feature`) y pegarlos en el archivo `ghost.feature`, ubicado en la ruta `kraken\features\ghost.feature`.

    3. Si la ejecución se realizó correctamente, ambos directorios (`ghost-4.5` y `ghost-5.96`) en la ruta `kraken\screenshots\ghost-5.96` y `kraken\screenshots\ghost-4.5` deben contener la misma cantidad de imágenes, nombradas según el formato `E000XXX-X-BS.png` para la versión base y `E000XXX-X-RC.png` para la versión RC.
 
    4. Finalmente, para generar el reporte, se debe ejecutar el siguiente comando en la consola `node ./kraken/vrt/vrt_resemble.js`. Este comando creará un archivo llamado **reporte_kraken.html** en la raíz del proyecto. Es importante verificar que ambas carpetas (**ghost-4.5** y **ghost-5.96**) contengan la misma cantidad de imágenes correspondientes a los escenarios ejecutados, ya que de lo contrario el reporte no se generará correctamente. Por ello, se recomienda ejecutar y validar cada escenario en ambas versiones antes de generar el reporte final de las pruebas de regresión visual.

