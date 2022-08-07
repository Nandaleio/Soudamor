import { AccountCircle } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Typography, Stack, Button, IconButton, Menu, MenuItem, } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./Auth/supabaseClient";

export default function Header() {

    const [session, setSession] = useState(supabase.auth.session())

    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    const signOut = () => {
        supabase.auth.signOut().then((error) => {
            window.location.href = '/';
        })
    }


    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h3" component="div">
                    ناندليو
                </Typography>

                <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={3} marginLeft="15px">
                        <Button component={Link} to="todo" color="secondary">Todo</Button>
                    </Stack>
                </Box>

                {!session ? <Button component={Link} to="login" color="inherit">Login</Button> :
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                        >
                            <MenuItem component={Link} state={session} to="Account">My account</MenuItem>
                            <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
                        </Menu>
                    </div>}
            </Toolbar>
        </AppBar>
    );
}