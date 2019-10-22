import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { BlankSpace } from './blank-space';
import { display_content } from '../models/types';

export interface PageContainerParams {
    content:    display_content;
    title:      string;
    subtitle:   string;
};

export function PageContainer(params: PageContainerParams) {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="flex-start"
            justify="center"
            style={{minHeight: '100vh', padding: '10vw'}}
        >
            <Grid item xs={6} style={{minWidth: '20vw'}}>
                <Typography variant='h1'>{params.title}
                    {BlankSpace({height: '1vh'})}
                    <Typography variant='h4'>{params.subtitle}</Typography>
                </Typography>
            </Grid>
            {BlankSpace({height:'5vh'})}
            {params.content}
        </Grid>
    );

}