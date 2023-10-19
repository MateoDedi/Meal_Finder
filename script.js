const input = document.querySelector("#search");
const form = document.querySelector("form");
const grid = document.querySelector(".grid");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    fetchData();
});

async function fetchData() {
    grid.innerHTML = "";
    const inputValue = input.value;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);
    const data = await response.json();
    displayResults(data.meals);
}

function displayResults(meals) {
    if (!meals) {
        grid.innerHTML = '<p>No results found.</p>';
        return;
    }

    grid.innerHTML = meals.map((meal) => `
    <div class="meal">
        <div class="text">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h4>${meal.strMeal}</h4>
        </div>
        <div class="modalcontainer hidden">
            <!-- Modal content here -->
        </div>
    </div>
    `).join("");

    grid.querySelectorAll(".meal").forEach((meal) => {
        meal.addEventListener("click", () => {
            const modalContainer = meal.querySelector(".modalcontainer");
            modalContainer.classList.remove("hidden");
        });
    });
}

grid.addEventListener("click", (event) => {
    const modalContainer = event.target.closest(".modalcontainer");
    if (modalContainer) {
        modalContainer.classList.add("hidden");
    }
});