import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface DodecahedronProps {
  position?: [number, number, number];
  scale?: number;
}

export default function Dodecahedron({ position, scale }: DodecahedronProps) {
  const meshRef = useRef<Mesh>(null!);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // delta time 상관없이 회전 (프레임에 관련 없이)
  useFrame(() => (meshRef.current.rotation.x += 0.01));

  return (
    <group position={position} scale={scale}>
      <mesh
        ref={meshRef}
        scale={isClicked ? 1.5 : 1}
        onClick={() => setIsClicked(!isClicked)}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <dodecahedronGeometry args={[0.75]} />
        <meshStandardMaterial color={isHovered ? "#ffa845" : "#b545ff"} />
      </mesh>
    </group>
  );
}
