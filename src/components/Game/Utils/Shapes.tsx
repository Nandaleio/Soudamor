import { ThreeElements, useFrame } from "@react-three/fiber"
import { useRef } from "react"


export const BoxMesh = ({props}: {props: ThreeElements['mesh']}) => {


    const ref = useRef<THREE.Mesh>(null!)
    return (
        <mesh
            {...props}
            ref={ref}
            scale={50}>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial color={'orange'} />
        </mesh>
    )
}