import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { NavigationBar } from '../../components/navigation-bar';
import { HistoryPropInterface } from '../../models/types';

interface Props extends HistoryPropInterface{

}

interface State {

}

export class MyAccountPage extends React.Component<Props, State> {

    render () {
        return (
            <div>  
                <NavigationBar<Props> parent={this} />

                <Grid
                    container
                    spacing={4}
                    direction="row"
                    alignItems="flex-start"
                    justify="flex-start"
                    style={{paddingLeft: '10vmin', paddingRight: '10vmin', paddingTop: '2vmin', width: '100vw'}}
                >
                    <Grid item >
                        <Grid 
                            container
                            spacing={0}
                            direction="column"
                            alignItems="flex-start"
                            justify="flex-start"
                        >
                            <Grid item> 
                                <div style={{minWidth: "16vmax", minHeight: "16vmax", backgroundColor: "#DEDEDE", borderRadius: 4}}>
                                    <div style={{minHeight: '7vmax'}}></div>
                                    <Typography variant='body1' align='center'>
                                        [insert image here]
                                    </Typography>    
                                </div>
                            </Grid>
                            <Grid item > 
                                <Typography variant='h3'>username</Typography>
                            </Grid>
                            <Grid item> 
                                <Typography variant='h6'>firstname lastname</Typography>
                            </Grid>
                            <Grid item> 
                                <Typography variant='subtitle1'>email</Typography>
                            </Grid>
                            <Grid item> 
                                <Typography variant='subtitle1'>organization</Typography>
                            </Grid>
                            <Grid item> 
                                <Typography variant='subtitle1'>permissions</Typography>
                            </Grid>
                            <Grid item style={{maxWidth: '16vmax'}}> 
                                <Typography variant='subtitle1' style={{marginTop: 10, marginRight: '1vmin', paddingRight: '1vmin', paddingLeft: '1vmin', backgroundColor: "#FFAA22", display: 'inline-block', borderRadius: 4, fontWeight: 'bold', color: '#222'}}>frontend engineer</Typography>
                                <Typography variant='subtitle1' style={{marginTop: 10, marginRight: '1vmin', paddingRight: '1vmin', paddingLeft: '1vmin', backgroundColor: "#22AAFF", display: 'inline-block', borderRadius: 4, fontWeight: 'bold',color: '#222'}}>regression tester</Typography>
                                <Typography variant='subtitle1' style={{marginTop: 10, marginRight: '1vmin', paddingRight: '1vmin', paddingLeft: '1vmin', backgroundColor: "#22FFAA", display: 'inline-block', borderRadius: 4, fontWeight: 'bold',color: '#222'}}>database engineer</Typography>
                                <Typography variant='subtitle1' style={{marginTop: 10, marginRight: '1vmin', paddingRight: '1vmin', paddingLeft: '1vmin', backgroundColor: "#AAAAFF", display: 'inline-block', borderRadius: 4, fontWeight: 'bold', color: '#222'}}>functional tester</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item style={{flex: 1}}>
                        <Grid 
                            container
                            spacing={4}
                            direction="column"
                            alignItems="stretch"
                            justify="flex-start"
                            >
                                <Grid item>
                                    <div style={{ minWidth: 350, borderStyle: 'solid', borderWidth: 1, borderColor: '#DFDFDF', borderRadius: 4, padding: '1vmin'}} >
                                        <Typography variant='h4' style={{paddingTop: '1vmin', paddingBottom: '1vmin'}}>personal information</Typography>
                                        <Grid
                                            container
                                            spacing={4}
                                            direction="row"
                                            alignItems="flex-start"
                                            justify="space-between"
                                            >
                                            <Grid item>
                                                <Typography variant='subtitle1' style={{display: 'inline-block', paddingRight: 12}}>Email:</Typography>
                                                <Typography variant='subtitle1' color='primary' style={{display: 'inline-block'}}>test_email@email.com</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Button variant='contained' color='primary' size='small' style={{marginRight: '1vmin', display: 'inline-block', boxShadow: 'none'}}>change</Button>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            container
                                            spacing={4}
                                            direction="row"
                                            alignItems="flex-start"
                                            justify="space-between"
                                            >
                                            <Grid item>
                                                <Typography variant='subtitle1' style={{display: 'inline-block', paddingRight: 12}}>Password:</Typography>
                                                <Typography variant='subtitle1' color='primary' style={{display: 'inline-block'}}>*************</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Button variant='contained' color='primary' size='small' style={{marginRight: '1vmin', display: 'inline-block', boxShadow: 'none'}}>reset</Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <div style={{minWidth: 575, borderStyle: 'solid', borderWidth: 1, borderColor: '#DFDFDF', borderRadius: 4, padding: '1vmin'}} >
                                        <Typography variant='h4' style={{paddingTop: '1vmin', paddingBottom: '1vmin'}}>danger zone</Typography>
                                        <Grid
                                            container
                                            spacing={4}
                                            direction="row"
                                            alignItems="flex-start"
                                            justify="space-between"
                                            >
                                            <Grid item>
                                                <Typography variant='subtitle1' style={{display: 'inline-block'}}>Warning this action is permanent and cannot be undone</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Button variant='contained' color='secondary' size='small' style={{marginRight: '1vmin', display: 'inline-block', boxShadow: 'none'}}>delete account</Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}