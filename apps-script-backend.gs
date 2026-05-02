/**
 * Backend Google Apps Script para recibir archivos desde index.html
 * 1. Pega este código en script.google.com
 * 2. Cambia PARENT_FOLDER_ID si usarás otra carpeta
 * 3. Implementa como Web App: Execute as Me / Anyone o Anyone with Google account
 */
const PARENT_FOLDER_ID = '1cyvbe3brJHMCKTRNCvkFpDHpZdJfdf3U';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    if (!payload.nombre || !payload.contacto) throw new Error('Faltan datos obligatorios.');
    if (!payload.files || !payload.files.length) throw new Error('No se recibieron archivos.');

    const parent = DriveApp.getFolderById(PARENT_FOLDER_ID);
    const safeName = sanitize_(payload.nombre);
    const safeTipo = sanitize_(payload.tipo || 'Registro');
    const folio = sanitize_(payload.folio || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMddHHmmss'));
    const folderName = `${Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd')} - ${safeTipo} - ${safeName} - ${folio}`;
    const folder = parent.createFolder(folderName);

    const metadata = {
      folio: payload.folio,
      nombre: payload.nombre,
      contacto: payload.contacto,
      tipo: payload.tipo,
      area: payload.area,
      comentarios: payload.comentarios,
      fecha: payload.fecha,
      carpeta: folderName
    };
    folder.createFile('datos_registro.json', JSON.stringify(metadata, null, 2), MimeType.PLAIN_TEXT);

    payload.files.forEach((file) => {
      const bytes = Utilities.base64Decode(file.data);
      const blob = Utilities.newBlob(bytes, file.type || 'application/octet-stream', sanitize_(file.name || 'archivo'));
      folder.createFile(blob);
    });

    return json_({ ok: true, folio, folderName });
  } catch (err) {
    return json_({ ok: false, error: err.message });
  }
}

function doGet() {
  return json_({ ok: true, message: 'Servicio activo para carga de documentos.' });
}

function sanitize_(value) {
  return String(value || '').replace(/[\\/:*?"<>|#%{}~&]/g, '-').trim().substring(0, 120) || 'sin-dato';
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
