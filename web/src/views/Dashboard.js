import React from 'react'
import NavBar from '../components/NavBar'
import RecipeCard from '../components/RecipeCard'
import {settings} from '../settings/config'
import Grid from '@material-ui/core/Grid';

class Dashboard extends React.Component {

    state = {recipeData: []}

    componentDidMount() {
        fetch(settings.api_uri)
            .then(res => res.json())
            .then(res => this.setState({ recipeData: res }));
    }

    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    {this.state.recipeData.map(
                        (row) => 
                            <Grid item xs={3}>
                                <RecipeCard key={row.recipe_id} recipeData={row}>xs=3</RecipeCard>
                            </Grid>
                    )} 
                </Grid>
            </div>
        )
    }
}

export default Dashboard