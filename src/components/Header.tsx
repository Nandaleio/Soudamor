import { AccountCircle } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Typography, Stack, Button, IconButton, Menu, MenuItem, } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./Auth/supabaseClient";
import { Chat } from "./Chat/Chat";

export default function Header() {

    const navigate = useNavigate();

    const [session, setSession] = useState(supabase.auth.session())

    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })



    }, [])

    const signOut = () => {
        supabase.auth.signOut().then((error) => {
            supabase.auth.api.signOut(session?.access_token ?? "").then(error => {
                console.log('Sign out api:', error);
            })
            setSession(null);
            navigate('/');

        })
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
        <AppBar position="static" style={{ background: "linear-gradient(90deg, rgba(238,174,202,1) 42%, rgba(148,187,233,1) 100%)" }}>
            <Toolbar>
                <Typography variant="h3" component="div">
                    صدمور
                </Typography>

                <Box sx={{ flexGrow: 1 }}>
                    {session && <Stack direction="row" spacing={3} marginLeft="15px">
                        <Button component={Link} to="/todo" color="secondary">Todo</Button>
                        <Button component={Link} to="/game" color="secondary">Game</Button>
                    </Stack>}
                </Box>

                {!session ? <Button component={Link} to="/login" color="inherit">Login</Button> :
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
                            <MenuItem component={Link} state={session} to="/Account">My account</MenuItem>
                            <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
                        </Menu>
                    </div>}
            </Toolbar>
        </AppBar>
        
        {session && <Chat/>}
      </>
    );
}