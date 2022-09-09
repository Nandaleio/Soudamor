import SendIcon from '@mui/icons-material/Send';
import { Fab, Paper } from "@mui/material";
import { useState } from "react";
import { useUserHook } from "../../hooks/UserHook";
import { supabase } from "../Auth/supabaseClient";
import { ChattingInput } from "./ChattingInput";
import { ChattingMessages } from "./ChattingMessages";
import { ConnectedUserList } from "./ConnectedUserList";


export const Chat = () => {
    const [open, setOpen] = useState(false);

    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [user] = useUserHook();

    const setUser = (id: string) => {
        setSelectedUser(id);
        supabase
            .rpc('get_chat_room_id', {
                curr_user: user?.id,
                othe_user: id
            }).then((res) => {
                console.log('getting chat room', res)
                if (res.data) {
                    setSelectedRoom(res.data.toString());
                }
            })
    }

    return (
        <>
            <Fab sx={{ position: 'absolute', bottom: 16, right: 16, }} onClick={() => setOpen(!open)}>
                <SendIcon />
            </Fab>

            <Paper hidden={!open} sx={{ position: 'absolute', bottom: 80, right: 16, maxWidth: "400px", maxHeight: "400px" }}>

                <ConnectedUserList selectedUser={selectedUser} callB={setUser} />

                <ChattingMessages selectedRoom={selectedRoom} />

                <ChattingInput selectedRoom={selectedRoom} />

            </Paper>
        </>
    )
}