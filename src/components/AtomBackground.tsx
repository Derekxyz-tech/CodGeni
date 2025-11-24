'use client';

import { useEffect, useRef } from 'react';

interface Atom {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Connection {
  atom1: number;
  atom2: number;
  opacity: number;
}

export default function AtomBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create atoms
    const atomCount = 15;
    const atoms: Atom[] = [];
    const connections: Connection[] = [];

    for (let i = 0; i < atomCount; i++) {
      atoms.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 3 + Math.random() * 2,
      });
    }

    // Create initial connections
    const maxConnections = 20;
    for (let i = 0; i < maxConnections; i++) {
      const atom1 = Math.floor(Math.random() * atomCount);
      let atom2 = Math.floor(Math.random() * atomCount);
      while (atom2 === atom1) {
        atom2 = Math.floor(Math.random() * atomCount);
      }
      connections.push({
        atom1,
        atom2,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update atoms
      atoms.forEach((atom) => {
        atom.x += atom.vx;
        atom.y += atom.vy;

        // Bounce off edges
        if (atom.x < 0 || atom.x > canvas.width) atom.vx *= -1;
        if (atom.y < 0 || atom.y > canvas.height) atom.vy *= -1;

        // Keep atoms in bounds
        atom.x = Math.max(0, Math.min(canvas.width, atom.x));
        atom.y = Math.max(0, Math.min(canvas.height, atom.y));
      });

      // Update connections (connect/disconnect dynamically)
      time += 0.01;
      connections.forEach((connection, index) => {
        const atom1 = atoms[connection.atom1];
        const atom2 = atoms[connection.atom2];
        const dx = atom2.x - atom1.x;
        const dy = atom2.y - atom1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Connect/disconnect based on distance and time
        const shouldConnect = distance < 150;
        const pulse = Math.sin(time + index) * 0.5 + 0.5;
        
        if (shouldConnect) {
          connection.opacity = Math.min(0.4, connection.opacity + 0.02);
        } else {
          connection.opacity = Math.max(0, connection.opacity - 0.02);
        }

        // Draw connection
        if (connection.opacity > 0.05 && distance < 200) {
          ctx.beginPath();
          ctx.moveTo(atom1.x, atom1.y);
          ctx.lineTo(atom2.x, atom2.y);
          ctx.strokeStyle = `rgba(11, 43, 74, ${connection.opacity * pulse})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Draw atoms
      atoms.forEach((atom) => {
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, atom.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(11, 43, 74, 0.6)';
        ctx.fill();
        
        // Glow effect
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, atom.radius + 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(11, 43, 74, 0.1)';
        ctx.fill();
      });

      // Occasionally create new connections
      if (Math.random() < 0.01 && connections.length < maxConnections) {
        const atom1 = Math.floor(Math.random() * atomCount);
        let atom2 = Math.floor(Math.random() * atomCount);
        while (atom2 === atom1) {
          atom2 = Math.floor(Math.random() * atomCount);
        }
        const atom1Pos = atoms[atom1];
        const atom2Pos = atoms[atom2];
        const dx = atom2Pos.x - atom1Pos.x;
        const dy = atom2Pos.y - atom1Pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          connections.push({
            atom1,
            atom2,
            opacity: 0,
          });
        }
      }

      // Remove distant connections
      connections.forEach((connection, index) => {
        const atom1 = atoms[connection.atom1];
        const atom2 = atoms[connection.atom2];
        const dx = atom2.x - atom1.x;
        const dy = atom2.y - atom1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 250 && connection.opacity < 0.1) {
          connections.splice(index, 1);
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{ zIndex: 0 }}
    />
  );
}









