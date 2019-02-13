import { getRecipes, addIngredient } from './recipes'
import { renderRecipeDOM, renderIngredientsListDOM } from './view'

const recipeId = location.hash.substring(1)
const recipe = getRecipes().find(recipe => recipe.id === recipeId)

document.querySelector('#add-ingredient').addEventListener('submit', e => {
    e.preventDefault()
    addIngredient(recipeId, document.getElementById('ingredient-input').value)
    document.getElementById('ingredient-input').value = ''
    renderIngredientsListDOM(recipe)
})

renderRecipeDOM(recipe)
