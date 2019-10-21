import React from 'react'
import {settings} from '../settings/config'
 

class Recipe extends React.Component {
    state = {recipeData: [], ingredientData: [], stepData: []}

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
        console.log(this.state)
        return (
            <div>
                    <h1>{this.state.recipeData.name}</h1>
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
            </div>
        )
    }
}

export default Recipe