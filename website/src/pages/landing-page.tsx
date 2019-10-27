import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { PageService } from '../services/page-service';
import { PageContainer } from '../components/page-container';
import { HistoryPropInterface } from '../models/types';

interface Props extends HistoryPropInterface {
}

interface State {
}

export default class LandingPage extends React.Component<Props, State> {

    render() {
        return (
            PageContainer ({
                content: 
                    <Grid
                        item xs={6}
                        container
                        spacing={4}
                        direction="row"
                        alignItems="center"
                        justify="flex-start"
                    >
                        <Grid xs={2} item>
                            <Button style={{boxShadow: "none"}} color='primary' variant='contained' fullWidth onClick={() => PageService.redirect(this.props.history, '/login')}>login</Button>
                        </Grid>
                        <Grid md={2} item>
                            <Button style={{boxShadow: "none", minWidth: '160px'}} color='primary' variant='contained' fullWidth onClick={() => PageService.redirect(this.props.history, '/createaccount')}>create account</Button>
                        </Grid>
                    </Grid>,
                title: "depend on me",
                subtitle: "desciption of depend on me"
            })
        );
    }
}