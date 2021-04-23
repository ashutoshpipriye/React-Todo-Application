import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const Header = (props) => {
    return (
        <Grid
            container
            justify="space-between"
            style={{ marginTop: '1rem' }}
            alignItems="center">
            <Grid item>
                <Typography variant="h3">
                    ToDo App
                </Typography>
            </Grid>
            <Fab
                size="small"
                color="primary"
                aria-label="add"
                onClick={props.handleFabClick}>
                <AddIcon />
            </Fab>
        </Grid>
    );
}

export default Header;