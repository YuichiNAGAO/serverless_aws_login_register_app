import React from "react";
import { Grid } from '@material-ui/core'


const Login = ()=> {
    return (
        <Grid container>
            <Grid sm={2}/>
            <Grid lg={8} sm={8} spacing={10}>
            This is Login page!
            </Grid>
        </Grid>
    )
}
export default Login;