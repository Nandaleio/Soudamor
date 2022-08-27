import { useState } from "react";
import { SimpleEntity } from "../../models/GameEntities";


export const TerrainGenerator = () => {

    const [entities, setEntities] = useState<SimpleEntity[]>([]);

    for (let index = 0; index < 10; index++) {
        let e: SimpleEntity = {
            color: Math.floor(Math.random() * 16777215).toString(16),
            x: Math.floor(Math.random() * 10),
            y: 0
        }
        setEntities(entities => [...entities, e]);
        
    } 

    return

}