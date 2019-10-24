import React from 'react'
import {settings} from '../settings/config'
import { Redirect } from 'react-router'
import Button from '@material-ui/core/Button';
 

class Recipe extends React.Component {
    state = {recipeData: [], ingredientData: [], stepData: [], editClick: false}

    componentDidMount() {
        fetch(settings.api_uri + this.props.id)
            .then(res => res.json())
            .then(res => this.setState({ recipeData: res }));

        fetch(settings.api_ingr_uri + this.props.id)
            .then(res => res.json())
            .then(res => this.setState({ ingredientData: res }));
        
        fetch(settings.api_steps_uri + this.props.id)
            .then(res => res.json())
            .then(res => this.setState({ stepData: res }));
    }

    render() {
        const handleEditOnClick = () => {
            this.setState({editClick: true})    
        }

        return (
            <div>
                {this.state.editClick ? <Redirect to={`/updaterecipe/${this.props.id}`} /> :
                <div>
                    <h1>{this.state.recipeData.name}</h1>
                    <p>{this.state.recipeData.description}</p>
                    <h2>Ingredients:</h2>
                    {this.state.ingredientData.map(
                        (row) => 
                            <p key={row.ingredient_id}>{row.quantity} {row.name} {row.info}</p>
                    )} 
                    <h2>Instructions:</h2>
                    {this.state.stepData.map(
                        (row) =>
                            <p key={row.step_num}>{row.step_num} {row.info}</p>
                    )}
                    <h2>Tags:</h2>
                    {this.state.recipeData.tags}

                    <Button variant="contained" color="primary" onClick={handleEditOnClick}>
                        Edit Recipe
                    </Button>
                    <Button variant="outlined" color="primary">
                        Delete Recipe
                    </Button>
                </div>
            }
            </div>
        )
    }
}

export default Recipe