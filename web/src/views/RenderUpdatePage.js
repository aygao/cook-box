import React from 'react'
import UpdateRecipe from './UpdateRecipe'


const RenderUpdatePage = (props) => {
    console.log(props)
    return(
        <div>
        <UpdateRecipe id={props.match.params.id}></UpdateRecipe>
        </div>
    )    
}
export default RenderUpdatePage