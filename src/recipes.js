import uuidv4 from 'uuid/v4'

let recipes = []

const loadRecipes = () => {
     if (localStorage.getItem('recipes')) {
        return JSON.parse(localStorage.getItem('recipes'))
     } else {
         return []
     }
}

const getRecipes = () => {
    recipes = loadRecipes()
    return recipes
}

const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const addIngredient = (id, ingredientName) => {
    ingredientName = ingredientName.trim().toLowerCase()
    let recipe = recipes.find(recipe => recipe.id === id)
    if (recipe) {
        const ingredientsArrayIsEmpty = recipe.ingredients.length === 0
        const ingredientIsValid = ingredientName !== ''
        const ingredientNotExist = !Boolean(recipe.ingredients.find(ingredient => ingredient.name === ingredientName))
        if (ingredientsArrayIsEmpty || (ingredientIsValid && ingredientNotExist) )
        recipe.ingredients.push({
            name: ingredientName,
            inStock: false
        })
        saveRecipes()  
    }
    // return ingredientName
}

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
    // return recipe
}

const removeIngredient = (recipe, ingredientName) => {
    const ingredient = recipe.ingredients.find(ingredient => ingredient.name === ingredientName)
    const ingredientIndex = recipe.ingredients.indexOf(ingredient)
    recipe.ingredients.splice(ingredientIndex, 1)
    saveRecipes()
}

const removeRecipe = recipeId => {
    recipes = recipes.filter(recipe => recipe.id !== recipeId)
    saveRecipes()
}

loadRecipes()

export { getRecipes, createRecipe, addIngredient, removeRecipe, removeIngredient }