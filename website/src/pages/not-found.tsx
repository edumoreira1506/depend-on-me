import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import H from 'history/index';

interface Props {
    history: H.History<any>;
}

interface State {

}

export class NotFoundPage extends React.Component<Props, State> {

    render() {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="flex-start"
                justify="center"
                style={{minHeight: '100vh', padding: '10vw'}}
            >
                <Grid item md={6} style={{minWidth: '20vw'}}>
                    <Typography variant='h1' align='left'>error 404 
                        <Typography variant='h4' align='left'>this page does not exist</Typography>
                    </Typography>
                </Grid>
                <div style={{minHeight: '5vh'}}/>
                <Grid
                    item md={6}
                    container
                    spacing={4}
                    direction="row"
                    alignItems="center"
                    justify="flex-start"
                >
                    <Grid md={3} item>
                        <Button color='primary' variant='contained' fullWidth onClick={() => this.props.history.goBack()}>go back</Button>
                    </Grid>
                    
                </Grid>
            </Grid>
        );

    }

}