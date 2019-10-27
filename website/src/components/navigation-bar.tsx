import React from 'react';
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, createMuiTheme } from '@material-ui/core';
import { PageService } from '../services/page-service';
import { BlankSpace } from './blank-space';
import WebRoundedIcon from '@material-ui/icons/WebRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { HistoryPropInterface } from '../models/types';

const theme = createMuiTheme();

interface Props<ParentProps extends HistoryPropInterface> {
    parent: React.Component<ParentProps, any>;
}

interface State {
    auth: boolean;
    anchorEl: any;
}

export class NavigationBar<ParentProps extends HistoryPropInterface> extends React.Component<Props<ParentProps>, State> {

    state: State = {
        auth: true,
        anchorEl: null
    }

    handleMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        this.setAnchorEl(event.currentTarget);
    }

    setAnchorEl = (value: any): void => {
        this.setState({anchorEl: value});
    }

    render() {
        return (
            <AppBar elevation={0} position='static'>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <WebRoundedIcon onClick={()=>PageService.redirect(this.props.parent.props.history, '/home/0')}/>
                    </IconButton>

                    <div style={{minWidth: theme.spacing(2)}}></div>
                    <Button color='inherit' onClick={()=>PageService.redirect(this.props.parent.props.history, '/tasks/0')}>tasks</Button>

                    <div style={{minWidth: theme.spacing(2)}}></div>
                    <Button color='inherit' onClick={()=>PageService.redirect(this.props.parent.props.history, '/projects/0')}>projects</Button>

                    <div style={{minWidth: theme.spacing(2)}}></div>
                    <Button color='inherit' onClick={()=>PageService.redirect(this.props.parent.props.history, '/organization/0')}>organization</Button>

                    {BlankSpace({fill: true})}
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
                        onClose={this.setAnchorEl}
                    >
                        {this.state.auth && <div style={{minWidth: '10vw'}}>
                            <MenuItem onClick={()=>PageService.redirect(this.props.parent.props.history, '/myaccount')}>My account</MenuItem>
                            <MenuItem onClick={() => {
                                this.setAnchorEl(null);
                                PageService.redirect(this.props.parent.props.history, '/login');
                            }}>Logout</MenuItem>
                        </div>}
                        {!this.state.auth && <div style={{minWidth: '10vw'}}>
                            <MenuItem onClick={() => {
                                this.setAnchorEl(null);
                                PageService.redirect(this.props.parent.props.history, '/login');
                            }}>Login</MenuItem>
                        </div>}

                    </Menu>
                </Toolbar>
            </AppBar>
        );
    }

}