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
    state={cardClick: false, editClick: false}


    
    render() {
        const handleOnClick = () => {
            this.setState({cardClick: true})    
        }

        const handleEditOnClick = () => {
            this.setState({editClick: true})    
        }

        return (
            <div>
                {this.state.editClick ? <Redirect to={`/updaterecipe/${this.props.recipeData.recipe_id}`} /> :
                this.state.cardClick ? <Redirect to={`/recipe/${this.props.recipeData.recipe_id}`} /> 
                    : 
                    <div onClick={handleOnClick}>
                    <Card>
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
                        <CardActions>
                            <div>
                                <IconButton onClick={handleEditOnClick}>
                                    <EditOutlinedIcon/>
                                </IconButton>
                                <IconButton>
                                    <DeleteForeverOutlinedIcon/>
                                </IconButton>
                            </div>
                        </CardActions>
                    </Card>
                </div>
                
                }
                
            </div>
            
            );
    }
    
}

export default SimpleCard