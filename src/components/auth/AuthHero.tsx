import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import type { Group } from "three";
import * as THREE from "three";

type NodeDef = {
  label: string;
  position: [number, number, number];
  color: string;
  scale?: number;
};

const NODES: NodeDef[] = [
  { label: "Script", position: [-2.6, 1.8, -0.5], color: "#006466" },
  { label: "Character", position: [-1.6, -1.4, 0.4], color: "#0b525b" },
  { label: "Wardrobe", position: [0, 1.5, -1.2], color: "#272640" },
  { label: "Set", position: [1.8, -0.3, -0.4], color: "#3e1f47" },
  { label: "Scene", position: [2.4, 1.6, 0.2], color: "#4d194d" },
  { label: "Video", position: [0.4, -2, 0.8], color: "#2bb3b5" },
];

function GlassNode({ node }: { node: NodeDef }) {
  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
      <mesh position={node.position}>
        <boxGeometry args={[1.1, 1.5, 0.06]} />
        <meshPhysicalMaterial
          color={node.color}
          metalness={0.35}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.15}
          transmission={0.2}
          thickness={0.4}
        />
      </mesh>
    </Float>
  );
}

function Connections() {
  const ref = useRef<Group>(null);
  const segments = useMemo(() => {
    // Connect in production flow order
    const pairs: Array<[THREE.Vector3, THREE.Vector3]> = [];
    for (let i = 0; i < NODES.length - 1; i++) {
      pairs.push([
        new THREE.Vector3(...NODES[i].position),
        new THREE.Vector3(...NODES[i + 1].position),
      ]);
    }
    // a couple of cross-links to feel graph-like
    pairs.push([
      new THREE.Vector3(...NODES[0].position),
      new THREE.Vector3(...NODES[2].position),
    ]);
    pairs.push([
      new THREE.Vector3(...NODES[1].position),
      new THREE.Vector3(...NODES[4].position),
    ]);
    return pairs;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.12;
  });

  return (
    <group ref={ref}>
      {segments.map((pair, i) => {
        const geom = new THREE.BufferGeometry().setFromPoints(pair);
        return (
          // eslint-disable-next-line react/no-unknown-property
          <line key={i}>
            <primitive object={geom} attach="geometry" />
            <lineBasicMaterial color="#2bb3b5" transparent opacity={0.22} />
          </line>
        );
      })}
    </group>
  );
}

function SceneInner({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // breathing + gentle parallax
    const targetY = pointer.current.x * 0.35 + Math.sin(t * 0.2) * 0.1;
    const targetX = -pointer.current.y * 0.25 + Math.cos(t * 0.25) * 0.05;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
    group.current.position.y = Math.sin(t * 0.4) * 0.08;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} color="#cfe6e9" />
      <pointLight position={[-5, -3, -2]} intensity={1.6} color="#4d194d" />
      <pointLight position={[5, -2, 3]} intensity={1.4} color="#006466" />

      <Connections />
      {NODES.map((n) => (
        <GlassNode key={n.label} node={n} />
      ))}

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh position={[0, 0.2, -2]} scale={0.55}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color="#2bb3b5"
            distort={0.4}
            speed={1.6}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <Environment preset="city" />
    </group>
  );
}

export function AuthHero() {
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      onPointerMove={(e) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect?.();
        if (!rect) return;
        pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      }}
    >
      <Suspense fallback={null}>
        <SceneInner pointer={pointer} />
      </Suspense>
    </Canvas>
  );
}
