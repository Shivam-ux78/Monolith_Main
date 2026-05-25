import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, TorusKnot, Icosahedron, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

const DiscoveryShape = () => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.5;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <Sphere ref={mesh} args={[1.8, 32, 32]}>
      <meshStandardMaterial color="#0A192F" emissive="#00FFFF" emissiveIntensity={0.2} wireframe />
    </Sphere>
  );
};

const DesignShape = () => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.2;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });
  return (
    <TorusKnot ref={mesh} args={[1.2, 0.4, 64, 16]}>
      <meshStandardMaterial color="#050505" emissive="#00FFFF" emissiveIntensity={0.1} wireframe={false} roughness={0.1} metalness={0.8} />
    </TorusKnot>
  );
};

const DevelopmentShape = () => {
    const mesh = useRef<THREE.Mesh>(null);
    useFrame((state) => {
      if (mesh.current) {
        mesh.current.rotation.x = state.clock.elapsedTime * 0.8;
        mesh.current.rotation.y = state.clock.elapsedTime * 0.2;
      }
    });
    return (
      <Icosahedron ref={mesh} args={[1.8, 1]}>
        <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.3} wireframe />
      </Icosahedron>
    );
};

const TestingShape = () => {
    const mesh = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.elapsedTime * 1;
        }
    });
    return (
        <Octahedron ref={mesh} args={[1.8, 0]}>
            <meshStandardMaterial color="#00FFFF" emissive="#ffffff" emissiveIntensity={0.5} wireframe />
        </Octahedron>
    );
};

const DeploymentShape = () => {
    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (group.current) {
            group.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
            group.current.rotation.y = state.clock.elapsedTime * 0.5;
        }
    });
    return (
        <group ref={group}>
            <Box args={[1.2, 1.2, 1.2]} position={[0, 0, 0]}>
                 <meshStandardMaterial color="#050505" emissive="#00FFFF" emissiveIntensity={0.6} />
            </Box>
            <Box args={[1.6, 1.6, 1.6]} position={[0, 0, 0]}>
                 <meshStandardMaterial color="#050505" emissive="#00FFFF" emissiveIntensity={0.2} wireframe />
            </Box>
        </group>
    );
};

export default function StageCanvas({ stage }: { stage: number }) {
  return (
    <div className="w-full h-[300px] md:h-[400px] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00FFFF" />
        {stage === 1 && <DiscoveryShape />}
        {stage === 2 && <DesignShape />}
        {stage === 3 && <DevelopmentShape />}
        {stage === 4 && <TestingShape />}
        {stage === 5 && <DeploymentShape />}
      </Canvas>
    </div>
  );
}
