import { useState, useEffect } from "react";
import { Stack, Avatar, IconButton, Box } from "@mui/material"
import { supabase } from "../Auth/supabaseClient"
import { User } from "../models/User";
import { useUserHook } from "../../hooks/UserHook";
import { UserAvatar } from "./UserAvatar";


export const ConnectedUserList = ({ callB, selectedUser }: { callB: any, selectedUser: string }) => {

    const [user] = useUserHook();

    const [onlineUser, setOnlineUser] = useState<User[]>([]);

    useEffect(() => {

        supabase.from('users')
            .select('*')
            .neq("id", user?.id)
            .then(res => {
                console.log("List user: ", res.data);
                setOnlineUser(res.data ?? []);
            })
    }, [])

    return (
        <>
            <Box display="flex">

                <IconButton>
                    +
                </IconButton>
                <Stack direction="row-reverse" spacing={0} sx={{flexGrow: "2"}}>

                    {onlineUser.map((user, i) => {
                        return (
                            <IconButton key={i} onClick={() => callB(user.id)}>
                                <UserAvatar user={user} selectedUser={selectedUser}/>
                            </IconButton>
                        )
                    }
                    )}

                </Stack>

            </Box>
        </>

    )
}