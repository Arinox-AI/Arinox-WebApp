import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const BRAND_COLOR = 0xfe6300;
const NODE_COUNT  = 100;
const RADIUS      = 1.15;
const EDGE_THRESHOLD = 0.62;

const NetworkSphere = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth || 420;
    const h = mount.clientHeight || 340;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 3.6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group   = new THREE.Group();
    scene.add(group);

    const nodeGeo = new THREE.SphereGeometry(0.015, 6, 6);
    const nodeMat = new THREE.MeshBasicMaterial({ color: BRAND_COLOR });
    const edgeMat = new THREE.LineBasicMaterial({ color: BRAND_COLOR, opacity: 0.18, transparent: true });

    const positions = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const phi   = Math.acos(1 - (2 * i) / NODE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = RADIUS * Math.sin(phi) * Math.cos(theta);
      const y = RADIUS * Math.sin(phi) * Math.sin(theta);
      const z = RADIUS * Math.cos(phi);
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.set(x, y, z);
      group.add(mesh);
      positions.push(new THREE.Vector3(x, y, z));
    }

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < EDGE_THRESHOLD) {
          const geo = new THREE.BufferGeometry().setFromPoints([positions[i], positions[j]]);
          group.add(new THREE.Line(geo, edgeMat));
        }
      }
    }

    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      targetY = ((e.clientX - rect.left) / rect.width  - 0.5) * 0.8;
      targetX = ((e.clientY - rect.top)  / rect.height - 0.5) * 0.5;
    };
    mount.addEventListener('mousemove', onMouseMove);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      group.rotation.y += (targetY - group.rotation.y) * 0.04 + 0.004;
      group.rotation.x += (targetX - group.rotation.x) * 0.04;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default NetworkSphere;
