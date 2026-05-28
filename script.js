/* =============================================
   script.js – CD Juventud Parla
   ============================================= */

'use strict';

/* ── Datos de equipos ── */
const teamsData = {
  /* ── MASCULINO ── */
  'benjamin-masc': {
    name: 'Benjamín Masculino',
    img: 'imagenes/equipo_masculino.jpg',
    clasificacion: 'https://www.rffm.es/competicion/clasificaciones?temporada=21&tipojuego=2&competicion=24037770&grupo=24312260&jornada=1',
    resultados:    'https://www.rffm.es/competicion/resultados?temporada=21&tipojuego=2&competicion=24037770&grupo=24312260&jornada=1'
  },
  'alevin-masc': {
    name: 'Alevín Masculino',
    img: 'imagenes/equipo_masculino.jpg',
    clasificacion: 'https://www.rffm.es/competicion/clasificaciones?temporada=21&tipojuego=2&competicion=24037771&grupo=24312261&jornada=1',
    resultados:    'https://www.rffm.es/competicion/resultados?temporada=21&tipojuego=2&competicion=24037771&grupo=24312261&jornada=1'
  },
  'infantil-masc': {
    name: 'Infantil Masculino',
    img: 'imagenes/equipo_masculino.jpg',
    clasificacion: 'https://www.rffm.es/competicion/clasificaciones?temporada=21&tipojuego=2&competicion=24037772&grupo=24312262&jornada=1',
    resultados:    'https://www.rffm.es/competicion/resultados?temporada=21&tipojuego=2&competicion=24037772&grupo=24312262&jornada=1'
  },
  'cadete-masc': {
    name: 'Cadete Masculino',
    img: 'imagenes/equipo_masculino.jpg',
    clasificacion: 'https://www.rffm.es/competicion/clasificaciones?temporada=21&tipojuego=2&competicion=24037774&grupo=24312264&jornada=1',
    resultados:    'https://www.rffm.es/competicion/resultados?temporada=21&tipojuego=2&competicion=24037774&grupo=24312264&jornada=1'
  },
  'juvenil-masc': {
    name: 'Juvenil Masculino',
    img: 'imagenes/equipo_masculino.jpg',
    clasificacion: 'https://www.rffm.es/competicion/clasificaciones?temporada=21&tipojuego=2&competicion=24037775&grupo=24312265&jornada=1',
    resultados:    'https://www.rffm.es/competicion/resultados?temporada=21&tipojuego=2&competicion=24037775&grupo=24312265&jornada=1'
  },
  /* ── FEMENINO ── */
  'benjamin-fem': {
    name: 'Benjamín Femenino',
    img: 'imagenes/equipo_femenino.jpg',
    clasificacion: 'https://www.rffm.es/competicion/clasificaciones?temporada=21&tipojuego=2&competicion=24037773&grupo=24312263&jornada=1',
    resultados:    'https://www.rffm.es/competicion/resultados?temporada=21&tipojuego=2&competicion=24037773&grupo=24312263&jornada=1'
  },
  'alevin-fem': {
    name: 'Alevín Femenino',
    img: 'imagenes/equipo_femenino.jpg',
    clasificacion: 'https://www.rffm.es/competicion/clasificaciones?temporada=21&tipojuego=2&competicion=24037773&grupo=24312263&jornada=26',
    resultados:    'https://www.rffm.es/competicion/calendario?temporada=21&tipojuego=2&competicion=24037773&grupo=24312263&jornada=26&jornada=26'
  },
  'infantil-fem': {
    name: 'Infantil Femenino',
    img: 'imagenes/equipo_femenino.jpg',
    clasificacion: 'https://www.rffm.es/competicion/clasificaciones?temporada=21&tipojuego=2&competicion=24037776&grupo=24312266&jornada=1',
    resultados:    'https://www.rffm.es/competicion/resultados?temporada=21&tipojuego=2&competicion=24037776&grupo=24312266&jornada=1'
  },
  'cadete-fem': {
    name: 'Cadete Femenino',
    img: 'imagenes/equipo_femenino.jpg',
    clasificacion: 'https://www.rffm.es/competicion/clasificaciones?temporada=21&tipojuego=2&competicion=24037777&grupo=24312267&jornada=1',
    resultados:    'https://www.rffm.es/competicion/resultados?temporada=21&tipojuego=2&competicion=24037777&grupo=24312267&jornada=1'
  },
  'juvenil-fem': {
    name: 'Juvenil Femenino',
    img: 'imagenes/equipo_femenino.jpg',
    clasificacion: 'https://www.rffm.es/competicion/clasificaciones?temporada=21&tipojuego=2&competicion=24037778&grupo=24312268&jornada=1',
    resultados:    'https://www.rffm.es/competicion/resultados?temporada=21&tipojuego=2&competicion=24037778&grupo=24312268&jornada=1'
  }
};

