function addReview() {
    let title = document.getElementById("titleIR").value;
    let text = document.getElementById("textR").value;
    fetch("https://movie-list-backend22.herokuapp.com/api/reviews/create.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "title": title,
            "text": text
        })
    })
    .then(resp => resp.json())
    .then(() => alert("Review added successfully"))
    .then(() => location.load())
    .catch(err => console.log(err));
};