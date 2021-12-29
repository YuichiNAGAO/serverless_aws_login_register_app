import React, {useState} from "react";
import { Grid, Paper, Avatar } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import axios from 'axios';
import { setUserSession } from '../services/AuthService';
import { useNavigate } from "react-router-dom";
const loginUrl= process.env.REACT_APP_ENDPOINT+'/login';


const Login = (props)=> {

    const [username, setUsername]= useState('')
    const [password, setPassword]= useState('')
    const [message, setMessage]= useState('')
    const paperStyle={padding: 20, height: '70vh', width:280, margin:"20px auto", alignItems: "center",textAlign: "center", justifyContent: "center"}
    const avatarStyle={backgroundColor: "green"}
    const buttonStyle={margin:"60px 0"}

    const submitHandler = (event) => {
        // event.preventDefalut();
        if (username.trim()==="" || password.trim()===""){
            setMessage('Please fill out username and password');
            return
        }
        setMessage(null);
        const requestBody = {
            username: username,
            password: password
        } 
        console.log(loginUrl);
        console.log(requestBody);

        // setUserSession({username: 'xx', password: 'xx'}, "responsecdceas");

        axios.post(loginUrl, requestBody).then(response => {
            setUserSession(response.data.user, response.data.token);
            props.history.push('/premium-content');
            // props.history.push('/premium-content');
            // console.log(loginUrl);
            // console.log(response.data);
          }).catch(error => {
            if (error.response.status === 401 || error.response.status === 403) {
                setMessage(error.response.data.message);
            } else {
                setMessage('sorry....the backend server is down. please try again later!!');
            }
          })
    }


    return (
        <Grid>
            <Paper evaluation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <AppRegistrationIcon />
                    </Avatar>

                    <h2> Login</h2>
                </Grid>
                {/* <form onSubmit={submitHandler}> */}
                    <TextField label='Username' value={username} placeholder='Enter username' fullWidth required onChange={(event) => setUsername(event.target.value)}/>
                    <TextField label='Password' value={password} placeholder='Enter passsword' type='password' fullWidth required onChange={(event) => setPassword(event.target.value)}/>
                
                    <Button type="submit" color='primary' variant="contained" style={buttonStyle} fullWidth onClick={submitHandler}>
                    {/* <Button type="submit" color='primary' variant="contained" style={buttonStyle} fullWidth> */}
                        Login
                    </Button>
                {/* </form> */}
                <Grid align="center">
                     {message}
                </Grid>
            </Paper>

        </Grid>
    )
}
export default Login;