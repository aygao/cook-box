import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from "react-router-dom"
import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"
import SearchIcon from "@material-ui/icons/Search"
import TextField from '@material-ui/core/TextField'
import lightGreen from '@material-ui/core/colors/lightGreen'
import { withRouter } from 'react-router-dom'
import theme from '../utils/muiTheme'
import { ThemeProvider } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';



class NavBar extends React.Component {
    state = {newRecipeClick: false}
   

    render() {

        const handleNewRecipeClick = () => {
            this.props.history.push("/newrecipe")
        }

        return (
            <div>
                <div className="nav-bar">
                    <Grid className="nav-grid" container spacing={3}>
                        <Grid className="nav-grid-elem" item xs={4} md={2} lg={2}>
                            <NavLink className="cook-box" to="/dashboard" >Cook Box</NavLink>
                        </Grid>
                        <Grid className="nav-grid-elem" item xs={4} md={8} lg={8}>
                    
                            {this.props.hasSearch ?
                                <Input
                                    className="search-bar"
                                    disableUnderline
                                    placeholder="search"
                                    startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                                    onChange={this.props.onChange()}
                                    //className={classes.input}
                                    inputProps={{
                                        'aria-label': 'description',
                                        style: {fontSize: 28, lineHeight: 28, letterSpacing: '.5px'}
                                    }}

                            />
                                : <div className="search-bar"></div>}
                        </Grid>
                        <Grid className="nav-grid-elem" item xs={4} md={2} lg={2}>
                            {/* <ThemeProvider theme={theme}> */}
                                <button className="new-recipe" onClick={handleNewRecipeClick}>New Recipe</button>
                            {/* </ThemeProvider> */}
                        </Grid>
                    </Grid>
                    
                    {/* <Button color="inherit">Login</Button> */}
                
                </div>
            </div>
        );
    }
}

export default withRouter(NavBar)