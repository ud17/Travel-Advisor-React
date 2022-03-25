import React from "react";
// CssBaseline simple fixes the padding and margin automatically for us
import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Maps/Maps";

const App = () => {

    return (
        <>  
            <CssBaseline />
            <Header />
            {/* type: container */}
            <Grid container spacing={3} style={{width:"100%"}}>
                {/* type: item
                xs(mobile devices): full width
                md(medium devices or larger): 4 spaces */}
                {/* List */}
                <Grid item xs={12} md={4}>
                    <List />
                </Grid>
                {/* type: item
                xs(mobile devices): full width
                md(medium devices or larger): 8 spaces */}
                {/* Map */}
                <Grid item xs={12} md={8}>
                    <Map />
                </Grid>
            </Grid>
        </>
    )
}

export default App;