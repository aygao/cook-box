import React from 'react'
import Recipe from './Recipe'


const RenderRecipePage = (props) => {
    console.log(props)
    return(
        <div>
        <Recipe id={props.match.params.id}></Recipe>
        </div>
    )    
}
export default RenderRecipePage

// const RecipeWithRouter = withRouter(Recipe)
// export default RecipeWithRouter