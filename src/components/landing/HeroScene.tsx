import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";

function FloatingCard({
  position,
  rotation,
  color,
  size = [1.4, 1.9, 0.05] as [number, number, number],
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  size?: [number, number, number];
}) {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    ref.current.rotation.x = rotation[0] + Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={ref} position={position} rotation={rotation} castShadow>
        <boxGeometry args={size} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.4}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.2}
          transmission={0.15}
          thickness={0.4}
        />
      </mesh>
    </Float>
  );
}

function Orb({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh position={position} scale={scale}>
        <icosahedronGeometry args={[0.7, 4]} />
        <MeshDistortMaterial
          color={color}
          distort={0.35}
          speed={1.4}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function ConnectionLines() {
  const ref = useRef<Group>(null);
  const points = useMemo(() => {
    const pts: Array<[THREE.Vector3, THREE.Vector3]> = [];
    const nodes: THREE.Vector3[] = [
      new THREE.Vector3(-3.2, 1.4, -1),
      new THREE.Vector3(-1.8, -1.6, -0.5),
      new THREE.Vector3(2.6, 1.8, -1.2),
      new THREE.Vector3(3.2, -0.8, -0.5),
      new THREE.Vector3(0, 0, -2),
    ];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        pts.push([nodes[i], nodes[j]]);
      }
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={ref}>
      {points.map((pair, i) => {
        const geom = new THREE.BufferGeometry().setFromPoints(pair);
        return (
          // eslint-disable-next-line react/no-unknown-property
          <line key={i}>
            <primitive object={geom} attach="geometry" />
            <lineBasicMaterial color="#2bb3b5" transparent opacity={0.18} />
          </line>
        );
      })}
    </group>
  );
}

function SceneContents() {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.15) * 0.15;
    group.current.position.y = Math.sin(t * 0.4) * 0.1;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} color="#cfe6e9" />
      <pointLight position={[-5, -3, -2]} intensity={1.8} color="#4d194d" />
      <pointLight position={[5, -2, 3]} intensity={1.5} color="#006466" />

      <ConnectionLines />

      <FloatingCard position={[-2.8, 1.2, -0.5]} rotation={[0.1, 0.4, 0.05]} color="#006466" />
      <FloatingCard position={[2.4, 1.6, -1]} rotation={[-0.1, -0.5, -0.08]} color="#3e1f47" />
      <FloatingCard position={[-1.6, -1.8, 0.4]} rotation={[0.2, -0.2, 0.1]} color="#0b525b" />
      <FloatingCard position={[2.8, -1.2, 0.2]} rotation={[-0.15, 0.6, -0.05]} color="#4d194d" />
      <FloatingCard
        position={[0, 0.2, -1.5]}
        rotation={[0, 0.15, 0]}
        color="#272640"
        size={[2.2, 1.3, 0.08]}
      />

      <Orb position={[-3.6, -0.4, 1]} color="#2bb3b5" scale={0.5} />
      <Orb position={[3.6, 0.4, 1.2]} color="#7a3b8a" scale={0.45} />
      <Orb position={[0, -2.4, 1]} color="#0b525b" scale={0.35} />

      <Environment preset="city" />
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <SceneContents />
      </Suspense>
    </Canvas>
  );
}
