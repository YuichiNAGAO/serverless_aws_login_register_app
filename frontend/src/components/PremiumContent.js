import React from "react";
import {getUser, resetUserSession} from '../services/AuthService';
import { Grid, Paper, Avatar } from '@material-ui/core'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import axios from 'axios';


const PremiumContent = (props)=> {
    const paperStyle={padding: 20, height: '70vh', width:280, margin:"20px auto", alignItems: "center",textAlign: "center", justifyContent: "center"}
    const avatarStyle={backgroundColor: "green"}
    const buttonStyle={margin:"60px 0"}
    const user =getUser();
    const name = user !=='undefined' && user ? user.name : '';

    const logoutHandler = () => {
        resetUserSession();
        props.history.push('login');
    }
    return (
        <Grid>
            <Paper evaluation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <AppRegistrationIcon />
                    </Avatar>

                    <h2> Premium Content</h2>
                </Grid>
                    Hello {name}!<br />
                    Welcome to the premium content!
                    <Button type="submit" color='primary' variant="contained" style={buttonStyle} fullWidth onClick={logoutHandler}>
                    {/* <Button type="submit" color='primary' variant="contained" style={buttonStyle} fullWidth> */}
                        Logout
                    </Button>
            </Paper>

        </Grid>
    )
}

export default PremiumContent;