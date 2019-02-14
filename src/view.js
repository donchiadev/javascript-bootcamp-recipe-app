import { getRecipes, removeIngredient, toggleInStock } from './recipes'
import { getFilters } from './filters'

const generateRowDOM = () => {
    const row = document.createElement('div')
    row.classList.add('row')
    return row
}

const generateColumnDOM = size => {
    const column = document.createElement('div')
    column.classList.add(`col-sm-${size}`)
    return column
}

const generateSummaryRecipeDOM = ({title, id}) => {
    const recipeCardContainer = document.createElement('a')
    const recipeCardBody = document.createElement('div')
    const recipeCardTitle = document.createElement('h5')
    const recipeCardText = document.createElement('p')

    recipeCardContainer.setAttribute('href', `./edit.html#${id}`)

    recipeCardTitle.textContent = title
    recipeCardText.textContent = 'Standard Message'

    recipeCardContainer.classList.add('card')
    recipeCardBody.classList.add('card-body')
    recipeCardTitle.classList.add('card-title')
    recipeCardText.classList.add('card-text')

    recipeCardBody.appendChild(recipeCardTitle)
    recipeCardBody.appendChild(recipeCardText)
    recipeCardContainer.appendChild(recipeCardBody)

    return recipeCardContainer
}

const renderRecipesDOM = () => {
    const recipes = getRecipes()
    const filters = getFilters()

    const recipesListContainer = document.querySelector('#recipes-list')

    recipesListContainer.innerHTML = ''

    recipes
    .filter(recipe => {
        return recipe.title.includes(filters.title.toLocaleLowerCase())
    })
    .forEach(recipe => {
        let recipeRow = generateRowDOM()
        let recipeColumn = generateColumnDOM(8)

        recipeColumn.appendChild(generateSummaryRecipeDOM(recipe))
        
        recipeRow.appendChild(generateColumnDOM(2))
        recipeRow.appendChild(recipeColumn)
        recipeRow.appendChild(generateColumnDOM(2))
        
        recipesListContainer.appendChild(recipeRow)
    })

}

const renderRecipeDOM = recipe => {

    const recipeTitleInput = document.getElementById('recipe-title')
    const recipeStepsTextArea = document.getElementById('recipe-steps')

    recipeTitleInput.value = recipe.title
    recipeStepsTextArea.value = recipe.steps
    
    renderIngredientsListDOM(recipe)

}

const renderIngredientsListDOM = recipe => {
    const recipeIngredientsList = document.getElementById('recipe-ingredients')
    
    recipeIngredientsList.innerHTML = ''
    
    recipe.ingredients.forEach(ingredient => {
        const ingredientLi = document.createElement('li')
        const ingredientLiCheckInStockContainer = document.createElement('div')
        const ingredientLiCheckInStock = document.createElement('input')
        const ingredientLiCheckInStockLabel = document.createElement('label')
        const ingredientLiRemoveButton = document.createElement('i')

        ingredientLi.classList.add('list-group-item', 'd-flex', 'justify-content-between')
        ingredientLiCheckInStockContainer.classList.add('custom-control', 'custom-checkbox')
        ingredientLiCheckInStock.classList.add('custom-control-input')
        ingredientLiCheckInStockLabel.classList.add('custom-control-label')
        ingredientLiRemoveButton.classList.add('fas', 'fa-times', 'mt-1')

        ingredientLiCheckInStock.setAttribute('type', 'checkbox')
        ingredientLiCheckInStock.id = `${ingredient.name}-check`
        ingredientLiCheckInStockLabel.setAttribute('for', `${ingredient.name}-check`)

        ingredientLiCheckInStock.checked = ingredient.inStock
        ingredientLiCheckInStockLabel.textContent = ingredient.name
        
        ingredientLiCheckInStock.addEventListener('change', () => {
            toggleInStock(ingredient)
        })

        ingredientLiRemoveButton.addEventListener('click', () => {
            removeIngredient(recipe, ingredient.name)
            renderIngredientsListDOM(recipe)
        })
        
        ingredientLiCheckInStockContainer.appendChild(ingredientLiCheckInStock)
        ingredientLiCheckInStockContainer.appendChild(ingredientLiCheckInStockLabel)

        ingredientLi.append(ingredientLiCheckInStockContainer)
        ingredientLi.appendChild(ingredientLiRemoveButton)
        
        recipeIngredientsList.appendChild(ingredientLi)
    })

}

export { renderRecipesDOM, renderRecipeDOM, renderIngredientsListDOM }
