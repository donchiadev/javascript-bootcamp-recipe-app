import { getRecipes, addIngredient, removeRecipe } from './recipes'
import { renderRecipeDOM, renderIngredientsListDOM } from './view'

const recipeId = location.hash.substring(1)
let recipe = getRecipes().find(recipe => recipe.id === recipeId)

document.querySelector('#add-ingredient').addEventListener('submit', e => {
    e.preventDefault()
    addIngredient(recipeId, document.getElementById('ingredient-input').value)
    document.getElementById('ingredient-input').value = ''
    renderIngredientsListDOM(recipe)
})

document.querySelector('#remove-recipe').addEventListener('submit', e => {
    e.preventDefault()
    removeRecipe(recipeId)
    location.assign('/index.html')
})

window.addEventListener('storage', e => {
    if (e.key === 'recipes') {
        recipe = getRecipes().find(recipe => recipe.id === recipeId)
        renderRecipeDOM(recipe)
    }
})

renderRecipeDOM(recipe)
