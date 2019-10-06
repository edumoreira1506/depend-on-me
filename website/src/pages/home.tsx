import { AppBar, Grid, Toolbar, Typography, IconButton,  createMuiTheme, Button, Menu, MenuItem } from '@material-ui/core';
import H from 'history/index';
import React from 'react';
import WebRoundedIcon from '@material-ui/icons/WebRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const theme = createMuiTheme();

interface Props {
    history: H.History<any>|undefined;
}

interface State {
    auth:       boolean;
    anchorEl:   any;
}



export class HomePage extends React.Component<Props, State> {

    state: State = {
        auth:       true,
        anchorEl:   null,
    }

    setAuth = (auth: boolean) => {
        this.setState({auth: auth});
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setAuth(event.target.checked);
    }

    setAnchorEl = (value: any) => {
        this.setState({anchorEl: value});
    }

    handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        this.setAnchorEl(event.currentTarget);
    };
    
    handleClose = () => {
        this.setAnchorEl(null);
    };

    render() {
        return (
            <div style={{flexGrow: 1, minHeight: '100vh', display: 'flex', flexFlow: 'column'}}>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <WebRoundedIcon />
                        </IconButton>

                        <div style={{minWidth: theme.spacing(2)}}></div>
                        <Button color='inherit'>tasks</Button>

                        <div style={{minWidth: theme.spacing(2)}}></div>
                        <Button color='inherit'>projects</Button>

                        <div style={{minWidth: theme.spacing(2)}}></div>
                        <Button color='inherit'>organization</Button>

                        <div style={{flexGrow: 1}}></div>
                        <IconButton color="inherit" aria-label="logout" aria-controls="menu-appbar" aria-haspopup="true" onClick={this.handleMenu}>
                            <AccountCircleRoundedIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                        >
                            {this.state.auth && <div style={{minWidth: '10vw'}}>
                                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                            </div>}
                            {!this.state.auth && <div style={{minWidth: '10vw'}}>
                                <MenuItem onClick={this.handleClose}>Login</MenuItem>
                            </div>}

                        </Menu>
                    </Toolbar>
                </AppBar>


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