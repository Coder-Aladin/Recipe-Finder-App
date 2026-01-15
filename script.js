const searchBox = document.querySelector("#search-box");
const searchBtn = document.querySelector("#search-btn");
const recipeBox = document.querySelector(".recipe-container");
const recipeDetailBox = document.querySelector(".recipe-detail-box");
const detailBox = document.querySelector(".detail-box")
const closeBtn = document.getElementById("close-btn");
const loader = document.querySelector("#loader");

const getRecipes = async (recipeName) => {
    try {
         let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`;

    loader.innerHTML = "searching...";
    
    let response = await fetch(url);
    let data = await response.json();

    loader.innerHTML = "";

    data.meals.forEach(meal => {
        console.log(meal);
        
        let recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card")
        recipeCard.innerHTML = `
           <img src="${meal.strMealThumb}">
           <h3>${meal.strMeal}</h3>
           <p><span>${meal.strArea}</span> dish</p>
           <p>belongs to <span>${meal.strCategory}<span/> category</p>
        `;
 
        let viewRecipeBtn = document.createElement("button")
        viewRecipeBtn.innerHTML = "view recipe"
        recipeCard.appendChild(viewRecipeBtn)

        viewRecipeBtn.addEventListener("click", () => {
            recipeDetail(meal);
        });

        recipeBox.appendChild(recipeCard);
    });
    } catch (error) {
        loader.innerHTML = "couldn't find recipe"
    }
}

const getIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <=20; i++) {
        const ingredient = meal[`strIngredient${i}`];

        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        } else {
            break;
        }
    }

    return ingredientsList;
};

const recipeDetail = (meal) => {
    recipeDetailBox.style.display = 'block';
    
    detailBox.innerHTML = `
        <h2>${meal.strMeal}</h2>

        <h3>ingredients:</h3>
        <ul>${getIngredients(meal)}</ul>

        <div>
            <h3>instruction:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `;

};

closeBtn.addEventListener("click", () => {
    recipeDetailBox.style.display = 'none'
});


searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let query = searchBox.value.trim();

    if (query !== ""){
        if (query !== searchBox.value.trim()) {
            recipeBox.innerHTML = ""
            getRecipes(searchBox.value.trim())
        }
        else{
            recipeBox.innerHTML = ""
            getRecipes(searchBox.value.trim())
        }
    }
    else{
        alert("Enter Query To Find Recipe")
    }
});

