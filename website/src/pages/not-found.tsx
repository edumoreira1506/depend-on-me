import React from 'react';
import { Grid, Button } from '@material-ui/core';
import H from 'history/index';
import { PageContainer } from '../components/page-container';

interface Props {
    history: H.History<any>;
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