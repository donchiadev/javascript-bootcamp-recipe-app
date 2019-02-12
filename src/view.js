import { getRecipes } from './recipes'

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

const generateSummaryRecipeDOM = title => {
    const recipeCardContainer = document.createElement('a')
    const recipeCardBody = document.createElement('div')
    const recipeCardTitle = document.createElement('h5')
    const recipeCardText = document.createElement('p')

    recipeCardContainer.setAttribute('href', '#')

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

const renderDOM = () => {
    const recipes = getRecipes()

    const recipesListContainer = document.querySelector('#recipes-list')

    recipes.forEach(recipe => {
        let recipeRow = generateRowDOM()
        let recipeColumn = generateColumnDOM(8)

        recipeColumn.appendChild(generateSummaryRecipeDOM(recipe.title))
        
        recipeRow.appendChild(generateColumnDOM(2))
        recipeRow.appendChild(recipeColumn)
        recipeRow.appendChild(generateColumnDOM(2))
        
        recipesListContainer.appendChild(recipeRow)
    })

}

export { renderDOM }
