import { Chip, Stack } from "@mui/material";
import { RealtimeSubscription } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useUserHook } from "../../hooks/UserHook";
import { supabase } from "../Auth/supabaseClient";

type Message = {
    text: string,
    sender: string
    receiver: string
}

export const ChattingMessages = ({ selectedUser }: { selectedUser: string }) => {

    const [user] = useUserHook();

    const [listMessage, setListMessage] = useState<Message[]>([]);
    const [currentSubscription, setCurrentSubscription] = useState<RealtimeSubscription[]>([]);

    useEffect(() => {
        setCurrentSubscription(supabase.getSubscriptions().filter(s => s.topic.startsWith("realtime:public:chat")));
        console.log("currentSubscription",currentSubscription);
        if (selectedUser && user) {
            if(currentSubscription && currentSubscription.length > 0) {
                currentSubscription.forEach(s => {
                    supabase.removeSubscription(s);
                })
            } 
            
            supabase.from(`chat:sender=eq.${user?.id}`)
            .on("INSERT", payload => {
                console.log("msg received", payload);
                setListMessage(m => [...m, payload.new]);
            })
            .subscribe()
            supabase.from(`chat:sender=eq${selectedUser}`)
            .on("INSERT", payload => {
                console.log("msg received", payload);
                setListMessage(m => [...m, payload.new]);
            })
            .subscribe()
            supabase.from(`chat:receiver=eq.${selectedUser}`)
            .on("INSERT", payload => {
                console.log("msg received", payload);
                setListMessage(m => [...m, payload.new]);
            })
            .subscribe()
            supabase.from(`chat:receiver=eq.${user?.id}`)
            .on("INSERT", payload => {
                console.log("msg received", payload);
                setListMessage(m => [...m, payload.new]);
            })
            .subscribe()


            supabase
                .from('chat')
                .select('*')
                .in('sender', [user?.id, selectedUser])
                .in('receiver', [user?.id, selectedUser])
                .then(res => {
                    setListMessage(res.data ?? [])
                })
        }
    }, [selectedUser, user])

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