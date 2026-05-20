import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';

const FloatingSphere = ({ position, color, speed, distort, scale = 1 }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
  });
  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[scale, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={1.5}
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.18}
        />
      </Sphere>
    </Float>
  );
};

const Particles = () => {
  const count = 300;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const pointsRef = useRef();
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#FE6300" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
};

const MovingGrid = () => {
  const gridRef = useRef();
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.4) % 2;
    }
  });
  return (
    <gridHelper
      ref={gridRef}
      args={[50, 50, '#FE6300', '#252526']}
      position={[0, -5, 0]}
    />
  );
};

const ThreeScene = () => (
  <Canvas
    camera={{ position: [0, 0, 10], fov: 55 }}
    style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    gl={{ antialias: true, alpha: true }}
    dpr={[1, 1.5]}
  >
    <ambientLight intensity={0.4} />
    <pointLight position={[8, 8, 8]} intensity={1.5} color="#FE6300" />
    <pointLight position={[-8, -4, 4]} intensity={0.6} color="#1A6AFF" />
    <pointLight position={[0, -8, 2]} intensity={0.3} color="#FFE58B" />

    <Stars radius={100} depth={60} count={4000} factor={2.5} fade speed={0.4} />
    <Particles />
    <MovingGrid />

    {/* Main large sphere - orange */}
    <FloatingSphere position={[-5, 1.5, -4]} color="#FE6300" speed={0.8} distort={0.35} scale={1.4} />
    {/* Blue accent sphere */}
    <FloatingSphere position={[5.5, -1, -3]} color="#1A6AFF" speed={1.1} distort={0.28} scale={1.1} />
    {/* Gold small sphere */}
    <FloatingSphere position={[1, 3.5, -6]} color="#FFE58B" speed={1.4} distort={0.45} scale={0.8} />
    {/* Extra orange glow */}
    <FloatingSphere position={[-2, -3, -2]} color="#FF8C3A" speed={0.9} distort={0.3} scale={0.6} />
  </Canvas>
);

export default ThreeScene;
