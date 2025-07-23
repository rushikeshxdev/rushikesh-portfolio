import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeJsBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, particles, lines, animationFrameId;

    const initThree = () => {
      // Scene
      scene = new THREE.Scene();

      // Camera
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      mountRef.current.appendChild(renderer.domElement);

      // Particles (Nodes)
      const particleCount = 500;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const particleVertices = [];

      const color = new THREE.Color();

      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() * 2 - 1) * 10;
        const y = (Math.random() * 2 - 1) * 10;
        const z = (Math.random() * 2 - 1) * 10;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        particleVertices.push(new THREE.Vector3(x, y, z));

        // Color (subtle green/purple hues for hacker vibe)
        color.setHSL(Math.random() * 0.2 + 0.3, 0.7, 0.5 + Math.random() * 0.3); // Greenish to bluish
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // Lines (Connections between particles)
      const lineGeometry = new THREE.BufferGeometry();
      const linePositions = [];
      const lineColors = [];
      const tempColor = new THREE.Color();

      // Create connections for nearby particles
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const p1 = particleVertices[i];
          const p2 = particleVertices[j];
          const distance = p1.distanceTo(p2);

          if (distance < 1.5) { // Connect particles within a certain distance
            linePositions.push(p1.x, p1.y, p1.z);
            linePositions.push(p2.x, p2.y, p2.z);

            // Interpolate color between the two particles' colors
            const c1 = new THREE.Color().setRGB(colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2]);
            const c2 = new THREE.Color().setRGB(colors[j * 3], colors[j * 3 + 1], colors[j * 3 + 2]);
            tempColor.copy(c1).lerp(c2, 0.5); // Average color

            lineColors.push(tempColor.r, tempColor.g, tempColor.b);
            lineColors.push(tempColor.r, tempColor.g, tempColor.b);
          }
        }
      }

      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

      const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.2, // Subtle lines
        blending: THREE.AdditiveBlending,
      });

      lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lines);


      // Animation Loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        // Rotate particles and lines
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0008;
        lines.rotation.x += 0.0005;
        lines.rotation.y += 0.0008;

        renderer.render(scene, camera);
      };

      animate();

      // Handle Window Resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        lineGeometry.dispose();
        lineMaterial.dispose();
      };
    };

    initThree();

  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

export default ThreeJsBackground;
