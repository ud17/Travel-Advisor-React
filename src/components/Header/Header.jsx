import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";

const Header = () => {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    {/* You can make variant as 'Heading', ' Titles'
                    or 'Subtitles' */}
                    <Typography variant="h5" className={classes.title}>
                        Travel Advisor
                    </Typography>
                    <Box display="flex">
                        <Typography variant="h6" className={classes.title}>
                            Expore new places
                        </Typography>
                        {/* <Autocomplete> */}
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase placeholder="Search..." classes={{root: classes.inputRoot, input: classes.inputInput}}/>
                            </div>
                        {/* </Autocomplete> */}
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;