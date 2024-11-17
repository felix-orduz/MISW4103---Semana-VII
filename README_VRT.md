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
- Para empezar el script de construcción del reporte para las pruebas de Cypress está en la siguiente ruta .\cypress\vrt. Ahí hay dos archivos: vrt_pixelmatch.js y vrt.config.js. El primero es el script que genera el reporte y el segundo son los parámetros que se tienen en cuenta para realizar la comparación de imágenes.
  
- Para generar el reporte de las pruebas de Cypress se recomienda lo siguiente:
    - En la ruta .\cypress\e2e\version_base se encuentran los escenarios de Ghost 4.5 y en la ruta cypress\e2e\version_rc los escenarios de la versión Ghost 5.96. Primero, se debe realizar la ejecución de un escenario en la versión 4.5 de Ghost y luego la             ejecución del mismo escenario pero en Ghost 5.96. Lo anterior es sencillo dado que las pruebas tienen el código de identificación E000XXX.cy.js. Esto generará un directorio llamado screenshots en la ruta .\cypress\screenshots con dos subdirectorios adentro uno llamado ghost-4.5 y otro con el nombre de ghost-5.96. Si la ejecucion de las pruebas fue correcto debería haber la misma cantidad de imágenes en ambos directorios y deberías tener el código E000XXX-X-BS.png para la versión base y E000XXX-X-RC.png para la versión RC.
      
    - Por último, 

