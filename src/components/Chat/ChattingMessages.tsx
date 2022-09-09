import { Chip, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useUserHook } from "../../hooks/UserHook";
import { supabase } from "../Auth/supabaseClient";

type Message = {
    id: number
    text: string
    room_id: number
    user_id: string
}

export const ChattingMessages = ({ selectedRoom }: { selectedRoom: string }) => {

    const [user] = useUserHook();

    const [listMessage, setListMessage] = useState<Message[]>([]);

    useEffect(() => {

        if (selectedRoom) {

            supabase.from(`chat_messages:room_id=eq.${selectedRoom}`)
                .on("INSERT", payload => {
                    console.log("msg received", payload);
                    setListMessage(m => [...m, payload.new]);
                }).subscribe()


            supabase
                .from('chat_messages')
                .select('*')
                .eq("room_id", selectedRoom)
                .then(res => {
                    console.log("getting list message from " + selectedRoom, res);
                    setListMessage(res.data ?? [])
                })
        }
    }, [selectedRoom])

    return (
        <Stack direction="column" justifyContent="flex-start" spacing={0.25} alignItems="baseline">

            {listMessage.map((msg, i) => {
                return (
                    msg.user_id !== user?.id ? <Chip size="small" label={msg.text} sx={{ background: "#eeaeca", ml: "5px !important", overflow: "clip" }} key={i}/>
                        : <Chip size="small" label={msg.text} sx={{ background: "#94bbe9", alignSelf: "flex-end", mr: "5px !important" }} key={i}/>
                )
            })}

        </Stack>
    )
}