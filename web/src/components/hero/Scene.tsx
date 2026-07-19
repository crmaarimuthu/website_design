"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

/** A stylised camera built from primitives — no external assets, keeps the bundle honest. */
function CameraModel() {
  const group = useRef<Group>(null);

  // Subtle mouse parallax; pointer is normalised to [-1, 1] by R3F.
  useFrame((state) => {
    if (!group.current) return;
    const targetY = state.pointer.x * 0.5;
    const targetX = -state.pointer.y * 0.3;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
  });

  const gold = "#d8b878";
  const bodyDark = "#1b1720";

  return (
    <group ref={group} scale={1.15}>
      {/* Body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 1.5, 1.1]} />
        <meshStandardMaterial color={bodyDark} metalness={0.5} roughness={0.35} />
      </mesh>
      {/* Top prism / viewfinder */}
      <mesh castShadow position={[0.35, 0.95, 0]}>
        <boxGeometry args={[0.9, 0.55, 0.9]} />
        <meshStandardMaterial color={bodyDark} metalness={0.5} roughness={0.35} />
      </mesh>
      {/* Grip */}
      <mesh castShadow position={[-1.15, -0.05, 0]}>
        <boxGeometry args={[0.5, 1.5, 1.1]} />
        <meshStandardMaterial color="#0f0d13" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Lens barrel */}
      <mesh castShadow position={[0.2, -0.05, 0.75]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.62, 0.68, 1.1, 48]} />
        <meshStandardMaterial color="#141118" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Gold lens ring */}
      <mesh position={[0.2, -0.05, 1.32]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.06, 24, 64]} />
        <meshStandardMaterial color={gold} metalness={1} roughness={0.2} emissive={gold} emissiveIntensity={0.15} />
      </mesh>
      {/* Front glass */}
      <mesh position={[0.2, -0.05, 1.36]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.05, 48]} />
        <meshStandardMaterial color="#0a1420" metalness={0.9} roughness={0.05} />
      </mesh>
      {/* Shutter button */}
      <mesh position={[-0.65, 0.82, 0.2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.12, 24]} />
        <meshStandardMaterial color={gold} metalness={1} roughness={0.25} />
      </mesh>
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.4, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 4]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-4, 2, -3]} intensity={30} color="#d8b878" />
      <pointLight position={[3, -2, 4]} intensity={12} color="#8fb3ff" />

      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.7}>
        <CameraModel />
      </Float>

      <ContactShadows position={[0, -1.6, 0]} opacity={0.5} scale={9} blur={2.6} far={4} color="#000000" />
    </Canvas>
  );
}
