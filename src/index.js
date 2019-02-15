import { createRecipe, getRecipes } from './recipes'
import { getFilters } from './filters'
import { renderRecipesDOM } from './view'

document.querySelector('#add-recipe').addEventListener('submit', e => {
    e.preventDefault()
    createRecipe(document.getElementById('recipe-name').value)
    document.getElementById('recipe-name').value =''
    renderRecipesDOM()
})

document.querySelector('#search-recipes').addEventListener('input', () => {
    getFilters().title = document.getElementById('search-recipes').value
    renderRecipesDOM()
})

window.addEventListener('storage', e => {
    if (e.key === 'recipes') {
        getRecipes()
        renderRecipesDOM()
    }
})

renderRecipesDOM()