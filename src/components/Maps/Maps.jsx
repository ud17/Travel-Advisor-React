import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import  LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import useStyles from './styles';

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width: 600px)');

    //coordinates = { lat: 23 , lng: 73.28}
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key : "AIzaSyBV_xaE3yjTVX4nxK2R6DC2h3LcXjdXdcw" }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={15}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={(e)=> {
                    setCoordinates({ lat : e.center.lat, lng : e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw});
                }}
                onChildClick={(child)=> setChildClicked(child)}
            >
                {places?.map((place, index) => (
                    <div
                    className={classes.marketContainer}
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                    key={index}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large"/>
                            ) : (
                                // Paper is basically a div with a background
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography gutterBottom className={classes.typography} variant="subtitle2">
                                        {place.name}
                                    </Typography>
                                    <img 
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.small.url : "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
                                        alt={place.name}
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly />
                                </Paper>
                            )
                        }
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
}

export default Map;