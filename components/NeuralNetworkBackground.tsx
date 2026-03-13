'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  opacity: number;
  targetOpacity: number;
  phase: number;
  speed: number;
  brightness: number;
  targetBrightness: number;
  spawnTime: number;
  isSpawned: boolean;
}

interface Connection {
  from: number;
  to: number;
  opacity: number;
  targetOpacity: number;
  formed: boolean;
}

const TEAL = { r: 45, g: 212, b: 191 };
const GOLD = { r: 212, g: 165, b: 116 };

export default function NeuralNetworkBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const wavePositionRef = useRef<number>(-0.2);
  const lastWaveTimeRef = useRef<number>(0);
  const lastSpawnTimeRef = useRef<number>(0);
  const spawnedCountRef = useRef<number>(0);
  const initializedRef = useRef<boolean>(false);

  const isInExclusionZone = useCallback((x: number, y: number, width: number, height: number): boolean => {
    const centerX = width / 2;
    const centerY = height / 2;
    const exclusionWidth = Math.min(width * 0.4, 550);
    const exclusionHeight = Math.min(height * 0.55, 320);
    const normalizedX = (x - centerX) / exclusionWidth;
    const normalizedY = (y - centerY) / exclusionHeight;
    return (normalizedX * normalizedX + normalizedY * normalizedY) < 1;
  }, []);

  const generateNodes = useCallback((width: number, height: number): Node[] => {
    const nodes: Node[] = [];
    const nodeCount = Math.floor((width * height) / 25000);
    const targetCount = Math.max(35, Math.min(nodeCount, 80));

    let attempts = 0;
    while (nodes.length < targetCount && attempts < 1000) {
      const x = Math.random() * width;
      const y = Math.random() * height;

      if (!isInExclusionZone(x, y, width, height)) {
        const minDist = 60;
        const tooClose = nodes.some(n => {
          const dx = n.x - x;
          const dy = n.y - y;
          return Math.sqrt(dx * dx + dy * dy) < minDist;
        });

        if (!tooClose) {
          nodes.push({
            id: nodes.length,
            x,
            y,
            baseX: x,
            baseY: y,
            radius: 4 + Math.random() * 5,
            opacity: 0,
            targetOpacity: (0.5 + Math.random() * 0.4) * 0.7,
            phase: Math.random() * Math.PI * 2,
            speed: 0.3 + Math.random() * 0.4,
            brightness: 0,
            targetBrightness: 0,
            spawnTime: 0,
            isSpawned: false,
          });
        }
      }
      attempts++;
    }

    for (let i = nodes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nodes[i], nodes[j]] = [nodes[j], nodes[i]];
      nodes[i].id = i;
      nodes[j].id = j;
    }

    return nodes;
  }, [isInExclusionZone]);

  const generateConnections = useCallback((nodes: Node[], width: number, height: number): Connection[] => {
    const connections: Connection[] = [];
    const maxDistance = Math.min(width, height) * 0.22;

    for (let i = 0; i < nodes.length; i++) {
      const connectCount = 1 + Math.floor(Math.random() * 2);

      const nearby = nodes
        .map((n, j) => ({
          index: j,
          dist: Math.sqrt(
            Math.pow(n.baseX - nodes[i].baseX, 2) + Math.pow(n.baseY - nodes[i].baseY, 2)
          ),
        }))
        .filter(n => n.index !== i && n.dist < maxDistance)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, connectCount);

      for (const n of nearby) {
        const exists = connections.some(
          c => (c.from === i && c.to === n.index) || (c.from === n.index && c.to === i)
        );

        if (!exists) {
          const fromNode = nodes[i];
          const toNode = nodes[n.index];
          let passesThrough = false;

          for (let t = 0.2; t <= 0.8; t += 0.2) {
            const checkX = fromNode.baseX + (toNode.baseX - fromNode.baseX) * t;
            const checkY = fromNode.baseY + (toNode.baseY - fromNode.baseY) * t;
            if (isInExclusionZone(checkX, checkY, width, height)) {
              passesThrough = true;
              break;
            }
          }

          if (!passesThrough) {
            connections.push({
              from: i,
              to: n.index,
              opacity: 0,
              targetOpacity: (0.2 + Math.random() * 0.25) * 0.7,
              formed: false,
            });
          }
        }
      }
    }

    return connections;
  }, [isInExclusionZone]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      nodesRef.current = generateNodes(rect.width, rect.height);
      connectionsRef.current = generateConnections(nodesRef.current, rect.width, rect.height);
      spawnedCountRef.current = 0;
      lastSpawnTimeRef.current = 0;
      initializedRef.current = true;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = (time: number) => {
      if (!ctx || !canvas || !initializedRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const connections = connectionsRef.current;

      // Spawn nodes gradually
      const spawnInterval = 150;
      const nodesPerSpawn = 2 + Math.floor(Math.random() * 3);

      if (time - lastSpawnTimeRef.current > spawnInterval && spawnedCountRef.current < nodes.length) {
        for (let i = 0; i < nodesPerSpawn && spawnedCountRef.current < nodes.length; i++) {
          const node = nodes[spawnedCountRef.current];
          node.isSpawned = true;
          node.spawnTime = time;
          spawnedCountRef.current++;
        }
        lastSpawnTimeRef.current = time;
      }

      // Update wave position
      const waveDuration = 5000;
      const waveGap = 3000;

      if (time - lastWaveTimeRef.current > waveDuration + waveGap) {
        wavePositionRef.current = -0.2;
        lastWaveTimeRef.current = time;
      } else if (wavePositionRef.current < 1.3) {
        wavePositionRef.current += 0.004;
      }

      // Update nodes
      for (const node of nodes) {
        if (!node.isSpawned) continue;

        const spawnAge = time - node.spawnTime;
        const fadeInDuration = 800;
        const fadeInProgress = Math.min(spawnAge / fadeInDuration, 1);

        const floatX = Math.sin(time * 0.0008 * node.speed + node.phase) * 12;
        const floatY = Math.cos(time * 0.0006 * node.speed + node.phase * 1.3) * 10;

        node.x = node.baseX + floatX;
        node.y = node.baseY + floatY;

        const twinkle = 0.1 * Math.sin(time * 0.003 + node.phase * 2);

        const nodeNormalizedX = node.baseX / width;
        const waveDistance = Math.abs(nodeNormalizedX - wavePositionRef.current);

        if (waveDistance < 0.12) {
          node.targetBrightness = (1 - (waveDistance / 0.12)) * 0.5;
        } else {
          node.targetBrightness = 0;
        }

        node.brightness += (node.targetBrightness - node.brightness) * 0.08;
        node.opacity = (node.targetOpacity + twinkle) * fadeInProgress;
      }

      // Update and draw connections
      for (const conn of connections) {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];

        if (!fromNode || !toNode) continue;
        if (!fromNode.isSpawned || !toNode.isSpawned) continue;

        if (!conn.formed) {
          conn.formed = true;
        }

        conn.opacity += (conn.targetOpacity - conn.opacity) * 0.02;

        const connBrightness = Math.max(fromNode.brightness, toNode.brightness);
        const baseAlpha = conn.opacity * Math.min(fromNode.opacity, toNode.opacity) / fromNode.targetOpacity * 0.12;

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);

        if (connBrightness > 0.1) {
          const waveAlpha = connBrightness * 0.2;
          ctx.strokeStyle = `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${Math.min(baseAlpha + waveAlpha, 0.4)})`;
          ctx.lineWidth = 1 + connBrightness * 0.5;
        } else {
          ctx.strokeStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${baseAlpha})`;
          ctx.lineWidth = 0.8;
        }

        ctx.stroke();
      }

      // Draw nodes
      for (const node of nodes) {
        if (!node.isSpawned || node.opacity < 0.01) continue;

        if (node.brightness > 0.05) {
          const glowGradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, node.radius * 3
          );
          glowGradient.addColorStop(0, `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${0.25 * node.brightness * node.opacity})`);
          glowGradient.addColorStop(0.5, `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${0.1 * node.brightness * node.opacity})`);
          glowGradient.addColorStop(1, `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, 0)`);

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * (1 + node.brightness * 0.3), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${(0.5 + 0.2 * node.brightness) * node.opacity})`;
          ctx.fill();
        } else {
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, node.radius * 2
          );
          gradient.addColorStop(0, `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${node.opacity * 0.7})`);
          gradient.addColorStop(0.5, `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${node.opacity * 0.2})`);
          gradient.addColorStop(1, `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, 0)`);

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${node.opacity * 0.6})`;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [generateNodes, generateConnections]);

  return (
    <div ref={containerRef} className="absolute inset-0" style={{ zIndex: 1 }}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
      />
    </div>
  );
}