/* =============================================
   NAVBAR SCROLL
   ============================================= */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* =============================================
   MOBILE MENU
   ============================================= */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Cerrar al pulsar un enlace
navMenu.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// Cerrar al pulsar fuera
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) navMenu.classList.remove('open');
});

/* =============================================
   TABS (MASCULINO / FEMENINO)
   ============================================= */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(`tab-${target}`).classList.add('active');
  });
});

/* =============================================
   MODAL EQUIPO
   ============================================= */
const modalEquipo      = document.getElementById('modalEquipo');
const closeModalEquipo = document.getElementById('closeModalEquipo');
const modalEquipoTitle = document.getElementById('modalEquipoTitle');
const modalEquipoImg   = document.getElementById('modalEquipoImg');
const btnClasificacion = document.getElementById('btnClasificacion');
const btnResultados    = document.getElementById('btnResultados');
const iframeWrap       = document.getElementById('iframeWrap');
const rffmIframe       = document.getElementById('rffmIframe');
const closeIframe      = document.getElementById('closeIframe');

let currentTeam = null;

function openEquipoModal(teamKey) {
  const team = teamsData[teamKey];
  if (!team) return;
  currentTeam = team;

  modalEquipoTitle.textContent = team.name;
  modalEquipoImg.src = team.img;
  modalEquipoImg.alt = `Foto ${team.name}`;

  // reset iframe
  iframeWrap.style.display = 'none';
  rffmIframe.src = '';
  btnClasificacion.classList.remove('active');
  btnResultados.classList.remove('active');

  modalEquipo.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeEquipoModal() {
  modalEquipo.classList.remove('open');
  document.body.style.overflow = '';
  rffmIframe.src = '';
}

// Abrir con botones de equipo
document.querySelectorAll('.team-card').forEach(card => {
  card.addEventListener('click', () => openEquipoModal(card.dataset.team));
});
document.querySelectorAll('.btn-team').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    openEquipoModal(btn.closest('.team-card').dataset.team);
  });
});

closeModalEquipo.addEventListener('click', closeEquipoModal);

modalEquipo.addEventListener('click', (e) => {
  if (e.target === modalEquipo) closeEquipoModal();
});

// Botones Clasificación / Resultados
function loadRffm(url, activeBtn) {
  iframeWrap.style.display = 'block';
  rffmIframe.src = url;
  btnClasificacion.classList.remove('active');
  btnResultados.classList.remove('active');
  activeBtn.classList.add('active');
  iframeWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

btnClasificacion.addEventListener('click', () => {
  if (currentTeam) loadRffm(currentTeam.clasificacion, btnClasificacion);
});
btnResultados.addEventListener('click', () => {
  if (currentTeam) loadRffm(currentTeam.resultados, btnResultados);
});
closeIframe.addEventListener('click', () => {
  iframeWrap.style.display = 'none';
  rffmIframe.src = '';
  btnClasificacion.classList.remove('active');
  btnResultados.classList.remove('active');
});

/* =============================================
   MODAL PREINSCRIPCIÓN
   ============================================= */
const modalPreins      = document.getElementById('modalPreins');
const closeModalPreins = document.getElementById('closeModalPreins');
const formPreins       = document.getElementById('formPreins');
const formMsg          = document.getElementById('formMsg');
const btnSubmit        = document.getElementById('btnSubmitForm');

function openPreinsModal() {
  modalPreins.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closePreinsModal() {
  modalPreins.classList.remove('open');
  document.body.style.overflow = '';
}

// Botones que abren inscripción
['btnInscripcionHero', 'btnInscripcionNav', 'btnInscripcionContacto'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', openPreinsModal);
});

closeModalPreins.addEventListener('click', closePreinsModal);
modalPreins.addEventListener('click', (e) => {
  if (e.target === modalPreins) closePreinsModal();
});

/* ── Validación y envío ── */
function showMsg(type, text) {
  formMsg.className = `form-msg ${type}`;
  formMsg.textContent = text;
  formMsg.style.display = 'block';
}

function clearErrors() {
  formPreins.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  formMsg.style.display = 'none';
}

function validateForm() {
  let valid = true;
  const required = formPreins.querySelectorAll('[required]');

  required.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('error');
      valid = false;
    }
  });

  // Validar email
  const email = document.getElementById('email');
  if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    email.classList.add('error');
    valid = false;
  }

  // Validar teléfono
  const tel = document.getElementById('telefono');
  if (tel.value && !/^[0-9]{9}$/.test(tel.value.replace(/\s/g, ''))) {
    tel.classList.add('error');
    valid = false;
  }

  return valid;
}

