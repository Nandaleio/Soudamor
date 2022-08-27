import { useFrame } from "@react-three/fiber";
import { useState } from "react"


export const DynamicLight = () => {

    const [time, setTime] = useState(0);
    useFrame((state, delta) => (setTime(time+delta)));

    return (
        <pointLight position={[Math.sin(time), 10, 10]} />
    )

}