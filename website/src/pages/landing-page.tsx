import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import H from 'history/index';
import { redirect } from '../services/page-service';


interface Props {
    history: H.History<any>;
}

interface State {
}

export default class LandingPage extends React.Component<Props, State> {

    render() {
        return (
            <Grid
                container
                spacing={8}
                direction="column"
                alignItems="flex-start"
                justify="center"
                style={{minHeight: '100vh', padding: '10vw'}}
            >
                <Grid item md={6} style={{minWidth: '20vw'}}>
                    <Typography variant='h1'>depend on me
                        <Typography variant='h4'>description of depend on me</Typography>
                    </Typography>
                </Grid>
                <Grid
                    item md={6}
                    container
                    spacing={4}
                    direction="row"
                    alignItems="center"
                    justify="flex-start"
                >
                    <Grid md={3} item>
                        <Button color='primary' variant='contained' fullWidth onClick={() => redirect(this.props.history, '/login')}>login</Button>
                    </Grid>
                    <Grid lg={4} item>
                        <Button style={{minWidth: '160px'}} color='primary' variant='contained' fullWidth onClick={() => redirect(this.props.history, '/createaccount')}>create account</Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}