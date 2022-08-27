import { useState, useEffect } from "react";
import { Stack, Avatar, IconButton } from "@mui/material"
import { supabase } from "../Auth/supabaseClient"
import { User } from "../models/User";
import { useUserHook } from "../../hooks/UserHook";


export const ConnectedUserList = ({ callB, selectedUser }: { callB: any, selectedUser: string }) => {

    const [user] = useUserHook();

    const [onlineUser, setOnlineUser] = useState<User[]>([]);

    useEffect(() => {

        supabase.from('users')
            .select('*')
            .neq("id", user?.id)
            .then(res => {
                setOnlineUser(res.data ?? []);
            })
    }, [])

    return (
        <Stack direction="row-reverse" spacing={0}>

            {onlineUser.map((user) => {
                return (
                    <IconButton
                        onClick={() => callB(user.id)}
                    >
                        {user.avatar
                            ? user.id === selectedUser ? <Avatar alt={user.id} src={user.avatar} /> : <Avatar alt={user.id} src={user.avatar} sx={{width: '35px', height: '35px'}}/>
                            : user.id === selectedUser ? <Avatar alt={user.id} sx={{ bgcolor: '#' + Math.floor(Math.random() * 16777215).toString(16) }}>{user.username}</Avatar> : <Avatar alt={user.id} sx={{ bgcolor: '#' + Math.floor(Math.random() * 16777215).toString(16), width: '35px', height: '35px' }}>{user.username}</Avatar> 
                        }
                    </IconButton>
                )
            }
            )}

        </Stack>
    )
}