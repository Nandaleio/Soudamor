import { ThreeElements } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';
import { supabase } from "../../Auth/supabaseClient";


export const Player = ({ props, color, id }: { props?: ThreeElements['mesh'], color: string, id: string }) => {

    const ref = useRef<THREE.Mesh>(null!)

    document.addEventListener('keypress', (event) => {
        var name = event.key;
        if (ref.current !== null) {
            if ("d" === name) {
                ref.current.position.x += 10;
            }
            if ("q" === name) {
                ref.current.position.x -= 10;
            }
            if ("z" === name) {
                ref.current.position.y += 10;
            }
            if ("s" === name) {
                ref.current.position.y -= 10;
            }
        }

        supabase.from('entities')
            .update({ x: 0, y: 0, })
            .eq('user_id', id)
    }, false);


    return (
        <mesh
            {...props}
            ref={ref}
            scale={50}>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial color={new THREE.Color("#" + color).convertSRGBToLinear()} />
        </mesh>
    )

}