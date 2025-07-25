// src/App.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

function App() {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 🌀 GSAP test
    if (boxRef.current) {
      gsap.to(boxRef.current, {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: "linear",
      });
    }

    // 🌌 THREE.js test
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
      renderer.setSize(window.innerWidth, window.innerHeight);

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff99 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 2;

      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();
    }
  }, []);

  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-black via-slate-900 to-gray-800 text-white flex flex-col items-center justify-center overflow-hidden">
      <div
        ref={boxRef}
        className="text-3xl font-bold bg-pink-600 px-6 py-3 rounded-full shadow-lg"
      >
        Tailwind + GSAP ✔
      </div>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}

export default App;
