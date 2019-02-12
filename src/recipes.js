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

const removeRecipe = id => {
    recipes = recipes.filter(recipe => recipe.id !== id)
    saveRecipes()
}

loadRecipes()

export { getRecipes, createRecipe, addIngredient }