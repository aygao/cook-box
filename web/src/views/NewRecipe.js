import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {settings} from '../settings/config'
import update from 'react-addons-update'
import Chip from '@material-ui/core/Chip';

class NewRecipe extends React.Component {

    state = {
        name: '', 
        description: '', 
        user_id: '',
        tags: [],
        currTagText: '',
        ingredients: [{name: '', quantity: '', info: ''}, {name: '', quantity: '', info: ''}],
        steps: ['', ''],
        isNameError: false
    }

    render() {

        const handleTagSubmit = () => {
            this.setState(
                {tags: update(this.state.tags, {$push: [this.state.currTagText]})}
            )
            this.setState({currTagText: ''})
        }

        const handleTagDelete = index => () => {
            const array = [...this.state.tags]
            array.splice(index, 1)
            this.setState({tags: array})
        }

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
            if (this.state.name === '') {
                this.setState({isNameError: true})
                return
            }
            console.log('Event: Form Submit');
            const recipeData = {
                user_id: this.state.user_id,
                name: this.state.name,
                description: this.state.description,
                tags: this.state.tags
            }

            fetch(settings.api_uri, {
                method: 'POST',
                body: JSON.stringify(recipeData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json()
            ).then(response => {
                let stepsData = this.state.steps.filter((row) => row !== '')
                stepsData.push(response)

                let ingredientData = this.state.ingredients.filter((row) => row.name !== '')
                ingredientData.push(response)

                fetch(settings.api_ingr_uri, {
                    method: 'POST',
                    body: JSON.stringify(ingredientData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                fetch(settings.api_steps_uri, {
                    method: 'POST',
                    body: JSON.stringify(stepsData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
    
               // window.location.reload();
            }).catch(err => err);
        }
        
        return (
            <div>

                <TextField
                    required
                    error = {this.state.isNameError ? true : false}
                    id="recipe-name"
                    label="Recipe Name"
                    placeholder="Enter your recipe name"
                    value={this.state.name}
                    onChange={handleRecipeChange('name')}
                    margin="normal"
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    style = {{width: "25%"}}
                />
                <TextField 
                    id="recipe-description"
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
                    id="user-id"
                    label="User ID"
                    value={this.state.user_id}
                    onChange={handleRecipeChange('user_id')}
                    margin="normal"
                />

                {this.state.ingredients.map((ingredients, index) => {
                    return (
                        <div>
                            <TextField
                                // id={index}
                                value = {this.state.ingredients[index].quantity}
                                onChange={handleIngredientChange(index, 'quantity')}
                                placeholder='Enter Quantity'
                                label={"Quantity ".concat(index+1)}
                            />
                            <TextField
                                // id={index}
                                value = {this.state.ingredients[index].name}
                                onChange={handleIngredientChange(index, 'name')}
                                placeholder='Enter Ingredient'
                                label={"Ingredient ".concat(index+1)}
                            />
                            <TextField
                                // id={index}
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
                                // id={index}
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
                
                <TextField 
                    id="recipe-tags"
                    label="Tags"
                    placeholder="Enter tags for your recipe"
                    multiline
                    rows="1"
                    rowsMax="5"
                    value={this.state.currTagText}
                    onChange={handleRecipeChange('currTagText')}
                    margin="normal"
                    style = {{width: "50%"}}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            handleTagSubmit()
                        }
                    }}
                />

                {this.state.tags.map((tag, index) => {
                    return (
                        <div>
                            <Chip
                                key={tag}
                                //icon={icon}
                                label={tag}
                                onDelete={handleTagDelete(index)}
                            />
                        </div>
                    )
                })}

                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Create Recipe
                </Button>
                <Button variant="outlined" color="primary">
                    Cancel
                </Button>
            </div>
        )
    }
}

export default NewRecipe