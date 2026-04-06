const searchInput = document.querySelector("#eventSearchBox");
const events = document.querySelectorAll(".each_event_div");
const event_search_btn = document.querySelector(".event_search_btn");

function searchFilter() {
    const searchValue = searchInput.value;


    events.forEach(event => {
        const eventHeading = event.querySelector(".event_heading").textContent.trim().toLocaleLowerCase();
        if(eventHeading.includes(searchValue)) {
            event.style.display = "block";
        } else {
            event.style.display = "none";
        }
    });
}

event_search_btn.addEventListener("click", () => {
    searchInput.value = "";
    // searchInput.focus();
});

searchInput.addEventListener("input", searchFilter);