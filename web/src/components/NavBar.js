import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from "react-router-dom"
import Input from '@material-ui/core/Input';


const NavBar = (props) => {

    return (
        <div className="nav-bar">
            <NavLink to="/dashboard" >Cook Box</NavLink>
            {props.hasSearch ?
                <Input
                    className="search-bar"
                    placeholder="Search"
                    onChange={props.handleSearchChange}
                    //className={classes.input}
                    inputProps={{
                        'aria-label': 'description',
                        style: {fontSize: 36, lineHeight: 36, letterSpacing: '.5px'} 
                    }}
              />
                : <div></div>}
            <NavLink to="/newrecipe">New Recipe</NavLink>
            <Button color="inherit">Login</Button>
                
        </div>
    );
}

export default NavBar