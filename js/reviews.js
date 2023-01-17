function addReview() {
    let title = document.getElementById("titleR").value;
    let text = document.getElementById("textR").value;
    fetch("https://movielistbackend.hopto.org/api/reviews/create.php", {
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
    .then(() => location.reload())
    .catch(err => console.log(err));
};

function removeReview(id) {
    fetch("https://movielistbackend.hopto.org/api/reviews/delete.php", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": id
        })
    })
    .then(resp => resp.json())
    .then(() => alert("Review deleted successfully"))
    .then(() => location.reload())
    .catch(err => console.log(err));
};

document.addEventListener("DOMContentLoaded", () => {
    renderBody(true);
    fetch("https://movielistbackend.hopto.org/api/reviews/read.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(data => reviews = data)
    .then(() => renderBody(false))
    .catch(err => console.log(err));
});

const target_id = document.getElementById("reviewsBody");

var reviews = Array();

function renderBody(loading) {
    if (loading) {
        target_id.innerHTML = 
            `<div id="spinner">
                <div class="spinner_container">
                    <img src="media/spinner.png" alt="spinner" />
                </div>
            </div>`;
    } else if (!loading && reviews.length === 0) {
        target_id.innerHTML =
            `<div id="nomovies">
                <h1>No reviews yet</h1>
            </div>`;
    } else {
        target_id.innerHTML = `<ul id="movies_list"></ul>`;
        reviews.forEach(review => {
            if (review.text.length > 0) {
                document.getElementById("movies_list").innerHTML +=
                    `<div class="review">
                        <h1>${review.title}</h1>
                        <h2>${review.text}</h2>
                        <button class="removeButton" onclick="removeReview(${review.id})">Remove</button>
                    </div>`
                ;
            }
        });
    };
};