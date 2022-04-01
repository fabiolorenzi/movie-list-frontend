const target_id = document.getElementById("main_container_home");

var movies = Array();
var reviews = Array();

function renderBody(loading) {
    if (loading) {
        target_id.innerHTML = 
            `<div id="spinner">
                <div class="spinner_container">
                    <img src="media/spinner.png" alt="spinner" />
                </div>
            </div>`;
    } else if (!loading && movies.length === 0) {
        target_id.innerHTML =
            `<div id="nomovies">
                <h1>No movies found</h1>
            </div>`;
    } else {
        target_id.innerHTML = `<ul id="movies_list"></ul>`;
        movies.forEach(movie => {
            document.getElementById("movies_list").innerHTML +=
                `<li class="movie" key=${movie.id + "M"}>
                    <div class="movie_img">
                        <img src=${movie.img} alt="movie_poster" />
                    </div>
                    <div class="movie_body">
                        <div class="movie_data">
                            <h2>Title: ${movie.title}</h2>
                            <h2>Genre: ${movie.genre}</h2>
                            <h2>Year: ${movie.rel}</h2>
                        </div>
                        <div class="movie_desc">
                            <p>${movie.descr}</p>
                        </div>
                        <div class="movie_buttons">
                            <button class="updateButton" onclick="updateMovie(${movie.id})">Update</button>
                            <button class="removeButton" onclick="removeMovie(${movie.id})">Remove</button>
                            <button class="reviewsButton" onclick="showReviews(${movie.id})">Reviews</button>
                        </div>
                    </div>
                </li>`
            ;
        });
    };
};

document.addEventListener("DOMContentLoaded", () => {
    renderBody(true);
    fetch("https://movie-list-backend22.herokuapp.com/api/movies/read.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(data => movies = data)
    .then(() => renderBody(false))
    .then(() => getReviews())
    .catch(err => console.log(err));
});

function updateMovie(id) {
    location.href = "update-movie.html/?id=" + id;
};

function removeMovie(id) {
    fetch("https://movie-list-backend22.herokuapp.com/api/movies/delete.php", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": id
        })
    })
    .then(resp => resp.json())
    .then(() => alert("Movie removed successfully"))
    .then(() => location.reload())
    .catch(err => console.log(err));
};

function getReviews() {
    fetch("https://movie-list-backend22.herokuapp.com/api/reviews/read.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(data => reviews = data)
    .catch(err => console.log(err));
};

function showReviews(id) {
    location.href = "reviews.html?id=" + id;
};

function addReview(id) {
    let val = document.getElementById(id + "IR").value;
    let titleMovie = "";
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].id === id) {
            titleMovie = movies[i].title;
        };
    };
    if (titleMovie.length > 0 && val.length > 0) {
        fetch("https://movie-list-backend22.herokuapp.com/api/reviews/create.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title": titleMovie,
                "text": val
            })
        })
        .then(resp => resp.json())
        .then(() => alert("Review inserted successfully"))
        .then(() => location.reload())
        .catch(err => console.log(err));
    };
};

/*
<div class="addReview_section">
                            <input type="text" name=${movie.title} value="" placeholder="Text" id=${movie.id + "IR"} />
                            <button class="reviewsButtonAdd" onclick="addReview(${movie.id})">Add</button>
                        </div>*/