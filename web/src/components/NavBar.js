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
import { Redirect } from 'react-router'



class NavBar extends React.Component {
    state = {newRecipeClick: false}
   

    render() {

        const handleNewRecipeClick = () => {
            this.setState({newRecipeClick: true})    
        }

        return (
            <div>
            
                {this.state.newRecipeClick ? <Redirect to={`/newrecipe`} /> :
                <div className="nav-bar">
                    
                    <NavLink className="nav-links cook-box" to="/dashboard" >Cook Box</NavLink>
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
                                style: {fontSize: 32, lineHeight: 32, letterSpacing: '.5px'}
                            }}

                    />
                        : <div className="search-bar"></div>}
                     <Button variant="contained" size="large" color="primary" className="new-recipe" onClick={handleNewRecipeClick}>New Recipe</Button>
                    {/* <Button color="inherit">Login</Button> */}
                
                </div>
                }
               
            </div>
        );
    }
}

export default NavBar