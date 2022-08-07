import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

const Account = () => {

    const [currentUser, setCurrentUser] = useState(supabase.auth.user())

    return (

        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {currentUser?.email}
                </Typography>
                <Typography variant="body2">
                    Phone: {currentUser?.phone}
                    <br />
                    Last Sign at: {currentUser?.last_sign_in_at}
                    <br />
                    Roles : {currentUser?.role}
                </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    )
}

export default Account