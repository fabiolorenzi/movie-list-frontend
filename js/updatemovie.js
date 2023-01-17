function updatemovie() {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    let title = document.getElementById("titleI").value;
    let genre = document.getElementById("genreI").value;
    let rel = document.getElementById("yearI").value;
    let descr = document.getElementById("descI").value;
    let img = document.getElementById("imgI").value;
    fetch("https://movielistbackend.hopto.org/api/movies/update.php", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": id,
            "title": title,
            "genre": genre,
            "rel": rel,
            "descr": descr,
            "img": img
        })
    })
    .then(resp => resp.json())
    .then(() => alert("Movie updated successfully"))
    .then(() => location.href = "index.html")
    .catch(err => console.log(err));
};