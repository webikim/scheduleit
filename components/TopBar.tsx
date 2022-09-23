import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';

export const LEFT_MENU = ['TimeTable',
    'Schedule'
    ];

interface TopBarProp {

}

const TopBar = (props: TopBarProp) => {
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{
                            marginRight: 5,
                        }}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        
                    </Typography>
                    <Button color='inherit' >Login</Button>
                    <Button color='inherit' >Logout</Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default TopBar;