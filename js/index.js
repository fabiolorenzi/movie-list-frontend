const target_id = document.getElementById("main_container_home");

var movies = Array();

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
            if (movie.img.length > 0) {
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
                            </div>
                        </div>
                    </li>`
                ;
            }
        });
    };
};

document.addEventListener("DOMContentLoaded", () => {
    renderBody(true);
    fetch("https://movielistbackend.hopto.org/api/movies/read.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(data => movies = data)
    .then(() => renderBody(false))
    .catch(err => console.log(err));
});

function updateMovie(id) {
    location.href = "update-movie.html?id=" + id;
};

function removeMovie(id) {
    fetch("https://movielistbackend.hopto.org/api/movies/delete.php", {
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