formPreins.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors();

  if (!validateForm()) {
    showMsg('error-msg', 'Por favor, revisa los campos marcados en rojo.');
    return;
  }

  const data = new FormData(formPreins);
  btnSubmit.disabled = true;
  btnSubmit.textContent = 'Enviando...';

  try {
    const res = await fetch('enviar.php', {
      method: 'POST',
      body: data
    });

    const json = await res.json();

    if (json.success) {
      showMsg('success', '✅ ¡Preinscripción enviada! Nos pondremos en contacto contigo pronto.');
      formPreins.reset();
      btnSubmit.textContent = '¡Enviado!';
    } else {
      showMsg('error-msg', json.message || 'Error al enviar. Inténtalo de nuevo.');
      btnSubmit.disabled = false;
      btnSubmit.textContent = 'Enviar Preinscripción';
    }
  } catch (err) {
    showMsg('error-msg', 'Error de conexión. Inténtalo más tarde.');
    btnSubmit.disabled = false;
    btnSubmit.textContent = 'Enviar Preinscripción';
  }
});

// Quitar error al escribir
formPreins.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('input', () => el.classList.remove('error'));
});

/* =============================================
   CERRAR MODALES CON ESC
   ============================================= */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeEquipoModal();
    closePreinsModal();
  }
});

/* =============================================
   FORMULARIO DE CONTACTO
   ============================================= */
const formContacto    = document.getElementById('formContacto');
const contactMsg      = document.getElementById('contactMsg');
const btnContacto     = document.getElementById('btnContactoSubmit');

if (formContacto) {
  formContacto.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Limpiar errores previos
    formContacto.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    contactMsg.style.display = 'none';

    const nombre  = document.getElementById('contactNombre');
    const email   = document.getElementById('contactEmail');
    const mensaje = document.getElementById('contactMensaje');
    let valid = true;

    if (!nombre.value.trim())  { nombre.classList.add('error');  valid = false; }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add('error'); valid = false;
    }
    if (!mensaje.value.trim()) { mensaje.classList.add('error'); valid = false; }

    if (!valid) {
      contactMsg.className = 'form-msg error-msg';
      contactMsg.textContent = 'Por favor, rellena todos los campos correctamente.';
      contactMsg.style.display = 'block';
      return;
    }

    const data = new FormData(formContacto);
    // Identificar que es el formulario de contacto (no preinscripción)
    data.append('tipo', 'contacto');

    btnContacto.disabled = true;
    btnContacto.textContent = 'Enviando...';

    try {
      const res  = await fetch('enviar.php', { method: 'POST', body: data });
      const json = await res.json();

      if (json.success) {
        contactMsg.className = 'form-msg success';
        contactMsg.textContent = '✅ Mensaje enviado. ¡Nos pondremos en contacto contigo pronto!';
        contactMsg.style.display = 'block';
        formContacto.reset();
        btnContacto.textContent = '¡Enviado!';
      } else {
        contactMsg.className = 'form-msg error-msg';
        contactMsg.textContent = json.message || 'Error al enviar. Inténtalo de nuevo.';
        contactMsg.style.display = 'block';
        btnContacto.disabled = false;
        btnContacto.textContent = 'Enviar Mensaje';
      }
    } catch {
      contactMsg.className = 'form-msg error-msg';
      contactMsg.textContent = 'Error de conexión. Inténtalo más tarde.';
      contactMsg.style.display = 'block';
      btnContacto.disabled = false;
      btnContacto.textContent = 'Enviar Mensaje';
    }
  });

  // Quitar error al escribir
  formContacto.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('error'));
  });
}

/* =============================================
   ANIMACIONES AL HACER SCROLL (Intersection Observer)
   ============================================= */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.value-card, .team-card, .noticia-card, .contacto-info, .contacto-map').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(25px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});
