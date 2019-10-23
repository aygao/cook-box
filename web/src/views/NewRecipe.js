import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { sizing } from '@material-ui/system';
import {Link} from "react-router-dom"
import {settings} from '../settings/config'
import update from 'react-addons-update'

class NewRecipe extends React.Component {

    state = {
        name: '', 
        description: '', 
        user_id: '', 
        ingredients: [{name: '', quantity: '', info: ''}, {name: '', quantity: '', info: ''}],
        steps: ['', '', '']
    }

    render() {

        const addIngredient = () => {
            this.setState(
                {ingredients: 
                    update(
                        this.state.ingredients, 
                        {$push: [{name: '', quantity: '', details: ''}]}
                    )
                }
            )
        }

        const handleIngredientChange = (index, field) => event => {
            this.setState(
                {ingredients: update(
                    this.state.ingredients, 
                    {[index]: {[field]: {$set: event.target.value}}})
                }
            )
        } 

        const deleteIngredient = index => {
            const array = [...this.state.ingredients]
            array.splice(index, 1)
            this.setState({ingredients: array})
        }

        const addStep = () => {
            this.setState(
                {steps: update(this.state.steps, {$push: ['']})}
            )
        }

        const handleStepChange = stepNum => event => {
            this.setState(
                {steps: update(
                        this.state.steps, 
                        {[stepNum]: {$set: event.target.value}}
                        )
                }
            )
        }

        const deleteStep = index => {
            const array = [...this.state.steps]
            array.splice(index, 1)
            this.setState({steps: array})
        }

        const handleRecipeChange = field => event => {
            this.setState({[field]: event.target.value})
            console.log(field)
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            alert('Event: Form Submit');
            const text = {
                user_id: this.state.user_id,
                name: this.state.name,
                description: this.state.description,
                operation:"insert"
            }
            const formData = new FormData();
            formData.append("name", this.state.name)
            formData.append("description", this.state.description)
            formData.append("user_id", this.state.user_id)
            const request = new XMLHttpRequest();
            request.open("POST", settings.api_uri);
            request.send(formData);

        
        }
        
        return (
            <div>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Recipe Name"
                        placeholder="Enter your recipe name"
                        value={this.state.name}
                        onChange={handleRecipeChange('name')}
                        margin="normal"
                        variant="outlined"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        style = {{width: "25%"}}
                    />
                    <TextField 
                        id="standard-name"
                        label="Description"
                        placeholder="Enter a description for your recipe"
                        multiline
                        rows="5"
                        rowsMax="10"
                        value={this.state.description}
                        onChange={handleRecipeChange('description')}
                        margin="normal"
                        style = {{width: "25%"}}
                    />
                    <TextField 
                        id="standard-required"
                        label="User ID"
                        value={this.state.user_id}
                        onChange={handleRecipeChange('user_id')}
                        margin="normal"
                    />

                    {this.state.ingredients.map((ingredients, index) => {
                        return (
                            <div>
                                <TextField
                                    id={index}
                                    value = {this.state.ingredients[index].quantity}
                                    onChange={handleIngredientChange(index, 'quantity')}
                                    placeholder='Enter Quantity'
                                    label={"Quantity ".concat(index+1)}
                                />
                                <TextField
                                    id={index}
                                    value = {this.state.ingredients[index].name}
                                    onChange={handleIngredientChange(index, 'name')}
                                    placeholder='Enter Ingredient'
                                    label={"Ingredient ".concat(index+1)}
                                />
                                <TextField
                                    id={index}
                                    value = {this.state.ingredients[index].info}
                                    onChange={handleIngredientChange(index, 'info')}
                                    placeholder='Enter additional info'
                                    label={"Info ".concat(index+1)}
                                />
                                <button id={index} onClick={() => deleteIngredient(index)}>
                                    Delete Ingredient
                                </button>
                            </div>
                        )
                    })}

                    <Button variant="contained" color="primary" onClick={addIngredient}>
                        Add Ingredient
                    </Button>

                    {this.state.steps.map((step, index) => {
                        return (
                            <div>
                                <TextField
                                    id={index}
                                    value = {this.state.steps[index]}
                                    onChange={handleStepChange(index)}
                                    placeholder='Enter instructions'
                                    label={"Step Number ".concat(index+1)}
                                />
                                <button id={index} onClick={() => deleteStep(index)}>
                                    Delete Step
                                </button>
                            </div>
                        )
                    })}

                    <Button variant="contained" color="primary" onClick={addStep}>
                        Add Step
                    </Button>


                    <Button type="submit" variant="contained" color="primary">
                        Create Recipe
                    </Button>
                    <Button variant="outlined" color="primary">
                        Cancel
                    </Button>
                </form>
            </div>
        )
    }
}

export default NewRecipe