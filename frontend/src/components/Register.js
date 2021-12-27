import React, {useState} from "react";
import { Grid, Paper, Avatar } from '@material-ui/core'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import axios from 'axios';

const registerUrl= process.env.REGISTERURL;

const Register = ()=> {
    const [name, setName]= useState('')
    const [email, setEmail]= useState('')
    const [username, setUsername]= useState('')
    const [password, setPassword]= useState('')
    const [message, setMessage]= useState('')
    const paperStyle={padding: 20, height: '70vh', width:280, margin:"20px auto", alignItems: "center",textAlign: "center", justifyContent: "center"}
    const avatarStyle={backgroundColor: "green"}
    const buttonStyle={margin:"60px 0"}
    
    const submitHandler = (event) => {
        // event.preventDefalut();
        console.log(name);
        console.log('submit button is pressed!');

        const requestConfig ={
            header: {
                'x-api-key': process.env.APIKEY
            }
        }

        // axios.get(registerUrl, requestConfig).then(response => {
        //     setMessage('Registation Succcessful');
        // }).catch(error => {
        //     if (error.response.status==401 || error.response.status==403){
        //         setMessage(error.response.data.message);
        //     } else {
        //         setMessage('sorry... backend server is down');
        //     }
        // })
    
        const requestBody = {
            username: username,
            email: email,
            name: name,
            password: password
          }
          axios.post(registerUrl, requestBody, requestConfig).then(response => {
            setMessage('Registeration Successful');
          }).catch(error => {
            if (error.response.status === 401) {
              setMessage(error.response.data.message);
            } else {
              setMessage('sorry....the backend server is down!! please try again later');
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

                    <h2> Register</h2>
                </Grid>
                {/* <form onSubmit={submitHandler}> */}
                    <TextField label='Name' value={name} placeholder='Enter name' fullWidth required onChange={(event) => setName(event.target.value)}/>
                    <TextField label='Email' value={email} placeholder='Enter email' fullWidth required onChange={(event) => setEmail(event.target.value)}/>
                    <TextField label='Username' value={username} placeholder='Enter username' fullWidth required onChange={(event) => setUsername(event.target.value)}/>
                    <TextField label='Password' value={password} placeholder='Enter passsword' type='password' fullWidth required onChange={(event) => setPassword(event.target.value)}/>
                
                    <Button type="submit" color='primary' variant="contained" style={buttonStyle} fullWidth onClick={submitHandler}>
                    {/* <Button type="submit" color='primary' variant="contained" style={buttonStyle} fullWidth> */}
                        Register
                    </Button>
                {/* </form> */}
                <Grid align="center">
                     {message}
                </Grid>
            </Paper>

        </Grid>
        
    )
}

export default Register;