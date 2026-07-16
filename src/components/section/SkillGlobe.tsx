import React, { useEffect, useRef, useState } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface SkillItem {
  name: string;
  category: string;
}

interface SkillGlobeProps {
  skills: SkillItem[];
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Skyscraper {
  name: string;
  category: string;
  phi: number;
  theta: number;
  height: number;
  width: number;
  depth: number;
  baseCenter: Point3D;
  topCenter: Point3D;
  baseVertices: Point3D[];
  topVertices: Point3D[];
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

export const SkillGlobe: React.FC<SkillGlobeProps> = ({ skills }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isDarkMode } = useDarkMode();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Constants
  const sphereRadius = 150; 
  const perspective = 500; 

  // Angles
  const angleX = useRef<number>(0.2);
  const angleY = useRef<number>(0.3);

  // Rotation speeds
  const speedX = useRef<number>(0.001);
  const speedY = useRef<number>(0.0015);

  const isDragging = useRef<boolean>(false);
  const lastMouseX = useRef<number>(0);
  const lastMouseY = useRef<number>(0);

  const buildings = useRef<Skyscraper[]>([]);
  const particles = useRef<Particle[]>([]);

  // RGB-based color mapping for total cross-browser rendering safety
  const getCategoryColors = (category: string) => {
    switch (category) {
      case "Programming":
        return { r: 236, g: 72, b: 153, text: '#ffffff' }; // #ec4899 (Pink)
      case "AI/ML":
        return { r: 59, g: 130, b: 246, text: '#ffffff' }; // #3b82f6 (Blue)
      case "LLM Engineering":
        return { r: 16, g: 185, b: 129, text: '#ffffff' }; // #10b981 (Emerald)
      case "Data & Infra":
        return { r: 139, g: 92, b: 246, text: '#ffffff' }; // #8b5cf6 (Violet)
      case "Core CS & Math":
        return { r: 245, g: 158, b: 11, text: '#ffffff' }; // #f59e0b (Amber)
      case "Domains":
        return { r: 20, g: 184, b: 166, text: '#ffffff' }; // #14b8a6 (Teal)
      default:
        return { r: 156, g: 163, b: 175, text: '#ffffff' }; // #9ca3af (Gray)
    }
  };

  // 1. Initialize Buildings on Sphere Surface
  useEffect(() => {
    if (!skills || skills.length === 0) return;
    const total = skills.length;
    buildings.current = skills.map((skill, index) => {
      const phi = Math.acos(-1 + (2 * index) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;

      const nx = Math.sin(phi) * Math.cos(theta);
      const ny = Math.sin(phi) * Math.sin(theta);
      const nz = Math.cos(phi);

      const height = 45 + Math.random() * 40; 
      const width = 12 + Math.random() * 8; 
      const depth = 12 + Math.random() * 8; 

      const baseCenter = { x: sphereRadius * nx, y: sphereRadius * ny, z: sphereRadius * nz };
      const topCenter = { x: (sphereRadius + height) * nx, y: (sphereRadius + height) * ny, z: (sphereRadius + height) * nz };

      const ux = -Math.sin(theta);
      const uy = 0;
      const uz = Math.cos(theta);

      const vx = Math.cos(phi) * Math.cos(theta);
      const vy = -Math.sin(phi);
      const vz = Math.cos(phi) * Math.sin(theta);

      const baseVertices: Point3D[] = [];
      const topVertices: Point3D[] = [];

      const offsets = [
        { u: -0.5, v: -0.5 },
        { u: 0.5, v: -0.5 },
        { u: 0.5, v: 0.5 },
        { u: -0.5, v: 0.5 }
      ];

      offsets.forEach(offset => {
        const dxBase = offset.u * width * ux + offset.v * depth * vx;
        const dyBase = offset.u * width * uy + offset.v * depth * vy;
        const dzBase = offset.u * width * uz + offset.v * depth * vz;

        baseVertices.push({
          x: baseCenter.x + dxBase,
          y: baseCenter.y + dyBase,
          z: baseCenter.z + dzBase
        });

        topVertices.push({
          x: topCenter.x + dxBase,
          y: topCenter.y + dyBase,
          z: topCenter.z + dzBase
        });
      });

      return {
        name: skill.name,
        category: skill.category,
        phi,
        theta,
        height,
        width,
        depth,
        baseCenter,
        topCenter,
        baseVertices,
        topVertices
      };
    });
  }, [skills]);

  // 2. Generate particles
  const updateParticles = () => {
    if (particles.current.length < 40 && Math.random() < 0.3) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const speedVal = 2 + Math.random() * 3;

      const vx = speedVal * Math.sin(theta) * Math.cos(phi);
      const vy = speedVal * Math.sin(theta) * Math.sin(phi);
      const vz = speedVal * Math.cos(theta);

      particles.current.push({
        x: 0,
        y: 0,
        z: 0,
        vx,
        vy,
        vz,
        size: 1 + Math.random() * 2,
        color: Math.random() > 0.5 ? '#fbcfe8' : '#67e8f9',
        life: 0,
        maxLife: 150 + Math.random() * 100
      });
    }

    particles.current = particles.current
      .map(p => {
        return {
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          z: p.z + p.vz,
          life: p.life + 1
        };
      })
      .filter(p => p.life < p.maxLife);
  };

  // 3. Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const renderLoop = () => {
      if (!ctx || !canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      }

      const cX = rect.width / 2;
      const cY = rect.height / 2;

      ctx.clearRect(0, 0, rect.width, rect.height);

      const aura = ctx.createRadialGradient(cX, cY, 10, cX, cY, sphereRadius + 180);
      aura.addColorStop(0, isDarkMode ? 'rgba(236, 72, 153, 0.04)' : 'rgba(236, 72, 153, 0.07)');
      aura.addColorStop(0.5, isDarkMode ? 'rgba(59, 130, 246, 0.02)' : 'rgba(59, 130, 246, 0.03)');
      aura.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, rect.width, rect.height);

