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
  msg.textContent = "🧽 Caracteres occidentales eliminados";
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

  // Eliminar SÍMBOLOS
  const textoModificado = textoOriginal
    .replace(/\+/gi, '')
    .replace(/\*/gi, '')
	.replace(/®/gi, '')
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

  // Sustituir pinyin libros de la Biblia
  const textoModificado = textoOriginal
    .replace(/xī bó lái yǔ/g, 'Xībóláiyǔ')
	.replace(/ālā mǐ yǔ/g, 'Ālāmǐyǔ')
	.replace(/jīng juǎn/g, 'jīngjuǎn')
	.replace(/chuàng shì jì/g, 'Chuàngshìjì')
	.replace(/chū āijí jì/g, 'Chūāijíjì')
	.replace(/lì wèi jì/g, 'Lìwèijì')
	.replace(/mín shù jì/g, 'Mínshùjì')
	.replace(/shēn mìng jì/g, 'Shēnmìngjì')
	.replace(/yuē shū yà jì/g, 'Yuēshūyàjì')
	.replace(/shì shī jì/g, 'Shìshījì')
	.replace(/lù dé jì/g, 'Lùdéjì')
	.replace(/sāmǔ'ěr jì shàng/g, "Sāmǔ'ěrjì Shàng")
	.replace(/sāmǔ'ěr jì xià/g, "Sāmǔ'ěrjì Xià")
	.replace(/liè wáng jì shàng/g, 'Lièwángjì Shàng')
	.replace(/liè wáng jì xià/g, 'Lièwángjì Xià')
	.replace(/lìdài zhì shàng/g, 'Lìdàizhì Shàng')
	.replace(/lìdài zhì xià/g, 'Lìdàizhì Xià')
	.replace(/yǐ sī lā jì/g, 'Yǐsīlājì')
	.replace(/ní xī mǐ jì/g, 'Níxīmǐjì')
	.replace(/yǐ sī tiē jì/g, 'Yǐsītiējì')
	.replace(/yuē bó jì/g, 'Yuēbójì')
	.replace(/shīpiān/g, 'Shīpiān')
	.replace(/zhēnyán/g, 'Zhēnyán')
	.replace(/chuándào shū/g, 'Chuándàoshū')
	.replace(/yǎ gē/g, 'Yǎgē')
	.replace(/yǐ sài yà shū/g, 'Yǐsàiyàshū')
	.replace(/yé lì mǐ shū/g, 'Yélìmǐshū')
	.replace(/yé lì mǐ āi gē/g, "Yélìmǐ'āigē")
	.replace(/yǐ xī jié shū/g, 'Yǐxījiéshū')
	.replace(/dàn yǐ lǐ shū/g, 'Dànyǐlǐshū')
	.replace(/hé xī ā shū/g, "Héxī'āshū")
	.replace(/yuē ěr shū/g, "Yuē'ěrshū")
	.replace(/ā mó sī shū/g, 'Āmósīshū')
	.replace(/é bā dǐ yà shū/g, 'Ébādǐyàshū')
	.replace(/yuē ná shū/g, 'Yuēnáshū')
	.replace(/mí jiā shū/g, 'Míjiāshū')
	.replace(/nà hóng shū/g, 'Nàhóngshū')
	.replace(/hǎ bā gǔ shū/g, 'Hǎbāgǔshū')
	.replace(/xī fān yǎ shū/g, 'Xīfānyǎshū')
	.replace(/hā gāi shū/g, 'Hāgāishū')
	.replace(/sā jiā lì yǎ shū/g, 'Sājiālìyǎshū')
	.replace(/mǎ lā jī shū/g, 'Mǎlājīshū')
	.replace(/xīlà yǔ/g, 'Xīlàyǔ')
	.replace(/mǎ tài fúyīn/g, 'Mǎtài Fúyīn')
	.replace(/mǎ kě fúyīn/g, 'Mǎkě Fúyīn')
	.replace(/lù jiā fúyīn/g, 'Lùjiā Fúyīn')
	.replace(/yuē hàn fú yīn/g, 'Yuēhàn Fúyīn')
	.replace(/shǐ tú xíng chuán/g, 'Shǐtú Xíngchuán')
	.replace(/luómǎ shū/g, 'Luǒmǎshū')
	.replace(/gē lín duō qián shū/g, 'Gēlínduō Qiánshū')
	.replace(/gē lín duō hòu shū/g, 'Gēlínduō Hòushū')
	.replace(/jiā lā tài shū/g, 'Jiālàtàishū')
	.replace(/yǐ fú suǒ shū/g, 'Yǐfúsuǒshū')
	.replace(/féi lì bǐ shū/g, 'Féilìbǐshū')
	.replace(/gē luó xī shū/g, 'Gēluóxīshū')
	.replace(/tiē sā luó ní jiā qián shū/g, 'Tiēsāluóníjiā Qiánshū')
	.replace(/tiē sā luó ní jiā hòu shū/g, 'Tiēsāluóníjiā Hòushū')
	.replace(/tí mó tài qián shū/g, 'Tímòtài Qiánshū')
	.replace(/tí mó tài hòu shū/g, 'Tímòtài Hòushū')
	.replace(/tí duō shū/g, 'Tíduōshū')
	.replace(/féi lì mén shū/g, 'Féilìménshū')
	.replace(/xī bó lái shū/g, 'Xībóláishū')
	.replace(/yǎ gè shū/g, 'Yǎgèshū')
	.replace(/bǐ dé qián shū/g, 'Bǐdé Qiánshū')
	.replace(/bǐ dé hòu shū/g, 'Bǐdé Hòushū')
	.replace(/yuē hàn yī shū/g, 'Yuēhàn Yīshū')
	.replace(/yuē hàn èr shū/g, 'Yuēhàn Èrshū')
	.replace(/yuē hàn sān shū/g, 'Yuēhàn Sānshū')
	.replace(/yóu dà shū/g, 'Yóudàshū')
	.replace(/qǐ shì lù/g, 'Qǐshìlù')
// Sustituir pinyin NOMBRES PROPIOS
    .replace(/shàngdì/g, 'Shàngdì')
    .replace(/shàngdì/g, 'Shàngdì')
    .replace(/shàngdì/g, 'Shàngdì')
    .replace(/shàngdì/g, 'Shàngdì')
    .replace(/shàngdì/g, 'Shàngdì')
    .replace(/shàngdì/g, 'Shàngdì')
    .replace(/yēhéhuá/g, 'Yēhéhuá')
    .replace(/yēsū/g, 'Yēsū')

// Sustituir pinyin vocabulario común
    .replace(/yēsū/g, 'Yēsū')

    
  area.value = textoModificado;
  msg.textContent = "🧽 Se ha corregido el pinyin";
}

