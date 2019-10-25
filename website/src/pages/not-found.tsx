import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { PageContainer } from '../components/page-container';
import { HistoryPropInterface } from '../models/types';

interface Props extends HistoryPropInterface {
}

interface State {

}

export class NotFoundPage extends React.Component<Props, State> {

    render() {
        return (
            PageContainer({
                content:
                    <Grid
                        item md={6}
                        container
                        spacing={4}
                        direction="row"
                        alignItems="center"
                        justify="flex-start"
                    >
                    <Grid md={3} item>
                        <Button style={{boxShadow: "none"}} color='primary' variant='contained' fullWidth onClick={() => this.props.history.goBack()}>go back</Button>
                    </Grid> 
                </Grid>,
                title: 'error 404',
                subtitle: 'this page does not exist'
            })
        );
    }
}