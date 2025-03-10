import React from 'react'
import ClaudeRecipe from './ClaudeRecipe'
import IngredientsList from './IngredientsList'
import {getRecipeFromMistral} from "../ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState('')

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    async function handleGetRecipe() {
        const generatedRecipe = await getRecipeFromMistral(ingredients)
        setRecipe(() => generatedRecipe)
    }

    return (
        <main>
            <form className='add-ingredient-form' action={addIngredient}>
                <input 
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 && <IngredientsList handleGetRecipe={handleGetRecipe} ingredients={ingredients}/>}
            {recipe &&  <ClaudeRecipe recipe={recipe}/>}
        </main>
    )
}
