import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import Cube from "../../components/mesh/Cube";
import Dodecahedron from "../../components/mesh/Dodecahedron";

interface CanvasAreaProps {
  currentMessage: string;
}

export default function CanvasArea({ currentMessage }: CanvasAreaProps) {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 25 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <Cube currentMessage={currentMessage} />
      <Dodecahedron position={[0, 1, 0]} scale={0.2} />
      <ContactShadows
        frames={1}
        position={[0, -0.5, 0]}
        blur={1}
        opacity={0.75}
      />
      <ContactShadows
        frames={1}
        position={[0, -0.5, 0]}
        blur={3}
        color="orange"
      />
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
    </Canvas>
  );
}
