import { createRecipe, getRecipes } from './recipes'
import { renderDOM } from './view'

document.querySelector('#add-recipe').addEventListener('submit', e => {
    e.preventDefault()
    createRecipe(document.getElementById('recipe-name').value)
    document.getElementById('recipe-name').value =''
    renderDOM()
})

window.addEventListener('storage', e => {
    if (e.key === 'recipes') {
        getRecipes()
        renderDOM()
    }
})

renderDOM()