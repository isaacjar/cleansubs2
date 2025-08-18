let historial = [];
let redoStack = [];
const maxHistorial = 20;

function guardarHistorial() {
  const area = document.getElementById("areaTexto");
  if (!area) return;

  const actual = area.value;
  const ultimo = historial[historial.length - 1];

  if (actual !== ultimo) {
    historial.push(actual);
    redoStack = [];
    if (historial.length > maxHistorial) {
      historial.shift();
    }
  }
}

function deshacer() {
  const area = document.getElementById("areaTexto");
  const msg = document.getElementById("msg");

  if (historial.length === 0) {
    msg.textContent = "⛔ No hay cambios para deshacer";
    return;
  }

  const estadoAnterior = historial.pop(); // este es el estado que queremos restaurar
  redoStack.push(area.value);             // guarda el estado actual para rehacer

  area.value = estadoAnterior;
  msg.textContent = "↩️ Se ha deshecho el último cambio";
}

function rehacer() {
  const area = document.getElementById("areaTexto");
  const msg = document.getElementById("msg");

  if (redoStack.length === 0) {
    msg.textContent = "⛔ No hay cambios para rehacer";
    return;
  }

  const estadoRehecho = redoStack.pop();
  historial.push(area.value); // guarda el estado actual antes de rehacer

  area.value = estadoRehecho;
  msg.textContent = "🔁 Se ha rehecho el cambio";
}

function F8textoChulo() {
  const area = document.getElementById("areaTexto");
  area.classList.remove("fuente-fija", "roboto-mono", "fira-code", "source-code");
  area.classList.add("titulo");
  document.getElementById("msg").textContent = "🎨 Cool style applied";
}

function aplicarFuenteFija() {
  const area = document.getElementById("areaTexto");
  area.classList.remove("titulo", "roboto-mono", "fira-code", "source-code");
  area.classList.add("fuente-fija");
  document.getElementById("msg").textContent = "🔤 Fixed-width font applied";
}

function cargarArchivoTexto() {
  const input = document.getElementById("archivoTexto");
  const area = document.getElementById("areaTexto");
  const msg = document.getElementById("msg");

  if (!input.files || input.files.length === 0) {
    msg.textContent = "⚠️ No se ha seleccionado ningún archivo";
    return;
  }

  const archivo = input.files[0];
  const lector = new FileReader();

  lector.onload = function(e) {
    area.value = e.target.result;
    guardarHistorial();
    msg.textContent = "✅ Archivo cargado correctamente";
  };

  lector.onerror = function() {
    msg.textContent = "❌ Error al leer el archivo";
  };

  lector.readAsText(archivo, "UTF-8");
}

function guardarTextoComoArchivo() {
  const area = document.getElementById("areaTexto");
  if (!area) return;

  const contenido = area.value;
  const ahora = new Date();
  const año = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const día = String(ahora.getDate()).padStart(2, '0');
  const hora = String(ahora.getHours()).padStart(2, '0');
  const minuto = String(ahora.getMinutes()).padStart(2, '0');
  const nombreArchivo = `CleanSubs_${año}${mes}${día}_${hora}${minuto}.txt`;

  const blob = new Blob([contenido], { type: 'text/plain' });
  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(blob);
  enlace.download = nombreArchivo;
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
}

function copiaPortapapeles() {
  const area = document.getElementById("areaTexto");
  const texto = area.value;

  navigator.clipboard.writeText(texto)
    .then(() => {
      document.getElementById("msg").textContent = "✅ Texto copiado al portapapeles";
    })
    .catch(err => {
      document.getElementById("msg").textContent = "❌ Error al copiar: " + err;
    });
}

function quitarLineasEnBlanco() {
  guardarHistorial();
  const area = document.getElementById("areaTexto");
  if (!area) return;

  const textoOriginal = area.value;
  const lineas = textoOriginal.split('\n');
  const lineasFiltradas = lineas.filter(linea => linea.trim() !== '');
  area.value = lineasFiltradas.join('\n');
  document.getElementById('msg').textContent = `Líneas en blanco eliminadas`;
}

function limpiarTexto() {
  guardarHistorial();
  const area = document.getElementById("areaTexto");
  const msg = document.getElementById("msg");
  const textoOriginal = area.value;

  const regexNumeros = /^\d+$/gm;
  const regexHoras = /^\d{2}:\d{2}:\d{2},\d{3}\s-->\s\d{2}:\d{2}:\d{2},\d{3}$/gm;

  let textoModificado = textoOriginal
    .replace(regexNumeros, '')
    .replace(regexHoras, '')
    .replace(/^\s*\n/gm, '');

  area.value = textoModificado;
  msg.textContent = "🧹 Se han eliminado líneas numéricas y líneas con hora";
}

function quitarSaltosDeLinea() {
  guardarHistorial();
  const area = document.getElementById("areaTexto");
  if (!area) return;

  const textoConEspacios = area.value.replace(/\r?\n/g, ' ');
  area.value = textoConEspacios;
  document.getElementById('msg').textContent = `Saltos de línea eliminados`;
}

function quitarEspacios() {
  guardarHistorial();
  const textarea = document.querySelector('.cuadro-texto textarea');
  const textoSinEspacios = textarea.value.replace(/[ \t]+/g, '');
  textarea.value = textoSinEspacios;

  const caracteresSinEspacios = textoSinEspacios.replace(/\s/g, '').length;
  document.getElementById('msg').textContent =
    `Caracteres sin espacios (saltos conservados): ${caracteresSinEspacios}`;
}

