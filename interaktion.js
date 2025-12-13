const overlays = document.querySelectorAll('.overlay');
const beschriftung = document.getElementById('beschreibungText');

function handleMouseEnter() {
  overlays.forEach(ov => ov.classList.add('visible')); // Flächen sichtbar machen
}

function handleMouseLeave() {
  overlays.forEach(ov => ov.classList.remove('visible')); // Flächen ausblenden
  beschriftung.textContent = '';
  beschriftung.classList.remove('visible'); // Beschreibung ausblenden
}

function handleMouseMove(e) {
  // Tooltip mit leichtem Offset zur Maus positionieren
  const halbBreite = 350;
  const offsetX = (e.pageX < halbBreite) ? 15 : -beschriftung.offsetWidth - 15;

  beschriftung.style.left = (e.pageX + offsetX) + "px";
  beschriftung.style.top = (e.pageY + 15) + "px";
  let found = false;

  overlays.forEach(overlay => {
    const rect = overlay.getBoundingClientRect();
    if (
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top && e.clientY <= rect.bottom
    ) {
      beschriftung.innerHTML = overlay.dataset.person;
      beschriftung.classList.add('visible');
      found = true;
    }
  });

  if (!found) {
    beschriftung.textContent = '';
    beschriftung.classList.remove('visible');
  }
}

function handleImageClick(e) {
  overlays.forEach(overlay => {
    const rect = overlay.getBoundingClientRect();
    if (
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top && e.clientY <= rect.bottom
    ) {
      window.location.href = overlay.dataset.link;
    }
  });
}


function clearBeschreibung() {
  const beschriftung = document.getElementById('beschreibungText');
  beschriftung.textContent = '';
  beschriftung.classList.remove('visible');
}

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const back = params.get('back');
  const backButton = document.getElementById('backButton');
  if (back && backButton) {
    backButton.onclick = () => window.location.href = back;
  }

  // Dia-Navigation mit Parameter erhalten
  const btnNext = document.getElementById('btn-next');
  const btnPrev = document.getElementById('btn-prev');
  const currentPage = window.location.pathname;
  const currentIndex = parseInt(currentPage.match(/dia(\d+)\.html$/i)?.[1] ?? 1);

  if (btnNext) {
    btnNext.onclick = () => {
      window.location.href = `dia${currentIndex + 1}.html?back=${encodeURIComponent(back)}`;
    };
  }

  if (btnPrev && currentIndex > 0) {
    btnPrev.onclick = () => {
      window.location.href = `dia${currentIndex - 1}.html?back=${encodeURIComponent(back)}`;
    };
  }
});


