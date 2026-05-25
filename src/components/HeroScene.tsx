import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Instances, Instance, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Home: Digital Grid & Floating UI Frames
const DigitalGrid = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      const time = state.clock.elapsedTime;
      group.current.rotation.y = Math.sin(time * 0.5) * 0.1;
      group.current.rotation.x = Math.cos(time * 0.5) * 0.05;
    }
  });

  return (
    <group ref={group}>
      {/* Perspective Grid Floor */}
      <gridHelper args={[50, 25, 0x00FFFF, 0x003333]} position={[0, -4, 0]} />

      {/* Floating Design Blocks (UI Panels) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <group key={i} position={[(i - 4) * 4, Math.sin(i * 0.5) * 2, -5]}>
          <Box args={[3, 2, 0.05]}>
            <meshStandardMaterial
              color="#00FFFF"
              transparent
              opacity={0.05}
              emissive="#00FFFF"
              emissiveIntensity={0.2}
            />
          </Box>
          <Box args={[3, 2, 0.05]}>
            <meshStandardMaterial color="#00FFFF" wireframe opacity={0.3} transparent />
          </Box>
          {/* Internal 'content' lines */}
          <Box args={[2, 0.1, 0.06]} position={[0, 0.5, 0]}>
            <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.5} />
          </Box>
          <Box args={[1.5, 0.1, 0.06]} position={[-0.25, 0.2, 0]}>
            <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.3} />
          </Box>
          <Box args={[1, 0.1, 0.06]} position={[-0.5, -0.1, 0]}>
            <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.3} />
          </Box>
        </group>
      ))}

      {/* Background Particles */}
      <mesh position={[0, 0, -10]}>
        <sphereGeometry args={[20, 32, 32]} />
        <meshStandardMaterial color="#0A192F" side={THREE.BackSide} wireframe opacity={0.1} transparent />
      </mesh>
    </group>
  );
};

// Portfolio: Floating 3D browser viewports (Abstracted as floating boxes)
const FloatingViewports = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group ref={group}>
      <Instances limit={5} range={5}>
        <boxGeometry args={[4, 2.5, 0.1]} />
        <meshStandardMaterial color="#0A192F" emissive="#00FFFF" emissiveIntensity={0.2} transparent opacity={0.8} wireframe />
        <Instance position={[-2, 1, -2]} rotation={[0, 0.2, 0]} />
        <Instance position={[2, -1, 1]} rotation={[0, -0.4, 0]} />
        <Instance position={[0, 0, 3]} rotation={[0, 0, 0]} />
        <Instance position={[-3, -2, 0]} rotation={[0.2, 0.4, 0]} />
        <Instance position={[3, 2, -1]} rotation={[-0.2, -0.1, 0.1]} />
      </Instances>
    </group>
  );
};

// Contact: Pulsating light lattice
const LightLattice = () => {
  const group = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const pulseState = useRef(0);

  React.useEffect(() => {
    const onPulse = () => { pulseState.current = 2.0; };
    window.addEventListener('leadSuccess', onPulse);
    return () => window.removeEventListener('leadSuccess', onPulse);
  }, []);

  useFrame((state, delta) => {
    if (group.current && materialRef.current) {
      const baseRotSpeed = 0.1;
      const basePulse = (Math.sin(state.clock.elapsedTime * 2) + 1) / 2;

      if (pulseState.current > 0) {
        pulseState.current -= delta;

        // Aggressive rotation
        group.current.rotation.x += delta * 2;
        group.current.rotation.y += delta * 3;

        // Intense bright cyan
        materialRef.current.emissiveIntensity = 4 + Math.random() * 2;
        materialRef.current.color.setHex(0xffffff); // Flash white base
        group.current.scale.setScalar(1 + pulseState.current * 0.2);
      } else {
        group.current.rotation.x += delta * baseRotSpeed;
        group.current.rotation.y += delta * baseRotSpeed * 1.5;
        materialRef.current.emissiveIntensity = 0.2 + basePulse * 0.8;
        materialRef.current.color.setHex(0x050505);
        group.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <group ref={group}>
      <Sphere args={[3, 16, 16]}>
        <meshStandardMaterial ref={materialRef} color="#050505" emissive="#00FFFF" wireframe />
      </Sphere>
    </group>
  );
};

interface HeroSceneProps {
  type: 'home' | 'portfolio' | 'contact';
}

export default function HeroScene({ type }: HeroSceneProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Deep Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050505] to-[#0A192F] opacity-90 mix-blend-multiply z-[-1]" />

      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} className="w-full h-full">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00FFFF" />

        {type === 'home' && <DigitalGrid />}
        {type === 'portfolio' && <FloatingViewports />}
        {type === 'contact' && <LightLattice />}

      </Canvas>
    </div>
  );
}
