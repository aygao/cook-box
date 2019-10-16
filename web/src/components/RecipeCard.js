import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';


const useStyles = makeStyles({
    card: {
        minWidth: 275,
        height: 375
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SimpleCard(props) {
    const classes = useStyles();
    //const bull = <span className={classes.bullet}>•</span>;

    return (
    <Card className={classes.card}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            Recipe
            </Typography>
            <Typography variant="h5" component="h2">
            {props.recipeData.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            adjective
            </Typography>
            <Typography variant="body2" component="p">
            {props.recipeData.description}
            <br />
            {props.recipeData.tags}
            </Typography>
        </CardContent>
        <CardActions>
            <div>
                <IconButton>
                    <EditOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <DeleteForeverOutlinedIcon/>
                </IconButton>
            </div>
        </CardActions>
    </Card>
    );
}