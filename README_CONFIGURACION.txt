CONFIGURACIÓN RÁPIDA

1) Crear backend en Google Apps Script
- Ir a https://script.google.com
- Nuevo proyecto
- Pegar el contenido de apps-script-backend.gs
- Verificar que PARENT_FOLDER_ID sea:
  1cyvbe3brJHMCKTRNCvkFpDHpZdJfdf3U

2) Dar permisos
- Ejecutar cualquier función por primera vez para autorizar DriveApp.
- Google pedirá permisos para crear carpetas y archivos en Drive.

3) Implementar como Web App
- Deploy / Implementar > New deployment / Nueva implementación
- Tipo: Web app
- Execute as / Ejecutar como: Me / Yo
- Who has access / Quién tiene acceso: Anyone o Anyone with Google account
- Copiar la URL de Web App.

4) Conectar el index
- Abrir index.html
- Buscar:
  const APPS_SCRIPT_URL = 'PEGAR_AQUI_URL_DE_APPS_SCRIPT';
- Pegar la URL de Web App entre comillas.

5) Subir a GitHub Pages
- Subir index.html y carpeta assets.
- El usuario verá solo la interfaz; los archivos se guardarán dentro de la carpeta Drive interna.

Notas:
- Tamaño máximo configurado en el index: 20 MB por archivo.
- Se crea una carpeta por registro con fecha, tipo, nombre y folio.
- Se guarda también datos_registro.json con los datos capturados.
