import React from 'react'
import NavBar from '../components/NavBar'
import {settings} from '../settings/config'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from '../assets/styles/login.module.scss'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar'
import theme from '../utils/muiTheme'
import { ThemeProvider } from '@material-ui/core/styles'


class Login extends React.Component {


    render() {
        return (
            <div>
                <div>
                    <NavBar hasSearch={false} />
                </div>
                <Container maxWidth="xs">
                    <div className={styles.loginBox}>
                    <ThemeProvider theme={theme}>
                        <Avatar className={styles.lockIcon} >
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography variant="h5">
                            login
                        </Typography>
                        <form noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Sign In
                            </Button>

                        </form>
                    </ThemeProvider>
                    </div>
                </Container>
            </div>
        )
    }
}

export default Login