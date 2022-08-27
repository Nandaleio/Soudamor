import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';


export const SignIn = () => {
    
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        supabase.auth.signIn({
            email: data.get('email')?.toString(),
            password: data.get('password')?.toString()
        }).then((user) => {
            navigate('/');
        }, (error) => {
            if(error) alert(error);
        })
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                <Link to="/signUp">
                    Don't have an account? Sign Up
                </Link>
            </Box>
        </>
    );
}