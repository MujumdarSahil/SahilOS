"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface ReactorSceneProps {
  onSelectNode: (nodeId: string) => void;
  reducedMotion?: boolean;
}

interface OrbitNode {
  id: string;
  label: string;
  color: string;
  angleOffset: number;
}

const ORBIT_NODES: OrbitNode[] = [
  { id: "dossiers", label: "DOSSIERS", color: "#48DDF5", angleOffset: 0 },
  { id: "experience", label: "MISSIONS", color: "#F3AE50", angleOffset: Math.PI * 0.5 },
  { id: "constellation", label: "MATRIX", color: "#48DDF5", angleOffset: Math.PI },
  { id: "jarvis", label: "JARVIS", color: "#F3AE50", angleOffset: Math.PI * 1.5 },
];

const ReactorCoreMesh: React.FC<{
  onSelectNode: (nodeId: string) => void;
  hoveredNode: string | null;
  setHoveredNode: (id: string | null) => void;
  reducedMotion?: boolean;
}> = ({ onSelectNode, hoveredNode, setHoveredNode, reducedMotion = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const midRingRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Controlled Particle Count (100 particles for high performance)
  const [particlePositions] = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.0 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      positions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    return [positions];
  }, []);

  // Shared Geometries & Materials (created once, reused)
  const {
    coreGeometry,
    coreMaterial,
    cageGeometry,
    cageMaterial,
    innerRingGeometry,
    innerRingMaterial,
    midRingGeometry,
    midRingMaterial,
    outerRingGeometry,
    outerRingMaterial,
    nodeGeometry,
    particleGeometry,
    particleMaterial,
  } = useMemo(() => {
    const coreGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#48DDF5"),
      emissive: new THREE.Color("#48DDF5"),
      emissiveIntensity: 1.2,
      roughness: 0.2,
      metalness: 0.8,
    });

    const cageGeo = new THREE.IcosahedronGeometry(0.95, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#F3AE50"),
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });

    const innerGeo = new THREE.TorusGeometry(1.3, 0.025, 16, 64);
    const innerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#48DDF5"),
      emissive: new THREE.Color("#48DDF5"),
      emissiveIntensity: 0.6,
      roughness: 0.3,
    });

    const midGeo = new THREE.TorusGeometry(1.7, 0.035, 16, 64);
    const midMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#F3AE50"),
      emissive: new THREE.Color("#F3AE50"),
      emissiveIntensity: 0.5,
      roughness: 0.3,
    });

    const outerGeo = new THREE.TorusGeometry(2.1, 0.02, 16, 64);
    const outerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#48DDF5"),
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });

    const nGeo = new THREE.SphereGeometry(0.12, 16, 16);

    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const partMat = new THREE.PointsMaterial({
      color: new THREE.Color("#48DDF5"),
      size: 0.035,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    return {
      coreGeometry: coreGeo,
      coreMaterial: coreMat,
      cageGeometry: cageGeo,
      cageMaterial: cageMat,
      innerRingGeometry: innerGeo,
      innerRingMaterial: innerMat,
      midRingGeometry: midGeo,
      midRingMaterial: midMat,
      outerRingGeometry: outerGeo,
      outerRingMaterial: outerMat,
      nodeGeometry: nGeo,
      particleGeometry: partGeo,
      particleMaterial: partMat,
    };
  }, [particlePositions]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      coreGeometry.dispose();
      coreMaterial.dispose();
      cageGeometry.dispose();
      cageMaterial.dispose();
      innerRingGeometry.dispose();
      innerRingMaterial.dispose();
      midRingGeometry.dispose();
      midRingMaterial.dispose();
      outerRingGeometry.dispose();
      outerRingMaterial.dispose();
      nodeGeometry.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, [
    coreGeometry,
    coreMaterial,
    cageGeometry,
    cageMaterial,
    innerRingGeometry,
    innerRingMaterial,
    midRingGeometry,
    midRingMaterial,
    outerRingGeometry,
    outerRingMaterial,
    nodeGeometry,
    particleGeometry,
    particleMaterial,
  ]);

  // Frame Loop (Zero React state updates per frame)
  useFrame((state, delta) => {
    // If reduced-motion is active, render static state
    if (reducedMotion) {
      if (groupRef.current) {
        groupRef.current.rotation.set(0, 0, 0);
      }
      return;
    }

    const time = state.clock.getElapsedTime();
    const boundedDelta = Math.min(delta, 0.1); // Prevent physics explosion on tab-refocus

    // Mouse Parallax (Bounded lerp)
    if (groupRef.current) {
      const targetRotX = -state.pointer.y * 0.25;
      const targetRotY = state.pointer.x * 0.35;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.05
      );
    }

    // Central Core Pulse
    if (coreRef.current) {
      const pulse = 1.0 + Math.sin(time * 2.8) * 0.04;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Cage Counter-Rotation
    if (cageRef.current) {
      cageRef.current.rotation.x += boundedDelta * 0.4;
      cageRef.current.rotation.y += boundedDelta * 0.6;
    }

    // Inner Ring
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x += boundedDelta * 0.7;
      innerRingRef.current.rotation.y += boundedDelta * 0.5;
    }

    // Mid Ring
    if (midRingRef.current) {
      midRingRef.current.rotation.z += boundedDelta * 0.45;
      midRingRef.current.rotation.x -= boundedDelta * 0.35;
    }

    // Outer Ring
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= boundedDelta * 0.25;
    }

    // Orbiting Interactive Nodes
    const orbitRadius = 2.1;
    ORBIT_NODES.forEach((node, i) => {
      const mesh = nodeRefs.current[i];
      if (mesh) {
        const currentAngle = time * 0.35 + node.angleOffset;
        mesh.position.x = Math.cos(currentAngle) * orbitRadius;
        mesh.position.y = Math.sin(currentAngle * 0.8) * 0.4;
        mesh.position.z = Math.sin(currentAngle) * orbitRadius;

        // Hover scale bounce
        const isHovered = hoveredNode === node.id;
        const targetScale = isHovered ? 1.6 : 1.0;
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
      }
    });

    // Ambient Particle Drift
    if (particlesRef.current) {
      particlesRef.current.rotation.y += boundedDelta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Pulsing Energy Core */}
      <mesh ref={coreRef} geometry={coreGeometry} material={coreMaterial} />

      {/* Wireframe Casing Cage */}
      <mesh ref={cageRef} geometry={cageGeometry} material={cageMaterial} />

      {/* Concentric Rings */}
      <mesh ref={innerRingRef} geometry={innerRingGeometry} material={innerRingMaterial} />
      <mesh ref={midRingRef} geometry={midRingGeometry} material={midRingMaterial} />
      <mesh ref={outerRingRef} geometry={outerRingGeometry} material={outerRingMaterial} />

      {/* Ambient Particle System */}
      <points ref={particlesRef} geometry={particleGeometry} material={particleMaterial} />

      {/* Orbiting Interactive 3D Nodes */}
      {ORBIT_NODES.map((node, i) => {
        const isHovered = hoveredNode === node.id;
        return (
          <mesh
            key={node.id}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            geometry={nodeGeometry}
            onClick={(e) => {
              e.stopPropagation();
              onSelectNode(node.id);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredNode(node.id);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              setHoveredNode(null);
              document.body.style.cursor = "auto";
            }}
          >
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={isHovered ? 2.5 : 0.9}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export const ReactorScene: React.FC<ReactorSceneProps> = ({
  onSelectNode,
  reducedMotion = false,
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div
      className="relative w-full h-[360px] sm:h-[420px] flex items-center justify-center select-none"
      data-testid="reactor-3d-scene"
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 48 }}
        dpr={[1, Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2)]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#48DDF5" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#F3AE50" />

        <ReactorCoreMesh
          onSelectNode={onSelectNode}
          hoveredNode={hoveredNode}
          setHoveredNode={setHoveredNode}
          reducedMotion={reducedMotion}
        />
      </Canvas>

      {/* Hover Node HUD Label */}
      {hoveredNode && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none rounded bg-gunmetal/90 border border-cyan/40 px-3 py-1 font-mono text-xs text-cyan shadow-hud-cyan animate-pulse">
          INTERACTIVE DIRECTIVE: [ {hoveredNode.toUpperCase()} ]
        </div>
      )}
    </div>
  );
};