function borrarTexto() {
  guardarHistorial();
  const area = document.getElementById("areaTexto");
  const input = document.getElementById("textoABorrar");
  const msg = document.getElementById("msg");

  const textoOriginal = area.value;
  const textoABorrar = input.value;

  if (!textoABorrar) {
    msg.textContent = "⚠️ Ingresa el texto que deseas borrar";
    return;
  }

  const regex = new RegExp(textoABorrar, 'gi');
  const textoModificado = textoOriginal.replace(regex, '');
  area.value = textoModificado;
  msg.textContent = `🧹 Se han borrado todas las incidencias de "${textoABorrar}"`;
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

function toggleHerramientasExtra() {
  const extra = document.getElementById("herramientasExtra");
  const msg = document.getElementById("msg");

  if (extra.style.display === "none") {
    extra.style.display = "flex"; // o "block" según tu diseño 
    msg.textContent = "🧰 Herramientas adicionales activadas";
  } else {
    extra.style.display = "none"; 
     msg.textContent = "🧰 Herramientas adicionales ocultas";
  } 
}

function ajustaTiempoSubt() {
  const area = document.getElementById("areaTexto");
  const input = document.getElementById("timeSubt");
  const msg = document.getElementById("msg");

  const texto = area.value;
  const desplazamiento = input.value.trim();

  // Validar formato
  const regexFormato = /^([+-])(\d{2}):(\d{2}):(\d{2}),(\d{3})$/;
  const match = desplazamiento.match(regexFormato);

  if (!match) {
    msg.textContent = "⚠️ Formato inválido. Usa +00:00:01,500 o -00:00:02,000";
    return;
  }

  // Guardar estado actual antes de modificar
  guardarHistorial();
  
  const signo = match[1] === "+" ? 1 : -1;
  const horas = parseInt(match[2]);
  const minutos = parseInt(match[3]);
  const segundos = parseInt(match[4]);
  const milisegundos = parseInt(match[5]);

  const totalMs = signo * (
    horas * 3600000 +
    minutos * 60000 +
    segundos * 1000 +
    milisegundos
  );

  // Expresión para encontrar líneas de tiempo
  const regexTiempo = /(\d{2}):(\d{2}):(\d{2}),(\d{3})\s-->\s(\d{2}):(\d{2}):(\d{2}),(\d{3})/g;

  const textoModificado = texto.replace(regexTiempo, (match, h1, m1, s1, ms1, h2, m2, s2, ms2) => {
    const t1 = convertirATiempoMs(h1, m1, s1, ms1) + totalMs;
    const t2 = convertirATiempoMs(h2, m2, s2, ms2) + totalMs;

    return `${formatearTiempo(t1)} --> ${formatearTiempo(t2)}`;
  });

  area.value = textoModificado;
  msg.textContent = `⏱️ Tiempos ajustados en ${desplazamiento}`;
}

// Convierte tiempo a milisegundos
function convertirATiempoMs(h, m, s, ms) {
  return (
    parseInt(h) * 3600000 +
    parseInt(m) * 60000 +
    parseInt(s) * 1000 +
    parseInt(ms)
  );
}

// Convierte milisegundos a formato SRT
function formatearTiempo(ms) {
  if (ms < 0) ms = 0; // Evitar tiempos negativos

  const h = String(Math.floor(ms / 3600000)).padStart(2, '0');
  ms %= 3600000;
  const m = String(Math.floor(ms / 60000)).padStart(2, '0');
  ms %= 60000;
  const s = String(Math.floor(ms / 1000)).padStart(2, '0');
  const msFinal = String(ms % 1000).padStart(3, '0');

  return `${h}:${m}:${s},${msFinal}`;
}

function addNumbering() {
  guardarHistorial();

  const area = document.getElementById("areaTexto");
  const formatoInput = document.getElementById("formatoNumeracion");
  const msg = document.getElementById("msg");

  if (!area || !formatoInput) {
    msg.textContent = "⚠️ Área de texto o campo de formato no encontrado";
    return;
  }

  const formato = formatoInput.value.trim();
  const textoOriginal = area.value;
  const lineas = textoOriginal.split(/\r?\n/);

  let textoNumerado = "";

  if (/^9+$/.test(formato)) {
    // Formato numérico con ceros a la izquierda
    const longitud = formato.length;

    textoNumerado = lineas.map((linea, index) => {
      const numero = String(index + 1).padStart(longitud, '0');
      return `${numero} ${linea}`;
    }).join('\n');

    msg.textContent = `🔢 Numeración aplicada con ${longitud} dígitos`;
  } else {
    // Formato como viñeta personalizada
    textoNumerado = lineas.map(linea => `${formato} ${linea}`).join('\n');
    msg.textContent = `🔸 Viñeta "${formato}" aplicada a cada línea`;
  }

  area.value = textoNumerado;
}


window.addEventListener("DOMContentLoaded", () => {
  const area = document.getElementById("areaTexto");
  if (area && area.value.trim() !== "") {
    guardarHistorial();
  }
  document.getElementById("areaTexto").focus();
});

function limpiarTodo() {
  const area = document.getElementById("areaTexto");
  area.value = "";
  area.focus();
}
