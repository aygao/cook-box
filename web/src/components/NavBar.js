import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from "react-router-dom"
import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"
import SearchIcon from "@material-ui/icons/Search"
import TextField from '@material-ui/core/TextField'


const NavBar = (props) => {

    return (
        <div className="nav-bar">
            <NavLink className="nav-links" to="/dashboard" >Cook Box</NavLink>
            {props.hasSearch ?
                <Input
                    className="search-bar"
                    disableUnderline
                    placeholder="search"
                    startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                    onChange={props.onChange()}
                    //className={classes.input}
                    inputProps={{
                        'aria-label': 'description',
                        style: {fontSize: 32, lineHeight: 32, letterSpacing: '.5px'}
                    }}

              />
                : <div></div>}
            <NavLink className="nav-links" to="/newrecipe">New Recipe</NavLink>
            {/* <Button color="inherit">Login</Button> */}
                
        </div>
    );
}

export default NavBar