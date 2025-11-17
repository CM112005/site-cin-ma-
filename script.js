document.addEventListener('DOMContentLoaded', function() {
  const films = document.querySelectorAll('.film');
  const modal = document.getElementById('filmModal');
  const title = document.getElementById('modal-title');
  const age = document.getElementById('modal-age');
  const duree = document.getElementById('modal-duree');
  const synopsis = document.getElementById('modal-synopsis');
  const date = document.getElementById('modal-date');
  const realisateur = document.getElementById('modal-realisateur');
  const closeBtn = document.querySelector('.modal-close');

  films.forEach(film => {
    film.addEventListener('click', function() {
      title.textContent = film.dataset.title;
      age.textContent = film.dataset.age;
      duree.textContent = film.dataset.duree;
      synopsis.textContent = film.dataset.synopsis;
      date.textContent = film.dataset.date;
      realisateur.textContent = film.dataset.realisateur;
      modal.style.display = 'block';
    });
  });

  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
});
