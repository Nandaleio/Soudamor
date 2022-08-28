import { Chip, Stack } from "@mui/material";
import { RealtimeSubscription } from "@supabase/supabase-js";
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
    const [currentSubscription, setCurrentSubscription] = useState<RealtimeSubscription[]>([]);

    useEffect(() => {
        setCurrentSubscription(supabase.getSubscriptions().filter(s => s.topic.startsWith("realtime:public:chat_messages")));
        console.log("currentSubscription",currentSubscription);
        if (selectedRoom && user) {
            if(currentSubscription && currentSubscription.length > 0) {
                currentSubscription.forEach(s => {
                    supabase.removeSubscription(s);
                })
            } 
            
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
                    console.log("getting list message from "+ selectedRoom, res);
                    setListMessage(res.data ?? [])
                })
        }
    }, [selectedRoom, user])

    return (
        <Stack direction="column" justifyContent="flex-start" spacing={0.25} alignItems="baseline">

            {listMessage.map((msg) => {
                return (
                    msg.user_id !== user?.id ? <Chip size="small" label={msg.text} sx={{ background: "#eeaeca", ml: "5px !important", overflow: "clip" }} />
                        : <Chip size="small" label={msg.text} sx={{ background: "#94bbe9", alignSelf: "flex-end", mr: "5px !important" }} />
                )
            })}

        </Stack>
    )
}