const searchBox = document.getElementById("searchBox");
const searchButton = document.getElementById("searchButton");
const questions = document.querySelectorAll(".question-item");

// Function to filter questions
function filterQuestions() {
    const searchQuery = searchBox.value.trim().toLowerCase();

    questions.forEach(question => {
        const title = question.querySelector(".question_title").textContent.toLowerCase();
        const content = question.querySelector(".question_content").textContent.toLowerCase();

        if (title.includes(searchQuery) || content.includes(searchQuery)) {
            question.style.display = "block";
        } else {
            question.style.display = "none";
        }
    });
}

// Perform real-time filtering while typing
searchBox.addEventListener("input", filterQuestions);

// When clicking "Search", clear the input but keep filtered results
searchButton.addEventListener("click", function () {
    searchBox.value = ""; // Clear input
    searchBox.focus(); // Keep input active
});


// using select branch  
document.getElementById("branchFilter").addEventListener("change", function () {
    const selectedBranch = this.value;
    const questions = document.querySelectorAll(".question-item"); // Get all question elements


    questions.forEach(question => {
        const questionBranch = question.getAttribute("data-branch"); // Get branch from data attribute
        if (selectedBranch === "all" || (questionBranch.includes(selectedBranch))) {
            question.style.display = "block"; // Show matching questions
        } else {
            question.style.display = "none"; // Hide non-matching questions
        }
    });
});
