import React, {useState,useEffect} from 'react';
import RecipeList from './RecipeList'
import RecipeEdit from './RecipeEdit';
import "../css/app.css"
import { v4 as uuidv4 } from 'uuid';

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'


function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes,setRecipe] = useState(sampleRecipes)
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)
  useEffect(()=>{
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(recipeJSON != null) setRecipe(JSON.parse(recipeJSON))
  },[])
    
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(recipes))
  },[recipes])

  const recipeContextValue =  {
    handleRecipeAdd: handleRecipeAdd,
    handleRecipeDelete:handleRecipeDelete,
    handleRecipeSelect: handleRecipeSelect,
    handleRecipeChange: handleRecipeChange
  }

  function handleRecipeSelect(id){
    setSelectedRecipeId(id)
  }

function handleRecipeChange(id,recipe){
  const newRecipes = [...recipes]
  const index = newRecipes.findIndex(r => r.id === id)
  newRecipes[index] = recipe
  setRecipe(newRecipes)
}



  function handleRecipeAdd(){
    const newRecipe = {
      id:uuidv4(),
      name:'',
      serving:'',
      cookTime:'',
      instructions: '',
      ingredients: [
        {id:uuidv4(), name:'', amount: ''}
      ]
    }
    setSelectedRecipeId(newRecipe.id)
    setRecipe([...recipes, newRecipe])
  }

  function handleRecipeDelete(id){
    if(selectedRecipeId != null && selectedRecipeId === id){
      setSelectedRecipeId(undefined)
    }
    setRecipe(recipes.filter(recipe => recipe.id !== id))
  }
    return (
      <RecipeContext.Provider value={recipeContextValue}>
        <RecipeList recipes={recipes} />
        {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
       </RecipeContext.Provider>
    )
}


const sampleRecipes =[
  {
    id:1,
    name:'Plain chicken',
    serving:3,
    cookTime:'1:45',
    instructions: "1.Put salt on chicken\n2.Put chicken in oven\n3.Eat chicken",
    ingredients:[
      {
        id:1,
        name:"chicken",
        amount:"2 Pounds"
      },
      {
        id:2,
        name:"Salt",
        amount:"2 Tbs"
      }
    ]
  },
  {
    id:2,
    name:'Plain pork',
    serving:5,
    cookTime:'0:45',
    instructions: "1.Put paprika on pork\n2.Put pork in oven\n3.Eat pork",
    ingredients:[
      {
        id:1,
        name:"Pork",
        amount:"3 Pounds"
      },
      {
        id:2,
        name:"Paprika",
        amount:"2 tbs"
      }
    ]
  }
]

export default App;
