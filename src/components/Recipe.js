import React, {useContext} from 'react'
import IngredientList from './IngredientList'
import { RecipeContext } from './App'

export default function Recipe(props) {
    const { handleRecipeDelete, handleRecipeSelect  } = useContext(RecipeContext)
    const{
        id,
        name,
        cookTime,
        serving,
        instructions,
        ingredients
    } = props

    return (
        <div className='recipe'>
            <div className='recipe__header'>
                <h3 className='recipe__title'>{name}</h3>
                <div>
                    <button 
                        className='btn btn--primary mr-1'
                        onClick={()=> handleRecipeSelect(id)}
                    >
                        Edit
                    </button>
                    <button className='btn btn--danger' onClick={() =>handleRecipeDelete(id)}>Delete</button>
                </div>
            </div>
            <div className='recipe__row'>
                <span className='recipe__label'>Cook Time:</span>
                <span className='recipe__value'>{cookTime}</span>
            </div>
            <div className='recipe__row'>
                <span className='recipe__label '>Serve:</span>
                <span className='recipe__value'>{serving}</span>
            </div>
            <div className='recipe__row'>
                <span className='recipe__label'>Instructions</span>
                <div className='recipe__value recipe_instruction recipe__value--indented'>{instructions}</div>
            </div>
            <div className='recipe__row'>
                <span className='recipe__label'>Ingredients:</span>
                <div className='recipe__value recipe__value--indented'>
                <IngredientList ingredients={ingredients}/></div>
            </div>
        </div>
    )
}
