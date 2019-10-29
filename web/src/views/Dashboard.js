import React from 'react'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar'
import RecipeCard from '../components/RecipeCard'
import {settings} from '../settings/config'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

class Dashboard extends React.Component {

    state = {recipeData: [], searchField: '', searchedRecipes: []}

    componentDidMount() {
        fetch(settings.api_uri)
            .then(res => res.json())
            .then(res => this.setState({ recipeData: res, searchedRecipes: res }));
    }

    handleRefresh = () => {
        fetch(settings.api_uri)
            .then(res => res.json())
            .then(res => this.setState({ recipeData: res, searchedRecipes: res }));
    }
   
    handleSearchChange = field => event => {
        //const filteredRecipes = this.state.recipeData.filter(recipe => Object.keys(recipe).some(k => recipe[k].toLowerCase().includes(event.target.value.toLowerCase())))
        this.setState({searchField: event.target.value})
        if(event.target.value === '') {
            this.setState({searchedRecipes: this.state.recipeData})
        } else {
            this.setState({searchedRecipes: this.state.recipeData.filter(
                recipe => recipe.name.toLowerCase().includes(event.target.value.toLowerCase())
                || recipe.description.toLowerCase().includes(event.target.value.toLowerCase())
                || recipe.tags.join(' ').toLowerCase().includes(event.target.value.toLowerCase())
            )})
        }
        // this.setState({searchedRecipes: filteredRecipes})   
    }

    render() {
        return (
            <div>
                <div>
                    <NavBar hasSearch={true} onChange={this.handleSearchChange} />
                </div>
                {/* {console.log(this.state)} */}
                <Container maxWidth="lg">
                <Grid container spacing={3} className="recipe-grid">
                    {this.state.searchedRecipes.map(
                        (row) => 
                            <Grid key={row.recipe_id} item xs={3}>
                                <RecipeCard handleRefresh={this.handleRefresh} key={row.recipe_id} recipeData={row}>xs=3</RecipeCard>
                            </Grid>
                    )} 
                </Grid>
                </Container>
            </div>
        )
    }
}

export default Dashboard