import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

export default function SignUp() {

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        supabase.auth.signUp({
            email: data.get('email')?.toString(),
            password: data.get('password')?.toString()
        }).then((user) => {
            navigate('/signIn');
        }, (error) => {
            if(error) alert(error);
        })
    };

    return (
        <><Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            N
        </Avatar><Typography component="h1" variant="h5">
                Sign up
            </Typography><Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Confirm Email Address"
                            name="email"
                            autoComplete="email" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password" />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
                <Link to="/login">
                    Already have an account? Sign in
                </Link>
            </Box></>
    );
}
