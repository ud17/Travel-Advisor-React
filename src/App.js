import React, { useState, useEffect } from "react";
// CssBaseline simple fixes the padding and margin automatically for us
import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Maps/Maps";

import { getPlacesData } from "./api/index";

const App = () => {
    const [places, setPlaces] = useState([]);
    const [bounds, setBounds] = useState({});
    const [type, setType] = useState("restaurants");
    const [rating, setRating] = useState('');
    const [childClicked, setChildClicked] = useState({});
    const [coordinates, setCoordinates] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // useEffect to set user coordinates
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({ lat: latitude, lng: longitude});
        })
    }, []);

    // use 'useEffect' while making api calls'
    useEffect(() => {
        setIsLoading(true);
        getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
            setPlaces(data);
            setIsLoading(false);
        })
    }, [type, coordinates, bounds]);

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
                    <List 
                        places={places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                {/* type: item
                xs(mobile devices): full width
                md(medium devices or larger): 8 spaces */}
                {/* Map */}
                <Grid item xs={12} md={8}>
                    <Map 
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App;