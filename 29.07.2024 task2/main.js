const mazeAPI = "https://api.tvmaze.com/shows";
let movieDiv = document.getElementById("MovieDiv");
let searchForm = document.getElementById("forminput");
let searchInput = document.getElementById("searchbar");

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let query = searchInput.value.toLowerCase();
    filterMovies(query);
});

fetch(mazeAPI)
    .then(response => response.json())
    .then(data => {
        window.movies = data; 
        displayMovies(data);
    })
    .catch(error => console.error('Error fetching data:', error));

function displayMovies(movies) {
    movieDiv.innerHTML = '';
    movies.forEach(movie => {
        movieDiv.innerHTML += `
            <div class="col-md-3 mb-4">
                <div class="card" style="width: 18rem;">
                    <img src="${movie.image?.medium}" class="card-img-top" alt="${movie.name}">
                    <div class="card-body">
                      <h5 class="card-title">${movie.name}</h5>
                      <p class="card-text">Premiere: ${movie.premiered}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">Language: ${movie.language}</li>
                      <li class="list-group-item">Genres: ${movie.genres.join(', ')}</li>
                      <li class="list-group-item">Rating: ${movie.rating.average}</li>
                    </ul>
                    <div class="card-body">
                        <a href="${movie.officialSite}" class="btn btn-primary" target="_blank">Go to website</a>
                        <button class="btn btn-success" onclick="window.location.href='second.html?id=${movie.id}'">Go to details</button>
                    </div>
                </div>
            </div>`;
    });
}

function filterMovies(query) {
    let filteredMovies = window.movies.filter(movie => movie.name.toLowerCase().includes(query));
    displayMovies(filteredMovies);
}

