import { Dialog, DialogTitle, List, ListItem, ListItemAvatar, Avatar, ListItemText, TextField, Typography, ListItemButton, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useUserHook } from "../../hooks/UserHook"
import { supabase } from "../Auth/supabaseClient"
import { User } from "../models/User"
import { UserAvatar } from "./UserAvatar"



export const FriendModal = ({ open, onClose }: { open: boolean, onClose: any }) => {

    const [currentUser] = useUserHook();
    const [listAllUser, setListAllUser] = useState<User[]>([])
    const [listFriend, setListFriend] = useState<string[]>([])
    const [searchUserName, setSearchUserName] = useState('');


    const addFriend = (id: string) => {
        supabase.from('friends')
            .insert([
                { user_id: currentUser?.id, friend_id: id }
            ]).then(res => {
                console.log('friend added', res)
                if(res.data) setListFriend([...listFriend, ...res.data]);
            });
    }

    const removeFriend = (id: string) => {
        supabase.from('friends')
            .delete()
            .eq('user_id', currentUser?.id)
            .eq('friend_id', id)
            .then(res => {
                console.log('friend removed', res)
            });
    }
    

    useEffect(() => {
        if (open && searchUserName) {
            let friends = [];

            supabase.from('friends')
            .select(`friend_id`)
            .eq('user_id', currentUser?.id)
            .then(res => {
                if(res.data) setListFriend(res.data.map(l => l.friend_id));
            });

            supabase.from('users')
                .select('*')
                .like('username', `%${searchUserName.toLowerCase()}%`)
                .not('id', 'in', `(${currentUser?.id})`)
                .then(res => {
                    console.log('look for all user with username', res)
                    if (res.data) setListAllUser(res.data);
                })
        }
        if (!searchUserName) {
            setListAllUser([]);
        }
    }, [open, searchUserName]);


    return (
        <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open}>
            <DialogTitle>Manage Friends</DialogTitle>
            <TextField variant="outlined" onChange={(e: any) => setSearchUserName(e.target.value)} />
            <List>
                {listAllUser.map((user, i) => {
                    return (
                        <ListItem key={i}>

                            <UserAvatar user={user} selectedUser={user.id} />
                            <ListItemText primary={user.username} secondary={user.email} sx={{paddingLeft: '15px'}}/>
                            {listFriend.includes(user.id) 
                            ? <Button onClick={() => removeFriend(user.id)}> - </Button>
                            : <Button onClick={() => addFriend(user.id)}> + </Button>}

                        </ListItem>
                    )
                }
                )}
            </List>
        </Dialog>
    )
}