      if (!isDragging.current) {
        angleX.current += speedX.current;
        angleY.current += speedY.current;
        speedX.current += (0.001 - speedX.current) * 0.03;
        speedY.current += (0.0015 - speedY.current) * 0.03;
      }

      const sX = Math.sin(angleX.current);
      const cXAngle = Math.cos(angleX.current);
      const sY = Math.sin(angleY.current);
      const cYAngle = Math.cos(angleY.current);

      const rotate3D = (p: Point3D): Point3D => {
        const x1 = p.x * cYAngle - p.z * sY;
        const z1 = p.z * cYAngle + p.x * sY;
        const y2 = p.y * cXAngle - z1 * sX;
        const z2 = z1 * cXAngle + p.y * sX;
        return { x: x1, y: y2, z: z2 };
      };

      const project3D = (p: Point3D) => {
        const scale = perspective / (perspective + p.z);
        return {
          x: p.x * scale + cX,
          y: p.y * scale + cY,
          scale,
          zDepth: p.z
        };
      };

      updateParticles();
      particles.current.forEach(p => {
        const rotated = rotate3D(p);
        const projected = project3D(rotated);

        if (!projected.scale || isNaN(projected.scale) || projected.scale <= 0) return;

        const opacity = Math.min(1, Math.max(0, (1 - p.life / p.maxLife) * (projected.scale - 0.4)));
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, p.size * projected.scale, 0, Math.PI * 2);
        ctx.fillStyle = p.color === '#fbcfe8'
          ? `rgba(236, 72, 153, ${opacity})`
          : `rgba(6, 182, 212, ${opacity})`;
        ctx.fill();

        if (projected.scale > 0.8) {
          ctx.beginPath();
          const prevRot = rotate3D({ x: p.x - p.vx * 1.5, y: p.y - p.vy * 1.5, z: p.z - p.vz * 1.5 });
          const prevProj = project3D(prevRot);
          ctx.moveTo(projected.x, projected.y);
          ctx.lineTo(prevProj.x, prevProj.y);
          ctx.strokeStyle = `rgba(244, 63, 94, ${opacity * 0.4})`;
          ctx.lineWidth = 1 * projected.scale;
          ctx.stroke();
        }
      });

      // Globe Grid
      ctx.strokeStyle = isDarkMode ? 'rgba(236, 72, 153, 0.08)' : 'rgba(236, 72, 153, 0.15)';
      ctx.lineWidth = 1;
      for (let lat = -Math.PI/2; lat <= Math.PI/2; lat += Math.PI/10) {
        ctx.beginPath();
        const rLat = sphereRadius * Math.cos(lat);
        const yLat = sphereRadius * Math.sin(lat);
        for (let th = 0; th <= Math.PI * 2; th += Math.PI/16) {
          const pt = rotate3D({ x: rLat * Math.cos(th), y: yLat, z: rLat * Math.sin(th) });
          const proj = project3D(pt);
          if (th === 0) ctx.moveTo(proj.x, proj.y);
          else ctx.lineTo(proj.x, proj.y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      for (let lng = 0; lng < Math.PI; lng += Math.PI/8) {
        ctx.beginPath();
        for (let th = 0; th <= Math.PI * 2; th += Math.PI/16) {
          const pt = rotate3D({
            x: sphereRadius * Math.sin(th) * Math.cos(lng),
            y: sphereRadius * Math.cos(th),
            z: sphereRadius * Math.sin(th) * Math.sin(lng)
          });
          const proj = project3D(pt);
          if (th === 0) ctx.moveTo(proj.x, proj.y);
          else ctx.lineTo(proj.x, proj.y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Rotate buildings
      const rotatedBuildings = buildings.current.map(b => {
        const rotBaseCenter = rotate3D(b.baseCenter);
        const rotTopCenter = rotate3D(b.topCenter);
        const rotBaseVertices = b.baseVertices.map(rotate3D);
        const rotTopVertices = b.topVertices.map(rotate3D);

        return {
          original: b,
          rotBaseCenter,
          rotTopCenter,
          rotBaseVertices,
          rotTopVertices,
          projBaseCenter: project3D(rotBaseCenter),
          projTopCenter: project3D(rotTopCenter),
          projBaseVertices: rotBaseVertices.map(project3D),
          projTopVertices: rotTopVertices.map(project3D),
          zDepth: rotTopCenter.z
        };
      });

      rotatedBuildings.sort((a, b) => b.zDepth - a.zDepth);

      rotatedBuildings.forEach(rb => {
        const isHovered = hoveredSkill === rb.original.name;
        const colors = getCategoryColors(rb.original.category);
        const scale = rb.projTopCenter.scale;

        if (!scale || isNaN(scale) || scale <= 0) return;

        let opacity = Math.min(1, Math.max(0.15, (scale - 0.4) * 1.8));
        if (isHovered) opacity = 1.0;

        ctx.save();
        ctx.strokeStyle = `rgba(${colors.r}, ${colors.g}, ${colors.b}, ${opacity})`;
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.fillStyle = `rgba(${colors.r}, ${colors.g}, ${colors.b}, ${isHovered ? 0.35 : 0.12 * opacity})`;

        // 1. Draw base
        ctx.beginPath();
        rb.projBaseVertices.forEach((v, idx) => {
          if (idx === 0) ctx.moveTo(v.x, v.y);
          else ctx.lineTo(v.x, v.y);
        });
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        // 2. Draw top
        ctx.beginPath();
        rb.projTopVertices.forEach((v, idx) => {
          if (idx === 0) ctx.moveTo(v.x, v.y);
          else ctx.lineTo(v.x, v.y);
        });
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        // 3. Draw vertical columns
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.moveTo(rb.projBaseVertices[i].x, rb.projBaseVertices[i].y);
          ctx.lineTo(rb.projTopVertices[i].x, rb.projTopVertices[i].y);
          ctx.stroke();
        }

        // Horizontal slices
        const slices = 3;
        for (let s = 1; s < slices; s++) {
          const ratio = s / slices;
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            const bx = rb.projBaseVertices[i].x;
            const by = rb.projBaseVertices[i].y;
            const tx = rb.projTopVertices[i].x;
            const ty = rb.projTopVertices[i].y;
            const sxVal = bx + (tx - bx) * ratio;
            const syVal = by + (ty - by) * ratio;
            if (i === 0) ctx.moveTo(sxVal, syVal);
            else ctx.lineTo(sxVal, syVal);
          }
          ctx.closePath();
          ctx.stroke();
        }

        // 4. Draw pill badge
        const tagW = ctx.measureText(rb.original.name).width + 18 * scale;
        const tagH = 16 * scale + 6;
        const tagX = rb.projTopCenter.x - tagW / 2;
        const tagY = rb.projTopCenter.y - tagH / 2 - 10 * scale;

        ctx.save();
        ctx.beginPath();
        const rad = tagH / 2;
        ctx.moveTo(tagX + rad, tagY);
        ctx.lineTo(tagX + tagW - rad, tagY);
        ctx.quadraticCurveTo(tagX + tagW, tagY, tagX + tagW, tagY + rad);
        ctx.lineTo(tagX + tagW, tagY + tagH - rad);
        ctx.quadraticCurveTo(tagX + tagW, tagY + tagH, tagX + tagW - rad, tagY + tagH);
        ctx.lineTo(tagX + rad, tagY + tagH);
        ctx.quadraticCurveTo(tagX, tagY + tagH, tagX, tagY + tagH - rad);
        ctx.lineTo(tagX, tagY + rad);
        ctx.quadraticCurveTo(tagX, tagY, tagX + rad, tagY);
        ctx.closePath();

        ctx.shadowColor = `rgba(${colors.r}, ${colors.g}, ${colors.b}, 0.5)`;
        ctx.shadowBlur = isHovered ? 18 : 0;
        ctx.fillStyle = `rgba(${colors.r}, ${colors.g}, ${colors.b}, ${isHovered ? 1.0 : opacity})`;
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.fillStyle = colors.text;
        ctx.font = `bold ${Math.max(9, Math.round((isHovered ? 12 : 10.5) * scale))}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(rb.original.name, rb.projTopCenter.x, tagY + tagH / 2);
        ctx.restore();

        ctx.beginPath();
        ctx.moveTo(rb.projTopCenter.x, rb.projTopCenter.y);
        ctx.lineTo(rb.projTopCenter.x, tagY + tagH);
        ctx.strokeStyle = isDarkMode ? `rgba(255, 255, 255, ${0.15 * opacity})` : `rgba(236, 72, 153, ${0.2 * opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      });

      animId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [hoveredSkill, isDarkMode, skills]);

  // Hover detection
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;

    if (isDragging.current) {
      const dX = e.clientX - lastMouseX.current;
      const dY = e.clientY - lastMouseY.current;

      angleY.current += dX * 0.008;
      angleX.current -= dY * 0.008;

      speedY.current = dX * 0.004;
      speedX.current = -dY * 0.004;

      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;
      return;
    }

    if (!buildings.current || buildings.current.length === 0) return;

    let foundHover = null;
    const sortedForHover = buildings.current.map(b => {
      const sX = Math.sin(angleX.current);
      const cXAngle = Math.cos(angleX.current);
      const sY = Math.sin(angleY.current);
      const cYAngle = Math.cos(angleY.current);

      const x1 = b.topCenter.x * cYAngle - b.topCenter.z * sY;
      const z1 = b.topCenter.z * cYAngle + b.topCenter.x * sY;
      const y2 = b.topCenter.y * cXAngle - z1 * sX;
      const z2 = z1 * cXAngle + b.topCenter.y * sX;

      const scale = perspective / (perspective + z2);
      const screenX = x1 * scale + rect.width / 2;
      const screenY = y2 * scale + rect.height / 2;

      ctxForMeasure();
      const textW = (canvas.getContext('2d')?.measureText(b.name).width || 40) + 18 * scale;
      const tagH = 16 * scale + 6;

      return {
        name: b.name,
        x: screenX,
        y: screenY - tagH / 2 - 10 * scale,
        w: textW,
        h: tagH,
        scale
      };
    }).sort((a, b) => b.scale - a.scale);

    function ctxForMeasure() {
      const c = canvasRef.current;
      if (c) {
        const ct = c.getContext('2d');
        if (ct) ct.font = 'bold 11px sans-serif';
      }
    }

    for (const b of sortedForHover) {
      if (!b.scale || isNaN(b.scale)) continue;
      if (
        mX >= b.x - b.w / 2 &&
        mX <= b.x + b.w / 2 &&
        mY >= b.y - b.h / 2 &&
        mY <= b.y + b.h / 2
      ) {
        if (b.scale > 0.6) {
          foundHover = b.name;
          canvas.style.cursor = 'pointer';
          speedX.current *= 0.6;
          speedY.current *= 0.6;
          break;
        }
      }
    }

    if (!foundHover) {
      canvas.style.cursor = 'default';
    }
    setHoveredSkill(foundHover);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    lastMouseX.current = e.clientX;
    lastMouseY.current = e.clientY;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      lastMouseX.current = e.touches[0].clientX;
      lastMouseY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isDragging.current && e.touches.length === 1) {
      const dX = e.touches[0].clientX - lastMouseX.current;
      const dY = e.touches[0].clientY - lastMouseY.current;

      angleY.current += dX * 0.008;
      angleX.current -= dY * 0.008;

      speedY.current = dX * 0.004;
      speedX.current = -dY * 0.004;

      lastMouseX.current = e.touches[0].clientX;
      lastMouseY.current = e.touches[0].clientY;
    }
  };

  if (!skills || skills.length === 0) {
    return <div className="text-center py-10 font-sans">Generating skills...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full select-none overflow-visible">
      <div 
        className="w-full relative flex items-center justify-center border-2 border-dashed rounded-3xl p-4 bg-white/40 dark:bg-slate-900/10 backdrop-blur-sm overflow-visible"
        style={{
          borderColor: isDarkMode ? '#334155' : '#fbcfe8',
          boxShadow: isDarkMode ? 'inset 0 0 50px rgba(236,72,153,0.01)' : 'inset 0 0 50px rgba(236,72,153,0.03)'
        }}
      >
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          className="w-full aspect-square max-h-[580px] md:max-h-[640px] overflow-visible"
          style={{ touchAction: 'none' }}
        />
        
        <div className="absolute bottom-6 text-center pointer-events-none select-none">
          <p className="text-[10px] uppercase tracking-widest text-pink-500/80 dark:text-pink-400 font-bold font-sans">
            Spin Cyber City • Hover to Focus Tag
          </p>
          {hoveredSkill && (
            <p className="text-xs font-bold text-gray-800 dark:text-gray-100 font-sans mt-1 animate-pulse bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-xl shadow-lg border border-pink-200/40">
              🏬 Skill Building: {hoveredSkill}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
