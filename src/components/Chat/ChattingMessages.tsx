import { Chip, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useUserHook } from "../../hooks/UserHook";
import { supabase } from "../Auth/supabaseClient";

type Message = {
    text: string,
    sender: string
    receiver: string
}

export const ChattingMessages = ({selectedUser}: { selectedUser: string }) => {

    const [user] = useUserHook();

    const [listMessage, setListMessage] = useState<Message[]>([]);

    useEffect(() => {
        // supabase
        //     .from(`chat:sender.eq.${user?.id}and(receiver.eq.${selectedUser}), receiver.eq.${user?.id}and(sender.eq${selectedUser})`)
        //     .on('*', payload => {
        //         setListMessage(m => [...m, payload.new]);
        //     })
        //     .subscribe()

            // supabase
            // .from('chat')
            // .select('*')
            // .or(`sender.eq.${user?.id},and(receiver.eq.${selectedUser}), receiver.eq.${user?.id},and(sender.eq${selectedUser})`)
            // .then(res => {
            //     setListMessage(res.data ?? [])
            // })

            supabase
            .from('chat')
            .select('*')
            .in('sender', [user?.id, selectedUser])
            .in('receiver', [user?.id, selectedUser])
            .then(res => {
                setListMessage(res.data ?? [])
            })
      }, [selectedUser])

    return (
        <Stack direction="column" justifyContent="flex-start" spacing={0.25} alignItems="baseline">

            {listMessage.map((msg) => {
                return (
                    msg.sender !== user?.id ? <Chip size="small" label={msg.text} sx={{ background: "#eeaeca", ml: "5px !important", overflow: "clip" }} />
                        : <Chip size="small" label={msg.text} sx={{ background: "#94bbe9", alignSelf: "flex-end", mr: "5px !important" }} />
                )
            })}

        </Stack>
    )
}