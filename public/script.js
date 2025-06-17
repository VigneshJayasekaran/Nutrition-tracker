document.getElementById('fetch-nutrition').addEventListener('click', async function() {
    let foodName = document.getElementById('food-name').value;
    if (!foodName) return alert("Please enter a food name.");

    let apiKey = "Runs6LCBCyzmlkDUgbPDPUe4HgQcjmQAoh00xb4T"; // Replace with your USDA FoodData Central API key
    let url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(foodName)}&api_key=${apiKey}`;
    
    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.foods && data.foods.length > 0) {
            let food = data.foods[0];
            let nutrients = {};
            
            food.foodNutrients.forEach(nutrient => {
                nutrients[nutrient.nutrientName] = nutrient.value;
            });

            document.getElementById('calories').value = (nutrients["Energy"] || 0).toFixed(2);
            document.getElementById('protein').value = (nutrients["Protein"] || 0).toFixed(2);
            document.getElementById('carbs').value = (nutrients["Carbohydrate, by difference"] || 0).toFixed(2);
            document.getElementById('fats').value = (nutrients["Total lipid (fat)"] || 0).toFixed(2);
        } else {
            alert("No data found for this food.");
        }
    } catch (error) {
        console.error("Error fetching nutrition data:", error);
    }
});

document.getElementById('food-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let foodName = document.getElementById('food-name').value;
    let calories = parseInt(document.getElementById('calories').value);
    let protein = parseInt(document.getElementById('protein').value);
    let carbs = parseInt(document.getElementById('carbs').value);
    let fats = parseInt(document.getElementById('fats').value);

    let listItem = document.createElement('li');
    listItem.textContent = `${foodName} - ${calories} kcal, Protein: ${protein}g, Carbs: ${carbs}g, Fats: ${fats}g`;
    document.getElementById('food-list').appendChild(listItem);

    let totalCalories = document.getElementById('total-calories');
    let totalProtein = document.getElementById('total-protein');
    let totalCarbs = document.getElementById('total-carbs');
    let totalFats = document.getElementById('total-fats');

    totalCalories.textContent = parseInt(totalCalories.textContent) + calories;
    totalProtein.textContent = parseInt(totalProtein.textContent) + protein;
    totalCarbs.textContent = parseInt(totalCarbs.textContent) + carbs;
    totalFats.textContent = parseInt(totalFats.textContent) + fats;

    document.getElementById('food-form').reset();
});