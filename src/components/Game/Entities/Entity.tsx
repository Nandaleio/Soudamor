import { useEffect, useRef } from "react";
import { SimpleEntity } from "../../models/GameEntities";



export const Entity = ({entity}: {entity: SimpleEntity}) => {

    useEffect(() => {
        console.log("Creation new Entity: ", entity);
    }, [entity]);

    const ref = useRef<THREE.Mesh>(null!)
    
    return (
        <mesh
            position={0}
            ref={ref}
            scale={50}>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial color={entity.color} />
        </mesh>
    )

} 