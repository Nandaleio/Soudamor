
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import { useFrame } from '@react-three/fiber'
import { useState, useEffect } from 'react'
import { useUserHook } from '../../hooks/UserHook'
import { UserAvatar } from '../Chat/UserAvatar'
import { User } from '../models/User'
import { supabase } from './supabaseClient'

const EditAccount = () => {

    const [user] = useUserHook();
    const [publicUser, setPublicUser] = useState<User>();

    useEffect(() => {
        supabase.from("users")
            .select("*")
            .eq("id", user?.id)
            .then(res => {
                console.log("Getting public user info", res);
                if (res.data && res.data[0]) {
                    setPublicUser(res.data[0])
                }
            })
    }, [])

    return (

        <Card sx={{ minWidth: 275 }}>
            <CardContent>

                <UserAvatar user={publicUser ?? {id: ''}} selectedUser={user ? user.id : ''}/>

                <Typography variant="h4" color="text.secondary" gutterBottom>
                    {publicUser?.username}
                </Typography>



                <Typography>
                    Email: {publicUser?.email}
                    <br />
                    Roles : {user?.role}
                    <br />
                    Last Sign at: {user?.last_sign_in_at}
                    
                </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    )
}

export default EditAccount