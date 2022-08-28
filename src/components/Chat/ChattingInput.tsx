import SendIcon from '@mui/icons-material/Send';
import { Box, FormControl, IconButton, InputAdornment, OutlinedInput } from "@mui/material"
import { useState } from 'react';
import { useUserHook } from '../../hooks/UserHook';
import { supabase } from '../Auth/supabaseClient';



export const ChattingInput = ({selectedRoom}: {selectedRoom: string}) => {
    
    const [user] = useUserHook();

    const [message, setMessage] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value)
    };


    const send = () => {
        setMessage(message.trim());
        if(message && user){
            supabase
            .from('chat_messages')
            .insert([
                { user_id: user?.id, room_id: selectedRoom, text: message },
            ]).then(res => {
                console.log("message sent:", res);
                setMessage("");
            })
        }
    }

    return (
        <Box>

            <FormControl size="small" sx={{ width: '100%' }} variant="outlined">
                <OutlinedInput
                    onChange={handleChange}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            send();
                        }
                    }}
                    value={message}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={send}>
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>

        </Box>
    )
}