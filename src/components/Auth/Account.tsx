import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserHook } from '../../hooks/UserHook'
import { UserAvatar } from '../Chat/UserAvatar'
import { supabase } from './supabaseClient'

type PublicUser = {
    id: string
    email: string
    username: string
    avatar: string
}
const Account = () => {

    const [user] = useUserHook();
    const [publicUser, setPublicUser] = useState<PublicUser>();

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

                <UserAvatar user={publicUser ?? { id: '' }} selectedUser={user ? user.id : ''} />
                
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
                <Button component={Link} to='/editaccount'>Edit</Button>
            </CardActions>
        </Card>
    )
}

export default Account