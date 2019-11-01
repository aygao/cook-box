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
import { withRouter } from 'react-router-dom'
import theme from '../utils/muiTheme'
import { ThemeProvider } from '@material-ui/core/styles'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader';


class SimpleCard extends React.Component {
    // classes = useStyles();
    //const bull = <span className={classes.bullet}>•</span>;
    
    constructor(props) {
        super(props)
        this.state={isHover: false, deleteOpen: false}

    }
    
    render() {
        const handleOnClick = () => {  
            this.props.history.push("/recipe/" + this.props.recipeData.recipe_id)
        }

        const handleEditOnClick = (e) => {
            e.stopPropagation()
            this.props.history.push("/updaterecipe/" + this.props.recipeData.recipe_id) 
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
                <div onClick={handleOnClick} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
                    <Card className="recipe-card">
                        <ThemeProvider theme={theme}>
     
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="200"
                                image={require ("../test.jpeg")}
                                title="test food image"
                            />
            
                            <CardHeader
                                title={this.props.recipeData.name}
                                titleTypographyProps= {{variant:"h6"}}
                            />

                            <CardContent>
                                <div className="card-desc">
                                <Typography variant="body2" component="p">
                                    
                                    {this.props.recipeData.description}
                                   
                                </Typography>
                                </div>
                            </CardContent>
                            <CardContent>
                                <div className="card-tags">
                                <Typography variant="overline">
                                {/* <div className="card-tags"> */}
                                    {this.props.recipeData.tags.join(' • ')}
                                {/* </div> */}
                                </Typography>
                                </div>
                            </CardContent>

                        </ThemeProvider>
                        
                        {/* <CardActions> */}
                            {!this.state.isHover ? <div></div> :
                            <div className="card-buttons">
                                <div className="card-button-edit">
                                    <IconButton onClick={handleEditOnClick} color='inherit'>
                                        <EditOutlinedIcon/>
                                    </IconButton>
                                </div>
                                <div className="card-button-delete">
                                    <IconButton onClick={handleDeleteOpen} color='inherit'>
                                        <DeleteForeverOutlinedIcon/>
                                    </IconButton>
                                </div>
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
            </div>
        );
    }  
}

export default withRouter(SimpleCard)