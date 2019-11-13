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
import styles from '../assets/styles/recipe-page.module.scss';
import theme from '../utils/muiTheme'
import { ThemeProvider } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import Chip from '@material-ui/core/Chip';
 

class Recipe extends React.Component {
    state = {recipeData: [], ingredientData: [], stepData: [], deleteOpen: false}

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
            this.props.history.push("/updaterecipe/" + this.props.id) 
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
    
                <div>
                    <NavBar hasSearch={false} hasBtn={true} />
                </div>
                <Container maxWidth="lg">
                    <div className={styles.recipePage}>
                        

                        <div className={styles.recipeContent}>
                            <div className={styles.recipeIntro}>
                                <ThemeProvider theme={theme}>
                                    <Typography variant="h6">
                                        {this.state.recipeData.name}
                                    </Typography>
                                    <div className={styles.recipePhoto}>
                                        <img src={require("../test.jpeg")} width="100%" alt="cookiesss"/>
                                    </div>
                                    <div className={styles.recipeDesc}>
                                        <Typography variant="body1">
                                            {this.state.recipeData.description}
                                        </Typography>
                                    </div>
                                    {/* <Typography variant="subtitle2">
                                        Tags
                                    </Typography> */}
                                    <Typography variant="overline">                                    
                                        {this.state.recipeData.tags !== undefined ? this.state.recipeData.tags.map(
                                            tag => 
                                            <Chip
                                                key={tag}
                                                label={tag}
                                                color='primary'
                                                variant='outlined'
                                                size='small'
                                                style= {{margin: "2px"}}
                                            />
                                        ) : ''
                                    }
                                    </Typography>
                                </ThemeProvider>
                            </div>
                            <div className={styles.recipeIngr}>
                                <Typography variant="subtitle2">
                                    Ingredients
                                </Typography>
                                    {this.state.ingredientData.map(
                                        (row) => 
                                            <ul>
                                                <Typography variant="body1">
                                                <li key={row.ingredient_id}>{row.quantity} {row.name}
                                                    {row.notes == null || row.notes == '' ? '' : ' (' }{row.notes}{row.notes == null || row.notes == '' ? '' : ')' }</li>
                                                </Typography>
                                            </ul>
                                    )} 
                            </div>
                            <div className={styles.recipeSteps}>
                                <Typography variant="subtitle2">
                                    Instructions
                                </Typography>
                                
                                    <ol>
                                        {this.state.stepData.map(
                                            (row) =>
                                                <Typography variant="body1">
                                                <li key={row.step_num}> {row.info}</li>
                                                </Typography>
                                        )}
                                    </ol>
                            </div>
                        </div>
                        <div className={styles.recipeButtons}>
                            <button className={styles.editRecipe} onClick={handleEditOnClick}>
                                Edit Recipe
                            </button>
                            <button className={styles.deleteRecipe} onClick={handleDeleteOnClick}>
                                Delete Recipe
                            </button>
                        </div>
                       

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
                </Container>
            </div>
        )
    }
}

export default withRouter(Recipe)