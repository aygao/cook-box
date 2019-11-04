import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {settings} from '../settings/config'
import update from 'react-addons-update'
import Chip from '@material-ui/core/Chip';
import { withRouter } from "react-router-dom"
import NavBar from '../components/NavBar'
import '../NewUpdatePage.scss';
import Container from '@material-ui/core/Container'
import ImageUploader from 'react-images-upload'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import theme from '../utils/muiTheme'
import { ThemeProvider } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class NewRecipe extends React.Component {

    state = {
        name: '', 
        description: '', 
        user_id: '',
        tags: [],
        currTagText: '',
        ingredients: [{name: '', quantity: '', info: ''}, {name: '', quantity: '', info: ''}],
        steps: ['', ''],
        isNameError: false,
        picture: []
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

        const handleSubmit = async (event) => {
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

            await fetch(settings.api_uri, {
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

            await this.props.history.push("/dashboard");
        }
        
        const handleCancel = () => {
            this.props.history.push("/dashboard");
        }

        return (
            <div>
                <div>
                    <NavBar hasSearch={false} />
                </div>
                <Container maxWidth="xl">
                    <div className="new-update-page">
                        <ImageUploader
                            withIcon={true}
                            buttonText="Choose image"
                            imgExtension={['.jpg', '.png', '.jpeg']}
                            maxFileSize={5242880}
                            style={{width:"80%"}}
                        />
                        <div className="recipe-content">
                            <ThemeProvider theme={theme}>
                            <div className="recipe-intro">
                            
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
                                    style = {{width: "90%"}}
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
                                    style = {{width: "90%"}}
                                />
                                <TextField 
                                    id="user-id"
                                    label="User ID"
                                    value={this.state.user_id}
                                    onChange={handleRecipeChange('user_id')}
                                    margin="normal"
                                />
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
                                    style = {{width: "90%", marginBottom:"15px"}}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault()
                                            handleTagSubmit()
                                        }
                                    }}
                                />

                                {this.state.tags.map((tag, index) => {
                                    return (
                                        <div className="tag-chips">
                                            <Typography variant="overline">
                                            <Chip
                                                key={tag}
                                                //icon={icon}
                                                label={tag}
                                                onDelete={handleTagDelete(index)}
                                                color='primary'
                                                variant='outlined'
                                                size='small'
                                                style= {{margin: "4px"}}
                                            />
                                            </Typography>
                                        </div>
                                    )
                                })}
                            </div>
                            
                            <div className="recipe-ingr">
                                <Typography variant="subtitle2">
                                    Ingredients
                                </Typography>
                                {this.state.ingredients.map((ingredients, index) => {
                                    return (
                                        <div className="add-row">
                                            <TextField
                                                // id={index}
                                                value = {this.state.ingredients[index].quantity}
                                                onChange={handleIngredientChange(index, 'quantity')}
                                                placeholder='Enter Quantity'
                                                label={"Quantity"}
                                                style = {{width: "20%"}}
                                            />
                                            <TextField
                                                // id={index}
                                                value = {this.state.ingredients[index].name}
                                                onChange={handleIngredientChange(index, 'name')}
                                                placeholder='Enter Ingredient'
                                                label={"Ingredient"}
                                                style = {{width: "30%", margin: "0 1%"}}
                                            />
                                            <TextField
                                                // id={index}
                                                value = {this.state.ingredients[index].info}
                                                onChange={handleIngredientChange(index, 'info')}
                                                placeholder='Enter additional info'
                                                label={"Info"}
                                                style = {{width: "35%"}}
                                            />
                                            {/* <button id={index} onClick={() => deleteIngredient(index)}>
                                                Delete Ingredient
                                            </button> */}
                                            <button className="delete-btn" id={index} onClick={() => deleteIngredient(index)}>
                                                <HighlightOffIcon />
                                            </button>
                                        </div>
                                    )
                                })}

                                <Fab color="primary" size="small" aria-label="add" onClick={addIngredient}>
                                    <AddIcon />
                                </Fab>
                            </div>

                            <div className="recipe-steps">
                                <Typography variant="subtitle2">
                                    Instructions
                                </Typography>
                                {this.state.steps.map((step, index) => {
                                    return (
                                        <div className="add-row">
                                            <TextField
                                                // id={index}
                                                multiline
                                                rows="1"
                                                rowsMax="5"
                                                value = {this.state.steps[index]}
                                                onChange={handleStepChange(index)}
                                                placeholder='Enter instructions'
                                                label={index+1}
                                                style = {{width: "85%"}}
                                            />
                                            {/* <button id={index} onClick={() => deleteStep(index)}>
                                                Delete Step
                                            </button> */}
                                            <button className="delete-btn" id={index} onClick={() => deleteStep(index)}>
                                                <HighlightOffIcon />
                                            </button>
                                        </div>
                                    )
                                })}

                                <Fab color="primary" size="small" aria-label="add" onClick={addStep}>
                                    <AddIcon />
                                </Fab>
                                
                            </div>
                            </ThemeProvider>
                        </div>
                        <div className="recipe-buttons">
                            <button className="submit-btn" onClick={handleSubmit}>
                                Create
                            </button>
                            <button className="delete-btn" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                        
                    </div>
                </Container>
            </div>
        )
    }
}

export default withRouter(NewRecipe);