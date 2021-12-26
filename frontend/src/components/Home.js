import React from "react";
import { Grid } from '@material-ui/core'

function Home() {
    return (
        <Grid container>
            <Grid sm={2}/>
            <Grid lg={8} sm={8} spacing={10}>
            This is Home page!
            </Grid>
        </Grid>
    )
}
export default Home;