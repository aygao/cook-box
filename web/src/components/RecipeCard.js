import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Redirect } from 'react-router'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {settings} from '../settings/config'


// const useStyles = makeStyles({
//     card: {
//         minWidth: 275,
//         height: 375
//     },
//     bullet: {
//         display: 'inline-block',
//         margin: '0 2px',
//         transform: 'scale(0.8)',
//     },
//     title: {
//         fontSize: 14,
//     },
//     pos: {
//         marginBottom: 12,
//     },
// });

class SimpleCard extends React.Component {
    // classes = useStyles();
    //const bull = <span className={classes.bullet}>•</span>;
    
    constructor(props) {
        super(props)
        this.state={cardClick: false, editClick: false, isHover: false, deleteOpen: false}

    }
    
    render() {
        const handleOnClick = () => {
            this.setState({cardClick: true})    
        }

        const handleEditOnClick = (e) => {
            e.stopPropagation()
            this.setState({editClick: true})    
        }

        const handleMouseOver = () => {
            this.setState({isHover: true})
        }

        const handleMouseOut = () => {
            this.setState({isHover: false})
        }

        const handleDeleteOpen = (e) => {
            e.stopPropagation()
            this.setState({deleteOpen: true})
        }

        const handleCancelClose = (e) => {
            e.stopPropagation()
            this.setState({deleteOpen: false})
        }

        const handleDeleteClose = (e) => {
            e.stopPropagation()

            fetch(settings.api_uri + this.props.recipeData.recipe_id, {
                method: 'DELETE'
            }).then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        this.props.handleRefresh()

                    } else {
                        console.log('Somthing happened wrong');
                    }
                }).catch(err => err);

            this.setState({deleteOpen: false})
            //this.props.handleRefresh()
        }

        return (
            <div>
                {this.state.editClick ? <Redirect to={`/updaterecipe/${this.props.recipeData.recipe_id}`} /> :
                    this.state.cardClick ? <Redirect to={`/recipe/${this.props.recipeData.recipe_id}`} /> : 
                    <div onClick={handleOnClick} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
                    <Card className="recipe-card">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                            Recipe
                            </Typography>
                            <Typography variant="h5" component="h2">
                            {this.props.recipeData.name}
                            </Typography>
                            <Typography color="textSecondary">
                            {this.props.recipeData.servings}
                            </Typography>
                            <Typography variant="body2" component="p">
                            {this.props.recipeData.description}
                            <br />
                            {this.props.recipeData.tags}
                            </Typography>
                        </CardContent>
                        {/* <CardActions> */}
                            {!this.state.isHover ? <div></div> :
                                <div className="card-buttons">
                                    <IconButton onClick={handleEditOnClick} color='inherit'>
                                        <EditOutlinedIcon/>
                                    </IconButton>
                                    <IconButton onClick={handleDeleteOpen} color='inherit'>
                                        <DeleteForeverOutlinedIcon/>
                                    </IconButton>
                                </div>
                            }
                        {/* </CardActions> */}
                    </Card>

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
        );
    }  
}

export default SimpleCard