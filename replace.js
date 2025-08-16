function reemplazarDesdeCampoUnico() {
  guardarHistorial();
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

  // Crear expresión regular global
  const regex = new RegExp(buscar, 'g');

  // Reemplazar
  const textoModificado = area.value.replace(regex, reemplazo);
  area.value = textoModificado;

  msg.textContent = `🔄 Se ha reemplazado "${buscar}" por "${reemplazo}".`;
}

function eliminarCaracteresOccidentales() {
  guardarHistorial();

  const area = document.getElementById("areaTexto");
  const msg = document.getElementById("msg");

  if (!area) {
    msg.textContent = "⚠️ Área de texto no encontrada";
    return;
  }

  // Elimina letras latinas básicas y extendidas con tonos (Unicode Latin Extended-A, B, etc.)
  const textoLimpio = area.value.replace(/[\u0000-\u024F]/g, '');

  area.value = textoLimpio;
  msg.textContent = "🧽 Caracteres occidentales eliminados (incluye tonos latinos)";
}

function eliminarCaracteresChinos() {
  guardarHistorial();

  const area = document.getElementById("areaTexto");
  const msg = document.getElementById("msg");

  if (!area) {
    msg.textContent = "⚠️ Área de texto no encontrada";
    return;
  }

  // Elimina caracteres chinos y el punto chino "。"
  const textoLimpio = area.value.replace(/[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3002]/g, '');

  area.value = textoLimpio;
  msg.textContent = "🧽 Caracteres chinos eliminados";
}

function eliminarEspaciosInicio() {
  guardarHistorial();

  const area = document.getElementById("areaTexto");
  const msg = document.getElementById("msg");

  if (!area) {
    msg.textContent = "⚠️ Área de texto no encontrada";
    return;
  }

  const lineas = area.value.split(/\r?\n/);

  const textoLimpio = lineas.map(linea => linea.replace(/^\s+/, '')).join('\n');

  area.value = textoLimpio;
  msg.textContent = "🧹 Espacios al inicio de cada línea eliminados";
}

function eliminarSymbols() {
  guardarHistorial();
  const area = document.getElementById("areaTexto");
  const msg = document.getElementById("msg");
  const textoOriginal = area.value;

  // Eliminar todas las apariciones de <i> y </i>
  const textoModificado = textoOriginal
    .replace(/<b>/gi, '')
    .replace(/<\/b>/gi, '')
    .replace(/<u>/gi, '')
    .replace(/<\/u>/gi, '')
    .replace(/<i>/gi, '')
    .replace(/<\/i>/gi, '');

  area.value = textoModificado;
  msg.textContent = "🧽 Se han eliminado los símbolos";
}

function eliminarVocabulario() {
  guardarHistorial();
  const area = document.getElementById("areaTexto");
  const msg = document.getElementById("msg");
  const textoOriginal = area.value;

  // Eliminar todas las apariciones de <i> y </i>
  const textoModificado = textoOriginal
    .replace(/bǐdé qián shū/g, 'Bǐdé Qiánshū')
    .replace(/bǐdé hòu shū/g, 'Bǐdé Hòushū')
    .replace(/shàngdì/g, 'Shàngdì')
    .replace(/shàngdì/g, 'Shàngdì')
    .replace(/shàngdì/g, 'Shàngdì')
    .replace(/shàngdì/g, 'Shàngdì')
    .replace(/shàngdì/g, 'Shàngdì')
    .replace(/shàngdì/g, 'Shàngdì').replace(/chuàng shì jì/g, 'Chuàngshìjì')
    .replace(/gē lín duō qián shū/g, 'Gēlínduō Qiánshū')
    .replace(/gē lín duō hòu shū/g, 'Gēlínduō Hòushū')
    .replace(/jiā lā tài shū/g, 'Jiālātàishū')
    .replace(/liè wáng jì shàng/g, 'Lièwángjì Shàng')
    .replace(/liè wáng jì xià/g, 'Lièwángjì Xià')
    .replace(/lù jiā fúyīn/g, 'Lùjiāfúyīn')
    .replace(/mǎ lā jī shū/g, 'Mǎlājīshū')
    .replace(/mǎ kě fúyīn/g, 'Mǎkěfúyīn')
    .replace(/mǎ tài fúyīn/g, 'Mǎtàifúyīn')
    .replace(/qǐshì lù/g, 'Qǐshìlù')
    .replace(/sāmǔ'ěr jì shàng/g, "Sāmǔ'ěrjì Shàng")
    .replace(/sāmǔ'ěr jì xià/g, "Sāmǔ'ěrjì Xià")
    .replace(/shàngdì/g, 'Shàngdì')
    .replace(/shǐtú xíng chuán/g, 'Shǐtú Xíngzhuàn')  
    .replace(/xīlà yǔ/g, 'Xīlàyǔ')
    .replace(/yēhéhuá/g, 'Yēhéhuá')
    .replace(/yóudà shū/g, 'Yóudàshū')
    .replace(/yuēhàn fú yīn/g, 'Yuēhànfúyīn')
    .replace(/yuēhàn yī shū/g, 'Yuēhàn Yīshū')
    .replace(/yuēhàn èr shū/g, 'Yuēhàn Èrshū')
    .replace(/yuēhàn sān shū/g, 'Yuēhàn Sānshū');

  area.value = textoModificado;
  msg.textContent = "🧽 Se ha reemplazado el pinyin según replace.js";
}

