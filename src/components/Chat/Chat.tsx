import { Avatar, ClickAwayListener, Divider, Fab, List, ListItem, ListItemAvatar, Paper, Stack } from "@mui/material"
import { useEffect, useState } from "react";
import { supabase } from "../Auth/supabaseClient";
import { ChattingInput } from "./ChattingInput";
import { ChattingMessages } from "./ChattingMessages";
import { ConnectedUserList } from "./ConnectedUserList";


export const Chat = () => {
    const [open, setOpen] = useState(false);

    const [selectedUser, setSelectedUser] = useState("");
 
    const setUser = (id: string) => {
        setSelectedUser(id);
      }

    return (
        <>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
                <>
                    <Fab sx={{ position: 'absolute', bottom: 16, right: 16, }} onClick={() => setOpen(!open)}>
                        Chat
                    </Fab>

                    <Paper hidden={!open} sx={{ position: 'absolute', bottom: 80, right: 16, maxWidth: "400px", maxHeight: "400px" }}>

                    <ConnectedUserList selectedUser={selectedUser} callB={setUser}/>

                    <ChattingMessages selectedUser={selectedUser}/>

                    <ChattingInput  selectedUser={selectedUser}/>

                    </Paper>
                </>
            </ClickAwayListener>
        </>
    )
}