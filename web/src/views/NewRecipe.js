import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { sizing } from '@material-ui/system';
import {Link} from "react-router-dom"
import {settings} from '../settings/config'

class NewRecipe extends React.Component {

    state = {name: '', description: '', user_id: ''}

    render() {

        const handleChange = name => event => {
            this.setState({[name]: event.target.value})
            console.log(name)
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
            var request = new XMLHttpRequest();
            request.open("POST", settings.api_uri);
            request.send(formData);
            // fetch(settings.api_uri, {
            //     method: 'POST',
            //     body: formData,
            //     headers: {
            //         'Content-Type': 'application/json'
            // }
            // }).then(response => {
            //     if (response.status >= 200 && response.status < 300) {
            //         console.log(response)
            //         return response;
            //         window.location.reload();
            //     } else {
            //         console.log('Somthing happened wrong');
            //     }
            // }).catch(err => err);
            //setErrorText(undefined);
            //setTodoDialogOpen(false);
        
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
                        onChange={handleChange('name')}
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
                        onChange={handleChange('description')}
                        margin="normal"
                        style = {{width: "25%"}}
                    />
                    <TextField 
                        id="standard-required"
                        label="User ID"
                        value={this.state.user_id}
                        onChange={handleChange('user_id')}
                        margin="normal"
                    />

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