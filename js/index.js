const target_id = document.getElementById("main_container_home");

function renderBody(status) {
    if (status) {
        target_id.innerHTML = 
            `<div id="spinner">
                <div class="spinner_container">
                    <img src="media/spinner.png" alt="spinner" />
                </div>
            </div>`;
    }
};

document.addEventListener("DOMContentLoaded", function() {
    var isLoading = true;
    renderBody(isLoading);
});