import { Grid, Typography } from '@material-ui/core';
import H from 'history/index';
import React from 'react';
import { NavigationBar } from '../components/navigation-bar';

interface Props {
    history: H.History<any>;
}

interface State {
}

export class HomePage extends React.Component<Props, State> {

    render() {
        return (
            <div style={{flexGrow: 1, minHeight: '100vh', display: 'flex', flexFlow: 'column'}}>
                <NavigationBar history={this.props.history} />

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