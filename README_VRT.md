# MISW4103-Semana-VI
- Daniel Andrade Suárez - d.andrades@uniandes.edu.co
- Daniel Oicatá Hernández - d.oicata@uniandes.edu.co
- Felix Orduz - f.orduz@uniandes.edu.co
- Nixon Ortiz - nf.ortiz@uniandes.edu.co

## Ejecutar las pruebas

### Prerequisitios
- Node JS (versión superior a la 15.0)

### Ejecución de scripts para pruebas de regresión visual
- Para realizar la comparación de imágenes, es necesario instalar las librerías `ResembleJS` y `PixelMatch`, que permiten implementar esta funcionalidad. La instalación de `ResembleJS` se realiza mediante el comando `npm install resemblejs`, recomendándose usar Node.js en la versión 16 para garantizar la compatibilidad. Por otro lado, `PixelMatch` se instala ejecutando `npm install --save-dev pixelmatch`. En este proyecto, se utilizaron las versiones `^5.0.0` de ResembleJS y `^6.0.0` de PixelMatch.

### Construcción de reporte para pruebas en Cypress

### Recomendaciones para la ejecución de las pruebas:**
- **Condiciones iniciales para ejecutar pruebas en Ghost:** Las pruebas deben ejecutarse en la versión de Ghost especificada y se enfocan en las funcionalidades principales de la ABP (Posts, Pages, Tags, Members). Para evitar interferencias en los resultados, se recomienda que estas secciones estén vacías y sin contenido en drafts, ya que elementos existentes pueden afectar la ejecución correcta de las pruebas. Aplica para Cypress como a Kraken.

- **Manejo de errores iniciales en Cypress y Kraken:** Al ejecutar las pruebas por primera vez, Cypress y Kraken pueden presentar errores inesperados, como problemas para cargar Ghost a tiempo. Si las dos primeras ejecuciones fallan, se recomienda reintentarlas, ya que en la mayoría de los casos, las pruebas logran completarse exitosamente después de estos dos intentos.

### Instalación de dependencias:
- Las dependencias del proyecto están definidas en los archivos package.json y package-lock.json. Para instalarlas, primero se debe ejecutar `npm install` para descargar e instalar todas las dependencias especificadas.

### Instalacion de Ghost
- Primero: Instalar Ghost-CLI 
`npm install ghost-cli@latest -g`

- Luego, en su terminal, acceda a un directorio vacío y ejecute el comando de instalación:
`ghost install local`

- Una vez finalizada la instalación, dirigase a  `http://localhost:2368/ghost` para acceder a Ghost Admin.

### Ejecución en Cypress
- **Instalación de Cypress:** Cypress se instala con el comando `npm install cypress --save-dev`. Una vez instalado, puede verificar la versión en el archivo package.json la cual debe ser `13.5.2` para asegurar la compatibilidad con este repositorio.
  
- **Configuración de credenciales:** En la ruta `cypress/fixtures/`, se encuentra el archivo `properties.json`, donde es necesario reemplazar los valores de `email` y `password` con las credenciales para ejecutar las pruebas correctamente.

- **Ejecución de pruebas**: Para iniciar las pruebas, se abre una terminal y se ejecuta el comando `npx cypress open`, lo que lanzará la interfaz de Cypress. A continuación, cree un nuevo proyecto apuntando al directorio donde se clonó el repositorio. Dentro de la carpeta e2e hay dos subcarpetas:

  **1. version_rc:** Contiene 20 archivos identificados con el código `E000XXX`, cada uno representando un escenario de prueba específico diseñado para la versión 5.96 de Ghost.<br>
  
  **2. version_base:** Contiene 10 archivos también identificados con el código `E000XXX`, que corresponden a escenarios de prueba para la versión 4.5 de Ghost.

 - Para ejecutar las pruebas, seleccione cada archivo `E000XXX.cy.js` y haga clic para ejecutarlo. Se recomienda realizar la ejecución de los archivos uno por uno para garantizar la ejecución exitosa de cada escenario de prueba. Adicionalmente, para correr los escenarios de la carpeta `version_rc` debe estar desplegada la versión de Ghost `5.96` y para correr los escenarios de la carpeta `version_base` debe estar desplegada la versión de Ghost `4.5`.
  
### Ejecución en Kraken
- **Instalación de Kraken:** Para instalar Kraken, utiliza el comando `npm install kraken-node`. Después de la instalación, es importante verificar que todos los prerequisitos necesarios estén cumplidos. Ejecuta el comando `npx kraken-node doctor` para confirmar que todos los componentes requeridos están instalados. Si algún prerequisito falta, se debe instalar antes de ejecutar las pruebas. Se recomienda tener una versión de Node de `16`.
  
- **Configuración de credenciales:** En la ruta `kraken\features\web\properties.json`, se encuentra el archivo `properties.json`, donde es necesario reemplazar los valores de `email` y `password` con las credenciales para ejecutar las pruebas correctamente.

- **Ejecución de pruebas**: En primera instancia, se debe ingresar a la carpeta de Kraken. Para ello, desde la terminal se debe correr el comando `cd kraken`. Luego, en la ruta `kraken\features\features` hay dos subcarpetas:

  **1. version_rc:** Contiene 20 archivos identificados con el código `E000XXX`, cada uno representando un escenario de prueba específico diseñado para la versión 5.96 de Ghost.<br>
  
  **2. version_base:** Contiene 10 archivos también identificados con el código `E000XXX`, que corresponden a escenarios de prueba para la versión 4.5 de Ghost.

 - Para poder correr las pruebas es necesario ir copiando cada escenario, es decir, tomar cada `E000XXX.feature` y pegar su contenido en el archivo `features\ghost.feature` y luego ejecutar la prueba con el comando `npx kraken-node run`. Adicionalmente, para correr los escenarios de la carpeta `version_rc` debe estar desplegada la versión de Ghost `5.96` y para correr los escenarios de la carpeta `version_base` debe estar desplegada la versión de Ghost `4.5`.
