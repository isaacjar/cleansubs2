function reemplazarDesdeCampoUnico() {
  const area = document.getElementById("areaTexto");
  const input = document.getElementById("textoABorrar");
  const msg = document.getElementById("msg");

  const entrada = input.value;

  // Validar formato
  if (!entrada.includes("$$")) {
    msg.textContent = "⚠️ Usa el formato: texto_a_buscar$$texto_a_reemplazar";
    return;
  }

  // Separar en partes
  const [buscar, reemplazo] = entrada.split("$$");

  if (!buscar) {
    msg.textContent = "⚠️ El texto a buscar no puede estar vacío.";
    return;
  }

  // Guardar historial para deshacer
  historialTexto = area.value;

  // Crear expresión regular global
  const regex = new RegExp(buscar, 'g');

  // Reemplazar
  const textoModificado = area.value.replace(regex, reemplazo);
  area.value = textoModificado;

  msg.textContent = `🔄 Se ha reemplazado "${buscar}" por "${reemplazo}".`;
}

function eliminarSymbols() {
  const area = document.getElementById("areaTexto");
  const msg = document.getElementById("msg");
  const textoOriginal = area.value;

  // Eliminar todas las apariciones de <i> y </i>
  const textoModificado = textoOriginal
    .replace(/<i>/gi, '')
    .replace(/<\/i>/gi, '');

  area.value = textoModificado;
  msg.textContent = "🧽 Se han eliminado los símbolos";
}

function eliminarVocabulario() {
  const area = document.getElementById("areaTexto");
  const msg = document.getElementById("msg");
  const textoOriginal = area.value;

  // Eliminar todas las apariciones de <i> y </i>
  const textoModificado = textoOriginal
    .replace(/shàngdì/g, 'Shàngdì')
    .replace(/yēhéhuá/g, 'Yēhéhuá');

  area.value = textoModificado;
  msg.textContent = "🧽 Se han reemplazado las cadenas de replace.js";
}

