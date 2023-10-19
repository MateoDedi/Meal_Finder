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
    console.log(data.meals);
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
                <div class="modal">
                    <h2>${meal.strMeal}</h2>
                    <div class="ingr">
                        <h3>Ingredients:</h3>
                        <ol>
                            ${getIngredientsList(meal)}
                        </ol>
                    </div>
                    <h3>Instructions:</h3>
                    <div class="instructions">${meal.strInstructions}</div>
                </div>
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

function getIngredientsList(meal) {
    const ingredients = [];
    for (let i = 1; i <= ingredients.length + 1; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredients.push(`${measure} ${ingredient}`);
        }
    }
    return ingredients.map(item => `<li>${item}</li>`).join('');
}

grid.addEventListener("click", (event) => {
    const modalContainer = event.target.closest(".modalcontainer");
    if (modalContainer) {
        modalContainer.classList.add("hidden");
    }
});
