import uuidv4 from 'uuid/v4'

// Initializes recipes variable as an empty array into the global space
let recipes = []

/*
    This function fetches new value for "recipes" variable 
    based on the key(omonimus)/value pair stored into the local storage. 
*/
const loadRecipes = () => {
     if (localStorage.getItem('recipes')) {
        return recipes = JSON.parse(localStorage.getItem('recipes'))
     } else {
         // If no value is provided returns an empty array
         return recipes = []
     }
}

// Updates recipes variable and expose it
const getRecipes = () => loadRecipes()


// Sets a new key/value pair into the local storage based on "recipes" variable value
const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const addIngredient = (id, ingredientName) => {
    // Sanitizes ingredientName's string value
    ingredientName = ingredientName.trim().toLowerCase()
    // Checks recipe presence via id value
    let recipe = recipes.find(recipe => recipe.id === id)
    if (recipe) {
        const ingredientIsValid = ingredientName !== ''
        const ingredientNotExist = !Boolean(recipe.ingredients.find(ingredient => ingredient.name === ingredientName))
        /*
            If ingredientName is a valid string and its value 
            doesn't exists into the recipes array then we push it into the 
            recipe's ingredients array
        */
        if (ingredientIsValid && ingredientNotExist) {
            recipe.ingredients.push({
                name: ingredientName,
                inStock: false
            })
            saveRecipes()
        }
    }
}

// Adds a new recipe into the recipes's array
const createRecipe = title => {
    title = title.trim().toLowerCase()
    let recipe = {
        id: uuidv4(),
        title,
        steps: '',
        ingredients: []
    }
    recipes.push(recipe)
    saveRecipes()
}

// Remove a recipe's ingredient from its ingredients array via ingredient's name
const removeIngredient = (recipe, ingredientName) => {
    const ingredient = recipe.ingredients.find(ingredient => ingredient.name === ingredientName)
    const ingredientIndex = recipe.ingredients.indexOf(ingredient)
    recipe.ingredients.splice(ingredientIndex, 1)
    saveRecipes()
}

// Removes a recipe from recipes array via recipe's id
const removeRecipe = recipeId => {
    recipes = recipes.filter(recipe => recipe.id !== recipeId)
    saveRecipes()
}

// Flips recipe ingredient's inStock boolean value
const toggleInStock = ingredient => {
    ingredient.inStock = !ingredient.inStock
    saveRecipes()
}

const checkIngredients = ingredients => {
    if (ingredients.length === 0) {
        return 'You have to add some ingredient inside the recipe'
    }
    const ingredientsInStock = ingredients.filter(ingredient => ingredient.inStock === true)
    if (ingredientsInStock.length === 0) {
        return 'You don\'t have any of the ingredients'
    } else if (ingredientsInStock.length === ingredients.length) {
        return 'You have all the ingredients'
    } else {
        return 'You have some ingredients'
    }
}

// Changes recipe's steps property value
const changeSteps = (recipe, steps) => {
    recipe.steps = steps
    saveRecipes()
}

export { 
    getRecipes, 
    createRecipe, 
    addIngredient, 
    removeRecipe, 
    removeIngredient, 
    toggleInStock,
    changeSteps,
    checkIngredients 
}