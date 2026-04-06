//see more and see less

document.addEventListener("DOMContentLoaded", function () {
    // Select all "see detail" links
    const seeDetailLinks = document.querySelectorAll(".website p");

    seeDetailLinks.forEach((link) => {
        link.addEventListener("click", function () {
            // Find the job description container and company description container
            const jobDescription =
                this.closest(".each_job").querySelector(".jobDescription");
            const companyDescription = this.closest(".each_job").querySelector(
                ".companyDescription"
            );

            // Toggle the 'full' class for jobDescription
            if (jobDescription) {
                jobDescription.classList.toggle("full");
            }

            // Toggle the 'full' class for companyDescription if it exists
            if (companyDescription) {
                companyDescription.classList.toggle("full");
            }

            // Change the text of "see detail" based on the state of the descriptions
            if (jobDescription && companyDescription) {
                if (
                    jobDescription.classList.contains("full") ||
                    companyDescription.classList.contains("full")
                ) {
                    this.textContent = "See less"; // Change text to "See less"
                } else {
                    this.textContent = "See detail"; // Change text back to "See detail"
                }
            } else if (jobDescription) {
                if (jobDescription.classList.contains("full")) {
                    this.textContent = "See less"; // Change text to "See less"
                } else {
                    this.textContent = "See detail"; // Change text back to "See detail"
                }
            }
        });
    });
});

// job filter

document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.getElementById("searchBox");
    const searchButton = document.getElementById("searchButton");
    const allJobs = document.querySelectorAll(".each_job");

    function filterJobs() {
        const searchText = searchBox.value.toLowerCase().trim();

        allJobs.forEach((job) => {
            const jobRole = job.querySelector(".jobRole")?.innerText.toLowerCase() || "";
            const companyName = job.querySelector(".companyName")?.innerText.toLowerCase() || "";
            const jobLocation = job.querySelector(".jobLocation")?.innerText.toLowerCase() || "";
            const jobType = job.querySelector(".jobType")?.innerText.toLowerCase() || "";

            if (
                jobRole.includes(searchText) ||
                companyName.includes(searchText) ||
                jobLocation.includes(searchText) ||
                jobType.includes(searchText)
            ) {
                job.style.display = "";
            } else {
                job.style.display = "none";
            }
        });
    }

    searchButton.addEventListener("click", function (e) {
        e.preventDefault(); // prevent page reload if inside a form
        filterJobs();
    });

    searchBox.addEventListener("input", filterJobs); // Also filter while typing
});
