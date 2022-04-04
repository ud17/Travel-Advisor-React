import React, { useState, useEffect } from "react";
// CssBaseline simple fixes the padding and margin automatically for us
import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Maps/Maps";

import { getPlacesData } from "./api/index";

const App = () => {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces , setFilteredPlaces] = useState([]);
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

    // useEffect to filter places based on ratings
    useEffect(()=> {
        const filteredPlace = places.filter((place) => place.rating > rating);
        setFilteredPlaces(filteredPlace);
    }, [rating]);

    // use 'useEffect' while making api calls'
    useEffect(() => {
        if(bounds.sw && bounds.ne) {
            setIsLoading(true);
            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
                    // setFilteredPlaces array to empty when the data is loaded again
                    setFilteredPlaces([]);
                    setIsLoading(false);
            })
        }
    }, [type, bounds]);

    return (
        <>  
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            {/* type: container */}
            <Grid container spacing={3} style={{width:"100%"}}>
                {/* type: item
                xs(mobile devices): full width
                md(medium devices or larger): 4 spaces */}
                {/* List */}
                <Grid item xs={12} md={4}>
                    <List 
                        places={filteredPlaces.length ? filteredPlaces : places}
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
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App;