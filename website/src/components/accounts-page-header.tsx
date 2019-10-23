import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import WebRoundedIcon from '@material-ui/icons/WebRounded';

export function AccountsPageHeader() {
    return (
        <div style={{fontSize: '96px'}}>
            <Grid container alignItems='center' justify='flex-start' direction='row'>
                <Grid item>
                    <WebRoundedIcon fontSize='inherit'/>   
                </Grid>                   
                <Grid item>
                    <Typography variant='h4'>depend on me</Typography>                     
                </Grid>
            </Grid>
        </div>
    );
}