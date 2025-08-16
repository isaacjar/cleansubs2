let historialTexto = '';

function accionBoton(numero) {
  const area = document.getElementById("areaTexto");
  area.value += `Has pulsado el Botón ${numero}\n`;
}

function cargarArchivoTexto() {
  const input = document.getElementById("archivoTexto");
  const area = document.getElementById("areaTexto");
  const msg = document.getElementById("msg");

  if (!input.files || input.files.length === 0) {
    msg.textContent = "⚠️ No se ha seleccionado ningún archivo.";
    return;
  }

  const archivo = input.files[0];
  const lector = new FileReader();

  lector.onload = function(e) {
    area.value = e.target.result;
    msg.textContent = "✅ Archivo cargado correctamente.";
  };

  lector.onerror = function() {
    msg.textContent = "❌ Error al leer el archivo.";
  };

  lector.readAsText(archivo, "UTF-8");
}


function guardarTextoComoArchivo() {
  const area = document.getElementById("areaTexto");
  historialTexto = area.value;
  if (!area) return;

  const contenido = area.value;

  // Obtener timestamp en formato YYYYMMDD_HHmm
  const ahora = new Date();
  const año = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const día = String(ahora.getDate()).padStart(2, '0');
  const hora = String(ahora.getHours()).padStart(2, '0');
  const minuto = String(ahora.getMinutes()).padStart(2, '0');

  const nombreArchivo = `CleanSubs_${año}${mes}${día}_${hora}${minuto}.txt`;

  // Crear blob y enlace de descarga
  const blob = new Blob([contenido], { type: 'text/plain' });
  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(blob);
  enlace.download = nombreArchivo;

  // Simular clic para descargar
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
}


function quitarLineasEnBlanco() {
  const area = document.getElementById("areaTexto");
  historialTexto = area.value;
  if (!area) return;

  const textoOriginal = area.value;
  const lineas = textoOriginal.split('\n');

  const lineasFiltradas = lineas.filter(linea => linea.trim() !== '');

  area.value = lineasFiltradas.join('\n');
  document.getElementById('msg').textContent = `Lineas en blanco eliminadas`;
}

function limpiarTexto() {
  const area = document.getElementById("areaTexto");
  const msg = document.getElementById("msg");

  const textoOriginal = area.value;

  // Expresión para líneas con solo números
  const regexNumeros = /^\d+$/gm;

  // Expresión para líneas con formato de hora (ej. 00:01:23,456 --> 00:01:25,789)
  const regexHoras = /^\d{2}:\d{2}:\d{2},\d{3}\s-->\s\d{2}:\d{2}:\d{2},\d{3}$/gm;

  // Eliminar líneas numéricas y líneas con hora
  let textoModificado = textoOriginal
    .replace(regexNumeros, '')
    .replace(regexHoras, '');

  // Eliminar líneas vacías que quedan después
  textoModificado = textoModificado.replace(/^\s*\n/gm, '');

  area.value = textoModificado;
  msg.textContent = "🧹 Se han eliminado líneas numéricas y líneas con hora.";
}


function quitarSaltosDeLinea() {
  const area = document.getElementById("areaTexto");
  historialTexto = area.value;
  if (!area) return;

  const textoConEspacios = area.value.replace(/\r?\n/g, ' ');
  area.value = textoConEspacios;
  document.getElementById('msg').textContent = `Saltos de línea eliminados`;
}

function deshacer() {
  const area = document.getElementById("areaTexto");
  const msg = document.getElementById("msg");

  if (!area) {
    msg.textContent = "⚠️ Área de texto no encontrada.";
    return;
  }

  if (historialTexto !== '') {
    area.value = historialTexto;
    msg.textContent = "↩️ Se ha deshecho el último cambio.";
  } else {
    msg.textContent = "⛔ No hay cambios para deshacer.";
  }
}

function aumentarTamaño() {
  const textarea = document.querySelector('.cuadro-texto textarea');
  let tamañoActual = parseInt(window.getComputedStyle(textarea).fontSize);
  if (tamañoActual < 100) {
    textarea.style.fontSize = (tamañoActual + 5) + 'px';
    document.getElementById('msg').textContent = 'Font: ' + textarea.style.fontSize;
  }
}

function disminuirTamaño() {
  const textarea = document.querySelector('.cuadro-texto textarea');
  let tamañoActual = parseInt(window.getComputedStyle(textarea).fontSize);
  if (tamañoActual > 20) {
    textarea.style.fontSize = (tamañoActual - 5) + 'px';
    document.getElementById('msg').textContent = 'Font: ' + textarea.style.fontSize;
  }
}

function contarLineas() {
  const texto = document.querySelector('.cuadro-texto textarea').value;
  const lineas = texto.split(/\r\n|\r|\n/).length;
  document.getElementById('msg').textContent = `Líneas: ${lineas}`;
}

function contarCaracteresConEspacios() {
  const texto = document.querySelector('.cuadro-texto textarea').value;
  const total = texto.length;
  document.getElementById('msg').textContent = `Caracteres (con espacios): ${total}`;
}

function contarCaracteresSinEspacios() {
  const texto = document.querySelector('.cuadro-texto textarea').value;
  const total = texto.replace(/\s/g, '').length;
  document.getElementById('msg').textContent = `Caracteres (sin espacios): ${total}`;
}

function quitarEspacios() {
  const textarea = document.querySelector('.cuadro-texto textarea');
  
  // Eliminar espacios y tabulaciones, pero conservar saltos de línea
  const textoSinEspacios = textarea.value.replace(/[ \t]+/g, '');
  
  // Actualizar el área de texto con el nuevo contenido
  textarea.value = textoSinEspacios;
  
  // Mostrar el conteo actualizado en el label "msg"
  const caracteresSinEspacios = textoSinEspacios.replace(/\s/g, '').length;
  document.getElementById('msg').textContent =
    `Caracteres sin espacios (saltos conservados): ${caracteresSinEspacios}`;
}

function borrarTexto() {
  const area = document.getElementById("areaTexto");
  const input = document.getElementById("textoABorrar");
  const msg = document.getElementById("msg");

  const textoOriginal = area.value;
  const textoABorrar = input.value;

  if (!textoABorrar) {
    msg.textContent = "⚠️ Ingresa el texto que deseas borrar.";
    return;
  }

  // Crear expresión regular global e insensible a mayúsculas
  const regex = new RegExp(textoABorrar, 'gi');

  // Reemplazar todas las coincidencias por cadena vacía
  const textoModificado = textoOriginal.replace(regex, '');

  area.value = textoModificado;

  msg.textContent = `🧹 Se han borrado todas las incidencias de "${textoABorrar}".`;
}