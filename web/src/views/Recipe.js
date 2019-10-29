import React from 'react'
import {settings} from '../settings/config'
import { Redirect } from 'react-router'
import Button from '@material-ui/core/Button'
import { withRouter } from "react-router-dom"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NavBar from '../components/NavBar'
 

class Recipe extends React.Component {
    state = {recipeData: [], ingredientData: [], stepData: [], editClick: false, deleteOpen: false}

    componentDidMount() {
        console.log("hello")
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

        const handleDeleteOnClick = (e) => {
            e.stopPropagation()
            this.setState({deleteOpen: true})
        }

        const handleCancelClose = (e) => {
            e.stopPropagation()
            this.setState({deleteOpen: false})
        }

        const handleDeleteClose = async (e) => {
            e.stopPropagation()

            await fetch(settings.api_uri + this.props.id, {
                method: 'DELETE',
            }).catch(err => err);

            await this.setState({deleteOpen: false})
            await this.props.history.push("/dashboard");
        }

        return (
            <div>
                {/* {console.log(this.state)} */}
                {this.state.editClick ? <Redirect to={`/updaterecipe/${this.props.id}`} /> :
                <div>
                    <div>
                        <NavBar hasSearch={false} />
                    </div>
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
                    <Button variant="outlined" color="primary" onClick={handleDeleteOnClick}>
                        Delete Recipe
                    </Button>

                    <Dialog
                        open={this.state.deleteOpen}
                        onClose={handleDeleteClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this recipe?"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            The recipe will be deleted permanently and cannot be recovered.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCancelClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteClose} color="primary" autoFocus>
                            Delete
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            }
            </div>
        )
    }
}

export default withRouter(Recipe)