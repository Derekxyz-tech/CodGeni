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

export default function ContactAtomBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size based on container
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create more atoms for better visibility
    const atomCount = 25;
    const atoms: Atom[] = [];
    const connections: Connection[] = [];
    const connectionDistance = 120; // Distance pour créer des connections
    const attractionDistance = 150; // Distance d'attraction entre atomes

    for (let i = 0; i < atomCount; i++) {
      atoms.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: 2 + Math.random() * 2,
      });
    }

    // Create initial connections
    const maxConnections = 30;
    for (let i = 0; i < maxConnections; i++) {
      const atom1 = Math.floor(Math.random() * atomCount);
      let atom2 = Math.floor(Math.random() * atomCount);
      while (atom2 === atom1) {
        atom2 = Math.floor(Math.random() * atomCount);
      }
      connections.push({
        atom1,
        atom2,
        opacity: Math.random() * 0.4 + 0.2,
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply attraction forces between nearby atoms to form lines
      atoms.forEach((atom, i) => {
        let fx = 0;
        let fy = 0;

        atoms.forEach((otherAtom, j) => {
          if (i === j) return;

          const dx = otherAtom.x - atom.x;
          const dy = otherAtom.y - atom.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 0 && distance < attractionDistance) {
            // Attraction force - stronger when closer
            const force = (attractionDistance - distance) / attractionDistance * 0.008;
            fx += (dx / distance) * force;
            fy += (dy / distance) * force;
          }
        });

        // Apply forces to velocity
        atom.vx += fx;
        atom.vy += fy;

        // Add some damping to prevent excessive speed
        atom.vx *= 0.95;
        atom.vy *= 0.95;

        // Limit maximum speed
        const maxSpeed = 0.8;
        const speed = Math.sqrt(atom.vx * atom.vx + atom.vy * atom.vy);
        if (speed > maxSpeed) {
          atom.vx = (atom.vx / speed) * maxSpeed;
          atom.vy = (atom.vy / speed) * maxSpeed;
        }
      });

      // Update atoms position
      atoms.forEach((atom) => {
        atom.x += atom.vx;
        atom.y += atom.vy;

        // Bounce off edges with damping
        if (atom.x < 0 || atom.x > canvas.width) {
          atom.vx *= -0.8;
          atom.x = Math.max(0, Math.min(canvas.width, atom.x));
        }
        if (atom.y < 0 || atom.y > canvas.height) {
          atom.vy *= -0.8;
          atom.y = Math.max(0, Math.min(canvas.height, atom.y));
        }
      });

      // Update and create connections dynamically
      time += 0.015;
      
      // Find and create connections between nearby atoms
      for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
          const atom1 = atoms[i];
          const atom2 = atoms[j];
          const dx = atom2.x - atom1.x;
          const dy = atom2.y - atom1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Check if connection already exists
          let existingConnection = connections.find(
            conn => (conn.atom1 === i && conn.atom2 === j) || (conn.atom1 === j && conn.atom2 === i)
          );

          if (distance < connectionDistance) {
            // Create connection if it doesn't exist
            if (!existingConnection && connections.length < maxConnections) {
              existingConnection = {
                atom1: i,
                atom2: j,
                opacity: 0,
              };
              connections.push(existingConnection);
            }

            // Update connection opacity
            if (existingConnection) {
              const targetOpacity = 0.4 + (1 - distance / connectionDistance) * 0.4;
              existingConnection.opacity = Math.min(0.8, existingConnection.opacity + (targetOpacity - existingConnection.opacity) * 0.1);
            }
          } else if (existingConnection) {
            // Fade out distant connections
            existingConnection.opacity = Math.max(0, existingConnection.opacity - 0.05);
          }
        }
      }

      // Draw connections with gradient effect
      connections.forEach((connection, index) => {
        const atom1 = atoms[connection.atom1];
        const atom2 = atoms[connection.atom2];
        const dx = atom2.x - atom1.x;
        const dy = atom2.y - atom1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (connection.opacity > 0.05 && distance < connectionDistance * 1.2) {
          const pulse = Math.sin(time + index * 0.5) * 0.2 + 0.8;
          const gradient = ctx.createLinearGradient(atom1.x, atom1.y, atom2.x, atom2.y);
          const opacity = connection.opacity * pulse;
          // Using primary color #000099 (RGB: 0, 0, 153)
          gradient.addColorStop(0, `rgba(0, 0, 153, ${opacity * 0.4})`);
          gradient.addColorStop(0.5, `rgba(0, 0, 153, ${opacity})`);
          gradient.addColorStop(1, `rgba(0, 0, 153, ${opacity * 0.4})`);
          
          ctx.beginPath();
          ctx.moveTo(atom1.x, atom1.y);
          ctx.lineTo(atom2.x, atom2.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // Draw atoms with glow
      atoms.forEach((atom) => {
        // Outer glow
        const gradient = ctx.createRadialGradient(atom.x, atom.y, 0, atom.x, atom.y, atom.radius + 4);
        // Using primary color #000099 (RGB: 0, 0, 153)
        gradient.addColorStop(0, 'rgba(0, 0, 153, 0.5)');
        gradient.addColorStop(0.5, 'rgba(0, 0, 153, 0.25)');
        gradient.addColorStop(1, 'rgba(0, 0, 153, 0)');
        
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, atom.radius + 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Atom dot
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, atom.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 153, 0.9)';
        ctx.fill();
        
        // Inner highlight
        ctx.beginPath();
        ctx.arc(atom.x - atom.radius * 0.3, atom.y - atom.radius * 0.3, atom.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
      });

      // Remove very faint connections to keep performance optimal
      for (let i = connections.length - 1; i >= 0; i--) {
        const connection = connections[i];
        if (connection.opacity < 0.05) {
          connections.splice(i, 1);
        }
      }

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
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ zIndex: 0 }}
      />
    </div>
  );
}

