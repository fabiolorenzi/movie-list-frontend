function addmovie() {
    let title = document.getElementById("titleI").value;
    let genre = document.getElementById("genreI").value;
    let rel = document.getElementById("yearI").value;
    let descr = document.getElementById("descI").value;
    let img = document.getElementById("imgI").value;
    fetch("https://movielistbackend.hopto.org/api/movies/create.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "title": title,
            "genre": genre,
            "rel": rel,
            "descr": descr,
            "img": img
        })
    })
    .then(resp => resp.json())
    .then(() => alert("Movie added successfully"))
    .then(() => location.href = "index.html")
    .catch(err => console.log(err));
};