import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { NavigationBar } from '../components/navigation-bar';
import { HistoryPropInterface } from '../models/types';

interface Props extends HistoryPropInterface {
}

interface State {
}

export class HomePage extends React.Component<Props, State> {

    render() {
        return (
            <div style={{flexGrow: 1, minHeight: '100vh', display: 'flex', flexFlow: 'column'}}>
                <NavigationBar<Props> parent={this} />

                <Grid 
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{flex: 1}}
                >
                    <Grid 
                        item md={6} 
                        style={{minWidth: '20vw'}}
                    >
                        <Typography variant='h1' align='center'>Home Page</Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}