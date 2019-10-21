import React from 'react'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar'
import RecipeCard from '../components/RecipeCard'
import {settings} from '../settings/config'
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router'


const Recipe = (props) => {
    console.log(props)
    return(
        <div>Recipe Page for {props.match.params.id}</div>
    )    
}
export default Recipe

// const RecipeWithRouter = withRouter(Recipe)
// export default RecipeWithRouter