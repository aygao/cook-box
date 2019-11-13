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
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


class NavBar extends React.Component {
    state = {newRecipeClick: false}
   

    render() {

        const handleNewRecipeClick = () => {
            this.props.history.push("/newrecipe")
        }

        return (
            <div>
                <div className="nav-bar">
                <ThemeProvider theme={theme}>
                    <Grid className="nav-grid" container spacing={3}>
                        <Grid className="nav-grid-elem" item xs={3} md={3} lg={2}>
                            <NavLink className="cook-box" to="/dashboard" >Cook Box</NavLink>
                        </Grid>
                        
                        <Grid className="nav-grid-elem" item xs={6} md={7} lg={8}>
                        
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
                        <Grid className="nav-grid-elem" item xs={3} md={2} lg={2}>
                            {this.props.hasBtn ?
                                <button className="new-recipe" onClick={handleNewRecipeClick}>New Recipe</button>
                            : <div></div>}
                        </Grid>
                        </Grid>
                        {/* <Grid className="nav-grid-elem" item xs={2} md={1} lg={1}> */}
                        <div className="profileBtn">
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                // onClick={handleMenu}
                                color='primary'
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                            <Menu
                                id="menu-appbar"
                                // anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                // open={open}
                                // onClose={handleClose}
                            >
                                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                            </Menu>
                        {/* </Grid> */}
                    </ThemeProvider>
                    
                    
                    {/* <Button color="inherit">Login</Button> */}
                
                </div>
            </div>
        );
    }
}

export default withRouter(NavBar)