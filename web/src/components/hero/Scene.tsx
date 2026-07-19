"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  ContactShadows,
  Environment,
  Lightformer,
  Points,
  PointMaterial,
} from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Vignette, Noise } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef } from "react";
import { AdditiveBlending } from "three";
import type { Group, MeshBasicMaterial, Points as ThreePoints } from "three";
import * as random from "maath/random";

const gold = "#d8b878";
const bodyDark = "#1b1720";

/** A stylised DSLR built from primitives — no external assets, keeps the bundle honest. */
function CameraModel() {
  return (
    <group scale={1.15}>
      {/* Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.5, 1.1]} />
        <meshStandardMaterial color={bodyDark} metalness={0.6} roughness={0.32} envMapIntensity={1.1} />
      </mesh>
      {/* Top prism / viewfinder */}
      <mesh castShadow position={[0.35, 0.95, 0]}>
        <boxGeometry args={[0.9, 0.55, 0.9]} />
        <meshStandardMaterial color={bodyDark} metalness={0.6} roughness={0.32} envMapIntensity={1.1} />
      </mesh>
      {/* Grip */}
      <mesh castShadow position={[-1.15, -0.05, 0]}>
        <boxGeometry args={[0.5, 1.5, 1.1]} />
        <meshStandardMaterial color="#0f0d13" metalness={0.5} roughness={0.55} envMapIntensity={0.9} />
      </mesh>
      {/* Lens barrel */}
      <mesh castShadow position={[0.2, -0.05, 0.75]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.62, 0.68, 1.1, 48]} />
        <meshStandardMaterial color="#141118" metalness={0.7} roughness={0.28} envMapIntensity={1.2} />
      </mesh>
      {/* Gold lens ring — emissive so Bloom catches it */}
      <mesh position={[0.2, -0.05, 1.32]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.06, 24, 64]} />
        <meshStandardMaterial
          color={gold}
          metalness={1}
          roughness={0.18}
          emissive={gold}
          emissiveIntensity={0.4}
          envMapIntensity={1.4}
        />
      </mesh>
      {/* Front glass — high reflectivity for the studio-light glint */}
      <mesh position={[0.2, -0.05, 1.36]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.05, 48]} />
        <meshStandardMaterial color="#0a1420" metalness={1} roughness={0.03} envMapIntensity={2} />
      </mesh>
      {/* Shutter button */}
      <mesh position={[-0.65, 0.82, 0.2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.12, 24]} />
        <meshStandardMaterial color={gold} metalness={1} roughness={0.22} emissive={gold} emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

/**
 * Asset-free HDR-style lighting. Lightformers act as studio softboxes that the
 * metal and lens glass reflect, baked once (frames={1}) for zero per-frame cost.
 */
function StudioEnvironment() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer intensity={3} position={[0, 4, -2]} scale={[10, 4, 1]} color="#fff6e6" />
      <Lightformer intensity={2} position={[-5, 1, 1]} scale={[3, 6, 1]} color={gold} />
      <Lightformer intensity={1.4} position={[5, -1, 2]} scale={[4, 4, 1]} color="#8fb3ff" />
      <Lightformer intensity={1} position={[0, -3, 3]} scale={[8, 3, 1]} color="#ffffff" />
    </Environment>
  );
}

/** Slow-drifting gold dust / fireflies. */
function Fireflies({ count = 140 }: { count?: number }) {
  const ref = useRef<ThreePoints>(null);

  const positions = useMemo(() => {
    const arr = random.inSphere(new Float32Array(count * 3), { radius: 7 }) as Float32Array;
    // maath occasionally emits NaN at the origin — scrub it so the bounds stay valid.
    for (let i = 0; i < arr.length; i++) if (Number.isNaN(arr[i])) arr[i] = 0;
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x += delta * 0.012;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#e7cf9e"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </Points>
  );
}

/**
 * Drives the camera: a gentle mouse parallax on the subject and a scroll-linked
 * dolly that pulls back and rises as the hero scrolls out of view.
 */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null);
  const scroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scroll.current = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state) => {
    const p = scroll.current;
    const cam = state.camera;
    const targetZ = 6 + p * 3.5;
    const targetY = 0.4 + p * 1.4;
    cam.position.z += (targetZ - cam.position.z) * 0.06;
    cam.position.y += (targetY - cam.position.y) * 0.06;
    cam.lookAt(0, 0, 0);

    if (group.current) {
      const ty = state.pointer.x * 0.5;
      const tx = -state.pointer.y * 0.3;
      group.current.rotation.y += (ty - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (tx - group.current.rotation.x) * 0.05;
    }
  });

  return <group ref={group}>{children}</group>;
}

/** A white full-frame flash keyed to the first interaction — the shutter beat. */
function ShutterFlash() {
  const mat = useRef<MeshBasicMaterial>(null);
  const level = useRef(0);

  useEffect(() => {
    const fire = () => {
      level.current = 1;
    };
    window.addEventListener("pointerdown", fire);
    const auto = window.setTimeout(fire, 1400); // one cinematic pop after load
    return () => {
      window.removeEventListener("pointerdown", fire);
      window.clearTimeout(auto);
    };
  }, []);

  useFrame((_, delta) => {
    if (level.current > 0) level.current = Math.max(0, level.current - delta * 2.6);
    if (mat.current) mat.current.opacity = level.current * 0.75;
  });

  return (
    <mesh position={[0, 0, 4]} renderOrder={999}>
      <planeGeometry args={[40, 40]} />
      <meshBasicMaterial ref={mat} color="#ffffff" transparent opacity={0} depthTest={false} depthWrite={false} />
    </mesh>
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
      <fog attach="fog" args={["#0b0a0f", 9, 22]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 4]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-4, 2, -3]} intensity={30} color={gold} />
      <pointLight position={[3, -2, 4]} intensity={12} color="#8fb3ff" />

      <StudioEnvironment />
      <Fireflies />

      <Rig>
        <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.7}>
          <CameraModel />
        </Float>
      </Rig>

      <ContactShadows position={[0, -1.6, 0]} opacity={0.5} scale={9} blur={2.6} far={4} color="#000000" />

      <ShutterFlash />

      <EffectComposer>
        <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.55} luminanceSmoothing={0.3} />
        <DepthOfField focusDistance={0.02} focalLength={0.025} bokehScale={2.4} />
        <Vignette offset={0.28} darkness={0.72} />
        <Noise premultiply opacity={0.035} />
      </EffectComposer>
    </Canvas>
  );
}
