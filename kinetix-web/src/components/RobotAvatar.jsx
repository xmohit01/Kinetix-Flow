import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Safe static fallback logic for 3D model loading
export function RobotAvatar({ landmarks }) {
  const group = useRef();
  
  // Safe load: Grab only the scene, do NOT traverse nodes yet until we know the rig
  const { scene } = useGLTF('/robot.glb');

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} scale={2} position={[0, -2, 0]} />
    </group>
  );
}

useGLTF.preload('/robot.glb');
