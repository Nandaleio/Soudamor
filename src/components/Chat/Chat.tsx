import { Avatar, ClickAwayListener, Divider, Fab, List, ListItem, ListItemAvatar, Paper, Stack } from "@mui/material"
import { useEffect, useState } from "react";
import { useUserHook } from "../../hooks/UserHook";
import { supabase } from "../Auth/supabaseClient";
import { ChattingInput } from "./ChattingInput";
import { ChattingMessages } from "./ChattingMessages";
import { ConnectedUserList } from "./ConnectedUserList";
import SendIcon from '@mui/icons-material/Send';


export const Chat = () => {
    const [open, setOpen] = useState(false);

    const [selectedRoom, setSelectedRoom] = useState("");
    const [user] = useUserHook();

    const setUser = (id: string) => {
        supabase
            .from('chat_room_users')
            .select("*")
            .in('user_id', [id, user?.id])
            .then((resGetChatRoom) => {
                if (resGetChatRoom.data?.length) {
                    console.log("Getting room id :", resGetChatRoom);
                    setSelectedRoom(resGetChatRoom.data[0].room_id);
                } else {
                    console.log("Creating a new Room");
                    supabase
                        .from('chat_room')
                        .insert([
                            { name: 'TestName' },
                        ]).then(resCreateChatRoom => {
                            console.log("New Room : ", resCreateChatRoom);
                            if (resCreateChatRoom.data && resCreateChatRoom.data[0]) {
                                supabase
                                    .from('chat_room_users')
                                    .insert([
                                        { user_id: user?.id, room_id: resCreateChatRoom.data[0].id },
                                        { user_id: id, room_id: resCreateChatRoom.data[0].id },
                                    ]).then(res => {
                                        console.log("User added to the new Room", res);
                                        setSelectedRoom(resCreateChatRoom.data[0].id);
                                    })
                            }
                        })
                }
            });
    }

    return (
        <>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
                <>
                    <Fab sx={{ position: 'absolute', bottom: 16, right: 16, }} onClick={() => setOpen(!open)}>
                        <SendIcon />
                    </Fab>

                    <Paper hidden={!open} sx={{ position: 'absolute', bottom: 80, right: 16, maxWidth: "400px", maxHeight: "400px" }}>

                        <ConnectedUserList selectedUser={selectedRoom} callB={setUser} />

                        <ChattingMessages selectedRoom={selectedRoom} />

                        <ChattingInput selectedRoom={selectedRoom} />

                    </Paper>
                </>
            </ClickAwayListener>
        </>
    )
}