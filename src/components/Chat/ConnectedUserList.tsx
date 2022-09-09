import SettingsIcon from '@mui/icons-material/Settings';
import { Box, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useUserHook } from "../../hooks/UserHook";
import { supabase } from "../Auth/supabaseClient";
import { User } from "../models/User";
import { FriendModal } from "./FriendModal";
import { UserAvatar } from "./UserAvatar";


export const ConnectedUserList = ({ callB, selectedUser }: { callB: any, selectedUser: string }) => {

    const [currentUser] = useUserHook();

    const [onlineUser, setOnlineUser] = useState<User[]>([]);

    const [friendModal, setFriendModal] = useState(false);

    useEffect(() => {

        supabase.from('friends')
            .select(`friend_id`)
            .eq('user_id', currentUser?.id)
            .then(res => {
                console.log('list friends id', res.data)
                if (res.data) {
                    supabase.from('users')
                        .select('*')
                        .in("id", res.data.map(l => l.friend_id))
                        .then(res => {
                            console.log("List user: ", res.data);
                            setOnlineUser(res.data ?? []);
                        })
                }
            })


    }, [])

    return (
        <>
            <Box display="flex">

                <IconButton onClick={() => setFriendModal(true)}>
                    <SettingsIcon />
                </IconButton>
                <Stack direction="row-reverse" spacing={0} sx={{ flexGrow: "2" }}>

                    {onlineUser.map((user, i) => {
                        return (
                            <IconButton key={i} onClick={() => callB(user.id)}>
                                <UserAvatar user={user} selectedUser={selectedUser} />
                            </IconButton>
                        )
                    }
                    )}

                </Stack>
                <FriendModal open={friendModal} onClose={() => setFriendModal(false)} />
            </Box>
        </>

    )
}