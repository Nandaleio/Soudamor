import { Box } from "@mui/material";
import { Canvas } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { supabase } from "../Auth/supabaseClient";
import { SimpleEntity } from "../models/GameEntities";
import { Entity } from "./Entities/Entity";
import { Player } from "./Entities/Player";
import { BoxMesh } from "./Utils/Shapes";


export const Game = () => {


    const [entities, setEntities] = useState<SimpleEntity[]>([]);

    supabase.from('entities')
        .on('INSERT', payload => {
            console.log('New Player arrived: ', payload.new)
            if (payload.new.user_id != user_id) {
                setEntities(entities => [...entities, payload.new]);
            }
        })
        .subscribe()


    const [color] = useState(Math.floor(Math.random() * 16777215).toString(16));
    const [user_id] = useState(supabase.auth.session()?.user?.id);

    useEffect(() => {
        console.log("Trying to Enter World");
        supabase.from('entities')
            .insert([
                {
                    x: 0,
                    y: 0,
                    color: color,
                    user_id: user_id
                },
            ]).then(() => { console.log("You're In !"); })


        supabase.from('entities')
            .select('*')
            .then((res) => {
                console.log('Entities already present: ' + res.data?.length, res)
                setEntities(entities => [...entities, ...res.data ?? []]);
                setEntities(entities => [...entities, { x: 0, y: 0, color: 'red' }]);
            })

        return () => {
            supabase.from('entities')
                .delete()
                .eq('user_id', user_id)
                .then(() => { console.log("Leaving World"); })
        }
    }, []);

    return (
        <Box sx={{height: "91vh", background: "black" }}>
            <Canvas orthographic>
                <>
                    <ambientLight />

                    {entities.map(e => {
                        <Entity entity={e} />
                    })}

                    <Player color={color} id={user_id!} />
                </>
            </Canvas>
        </Box>
    )
}

