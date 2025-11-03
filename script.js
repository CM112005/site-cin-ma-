const movies = [
  {
    title: "Vice-Versa 2",
    releaseDate: "2024-06-19",
    genres: ["Animation", "Famille"],
    ageMin: 6,
    synopsis: "Les émotions d'une adolescente face à la puberté.",
    current: true,
    actors: ["Amy Poehler", "Phyllis Smith"],
    imageUrl: "https://fr.web.img6.acsta.net/c_310_420/pictures/24/05/14/12/33/4634897.jpg"
  },
  {
    title: "Mission Impossible VII",
    releaseDate: "2024-07-10",
    genres: ["Action", "Espionnage"],
    ageMin: 12,
    synopsis: "Ethan Hunt fait face à une menace mondiale.",
    current: true,
    actors: ["Tom Cruise", "Rebecca Ferguson"],
    imageUrl: "https://fr.web.img2.acsta.net/c_310_420/pictures/24/04/10/09/36/5295483.jpg"
  },
  {
    title: "Le Monde de Nemo",
    releaseDate: "2003-10-29",
    genres: ["Animation", "Aventure"],
    ageMin: 3,
    synopsis: "Un poisson clown traverse l'océan pour retrouver son fils.",
    current: false,
    actors: ["Albert Brooks", "Ellen DeGeneres"],
    imageUrl: "https://fr.web.img6.acsta.net/c_310_420/pictures/22/12/02/08/38/2490927.jpg"
  },
  {
    title: "Spider-Man : New Generation",
    releaseDate: "2018-12-12",
    genres: ["Animation", "Super-héros"],
    ageMin: 8,
    synopsis: "Un film d'animation innovant sur Spider-Man.",
    current: false,
    actors: ["Shameik Moore", "Jake Johnson"],
    imageUrl: "https://fr.web.img2.acsta.net/c_310_420/pictures/18/11/23/10/06/1348892.jpg"
  }
];

function displayMovies(list, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '<div class="movie-list">' +
    list.map(m => `
      <div class="movie-card">
          <img src="${m.imageUrl}" alt="${m.title}">
          <h3>${m.title}</h3>
          <p><b>Genres:</b> ${m.genres.join(', ')}</p>
          <p><b>Âge min:</b> ${m.ageMin}+</p>
          <p>${m.synopsis}</p>
      </div>
    `).join('') +
    '</div>';
}

function filterMovies(query = "", current = null, ageMin = null) {
  return movies.filter(movie => {
    let match = true;
    // Recherche texte
    if (query) {
      const txt = (movie.title + " " + movie.actors.join(" ") + " " + movie.genres.join(" ")).toLowerCase();
      match &= txt.includes(query.toLowerCase());
    }
    // Filtre actuel/archive
    if (current !== null) match &= (movie.current === current);
    // Filtre par âge
    if (ageMin !== null) match &= (ageMin >= movie.ageMin);
    return match;
  });
}

// Initialisation : affichage films actuels
displayMovies(filterMovies("", true), "current");
displayMovies(filterMovies("", false), "archive");

// Navigation tabs
const tabs = ["current", "archive", "age"];
tabs.forEach(tab => {
  document.getElementById(`tab-${tab}`).onclick = () => {
    tabs.forEach(t => {
      document.getElementById(t).style.display = t === tab ? "block" : "none";
      document.getElementById(`tab-${t}`).classList.toggle("active", t === tab);
    });
  };
});

// Barre de recherche
document.getElementById("searchBar").oninput = function() {
  const query = this.value;
  tabs.forEach(tab => {
    if(tab !== "age")
      displayMovies(filterMovies(query, tab === "current"), tab);
  });
};

// Suggestion par âge
document.getElementById("ageSelect").onchange = function() {
  const age = Number(this.value);
  const results = filterMovies("", null, age);
  const ageResults = document.getElementById("ageResults");
  if(results.length)
    ageResults.innerHTML = `<div class="movie-list">${results.map(m => `
      <div class="movie-card">
        <img src="${m.imageUrl}" alt="${m.title}">
        <h3>${m.title}</h3>
        <p><b>Genres:</b> ${m.genres.join(', ')}</p>
        <p><b>Âge min:</b> ${m.ageMin}+</p>
        <p>${m.synopsis}</p>
      </div>
    `).join('')}</div>`;
  else
    ageResults.innerHTML = "<p>Aucun film trouvé pour cet âge.</p>";
};

// Déclenche suggestion dès entrée sur la rubrique
document.getElementById("tab-age").onclick = function(){
  document.getElementById("ageSelect").dispatchEvent(new Event("change"));
}
