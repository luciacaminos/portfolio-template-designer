let currentImageIndex = 0;
let currentGallery = [];

function showYear(year, btn) {
  const allGalleries = ['gallery-2024', 'gallery-2025'];
  allGalleries.forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('showing');
    el.classList.add('hidden');
  });

  const selected = document.getElementById('gallery-' + year);
  setTimeout(() => {
    selected.classList.remove('hidden');
    requestAnimationFrame(() => selected.classList.add('showing'));
  }, 100);

  currentGallery = Array.from(selected.querySelectorAll('img'));
  document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function openModal(img) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImage');
  const modalInfo = document.getElementById('modalInfo');
  modal.classList.remove('hidden');
  modalImg.src = img.src;
  currentImageIndex = currentGallery.indexOf(img);

  const tempImg = new Image();
  tempImg.onload = function () {
    fetch(img.src)
      .then(res => res.blob())
      .then(blob => {
        const sizeMB = (blob.size / 1024 / 1024).toFixed(2);
        modalInfo.innerHTML = `Dimensions : ${tempImg.width}x${tempImg.height}px<br>Taille : ${sizeMB} Mo`;
      })
      .catch(() => modalInfo.textContent = "Impossible de charger les infos.");
  };
  tempImg.src = img.src;
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

function prevImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    document.getElementById('modalImage').src = currentGallery[currentImageIndex].src;
  }
}

function nextImage() {
  if (currentImageIndex < currentGallery.length - 1) {
    currentImageIndex++;
    document.getElementById('modalImage').src = currentGallery[currentImageIndex].src;
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => alert('Texte copié dans le presse-papier !'))
    .catch(err => console.error('Erreur de copie :', err));
}

document.getElementById('darkModeToggle').addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  document.getElementById('darkModeToggle').textContent = isDark ? "🌞" : "🌙";
  localStorage.setItem("dark-mode", isDark);
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark-mode");
    document.getElementById('darkModeToggle').textContent = "🌞";
  }
  currentGallery = Array.from(document.querySelector('#gallery-2024').querySelectorAll('img'));
});
