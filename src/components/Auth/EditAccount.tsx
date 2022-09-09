
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useUserHook } from '../../hooks/UserHook'
import { UserAvatar } from '../Chat/UserAvatar'
import { User } from '../models/User'
import { supabase } from './supabaseClient'

const EditAccount = () => {

    const [user] = useUserHook();
    const [publicUser, setPublicUser] = useState<User>();

    const [username, setUsername] = useState();
    // const [color, setColor] = useState();

    const saveAccount = () => {

        supabase
            .from('users')
            .update({ userName: username })
            .eq("id", user?.id)
            .then(res => {
                console.log('User updated', res);
            })
    }

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
    }, [user?.id])

    return (

        <Card sx={{ minWidth: 275 }}>
            <CardContent>

                <UserAvatar user={publicUser ?? { id: '' }} selectedUser={user ? user.id : ''} />

                <TextField label="Username" variant="outlined" value={publicUser?.username} onChange={(e: any) => setUsername(e.target.value)} />

                {/* <ColorPicker name='color' defaultValue='#000' value={publicUser?.color} onChange={color => setColor(color)} */}




                <Typography>
                    Email: {publicUser?.email}
                    <br />
                    Roles : {user?.role}
                    <br />
                    Last Sign at: {user?.last_sign_in_at}

                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={saveAccount}>Save</Button>
            </CardActions>
        </Card>
    )
}

export default EditAccount