"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
precision highp float;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;

varying vec2 vUv;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 getLineColor(float t) {
  if (lineGradientCount <= 0) return vec3(0.5);
  if (lineGradientCount == 1) return lineGradient[0];
  
  float scaled = clamp(t, 0.0, 0.999) * float(lineGradientCount - 1);
  int idx = int(floor(scaled));
  float f = fract(scaled);
  return mix(lineGradient[idx], lineGradient[min(idx + 1, lineGradientCount - 1)], f);
}

float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;
  float x_offset = offset;
  float x_movement = time * 0.1;
  float amp = sin(offset + time * 0.2) * 0.3;
  float y = sin(uv.x + x_offset + x_movement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius);
    y += (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
  }

  float m = uv.y - y;
  return 0.015 / max(abs(m) + 0.008, 1e-3);
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  
  if (parallax) baseUv += parallaxOffset;

  vec3 col = vec3(0.0);
  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }

  // Draw Bottom Waves
  if (enableBottom) {
    for (int i = 0; i < 8; i++) {
      if (i >= bottomLineCount) break;
      float t = float(i) / max(float(bottomLineCount - 1), 1.0);
      vec2 ruv = baseUv * rotate(bottomWavePosition.z * log(length(baseUv) + 1.0));
      col += getLineColor(t) * wave(ruv + vec2(bottomLineDistance * float(i) + bottomWavePosition.x, bottomWavePosition.y), 1.5 + 0.2 * float(i), baseUv, mouseUv, interactive) * 0.2;
    }
  }

  // Draw Middle Waves
  if (enableMiddle) {
    for (int i = 0; i < 8; i++) {
      if (i >= middleLineCount) break;
      float t = float(i) / max(float(middleLineCount - 1), 1.0);
      vec2 ruv = baseUv * rotate(middleWavePosition.z * log(length(baseUv) + 1.0));
      col += getLineColor(t) * wave(ruv + vec2(middleLineDistance * float(i) + middleWavePosition.x, middleWavePosition.y), 2.0 + 0.15 * float(i), baseUv, mouseUv, interactive);
    }
  }

  // Draw Top Waves
  if (enableTop) {
    for (int i = 0; i < 8; i++) {
      if (i >= topLineCount) break;
      float t = float(i) / max(float(topLineCount - 1), 1.0);
      vec2 ruv = baseUv * rotate(topWavePosition.z * log(length(baseUv) + 1.0));
      ruv.x *= -1.0;
      col += getLineColor(t) * wave(ruv + vec2(topLineDistance * float(i) + topWavePosition.x, topWavePosition.y), 1.0 + 0.2 * float(i), baseUv, mouseUv, interactive) * 0.1;
    }
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

type WavePosition = { x: number; y: number; rotate: number };

interface FloatingLinesProps {
  linesGradient?: string[];
  enabledWaves?: Array<'top' | 'middle' | 'bottom'>;
  lineCount?: number | number[];
  lineDistance?: number | number[];
  topWavePosition?: WavePosition;
  middleWavePosition?: WavePosition;
  bottomWavePosition?: WavePosition;
  animationSpeed?: number;
  interactive?: boolean;
  bendRadius?: number;
  bendStrength?: number;
  mouseDamping?: number;
  parallax?: boolean;
  parallaxStrength?: number;
}

const hexToVec3 = (hex: string) => {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  return new THREE.Vector3(r, g, b);
};

export default function FloatingLines({
  linesGradient = ["#A855F7", "#F26522", "#3B82F6"], // ESDP Brand Colors
  enabledWaves = ['top', 'middle', 'bottom'],
  lineCount = [6, 4, 3],
  lineDistance = [0.15, 0.2, 0.1],
  topWavePosition = { x: 10.0, y: 0.5, rotate: -0.4 },
  middleWavePosition = { x: 5.0, y: 0.0, rotate: 0.2 },
  bottomWavePosition = { x: 2.0, y: -0.7, rotate: 0.4 },
  animationSpeed = 0.5,
  interactive = true,
  bendRadius = 5.0,
  bendStrength = -1.2,
  mouseDamping = 0.05,
  parallax = true,
  parallaxStrength = 0.15,
}: FloatingLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniforms = useRef<any>({
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector3(1, 1, 1) },
    animationSpeed: { value: animationSpeed },
    enableTop: { value: enabledWaves.includes('top') },
    enableMiddle: { value: enabledWaves.includes('middle') },
    enableBottom: { value: enabledWaves.includes('bottom') },
    topLineCount: { value: Array.isArray(lineCount) ? lineCount[0] : lineCount },
    middleLineCount: { value: Array.isArray(lineCount) ? lineCount[1] : lineCount },
    bottomLineCount: { value: Array.isArray(lineCount) ? lineCount[2] : lineCount },
    topLineDistance: { value: Array.isArray(lineDistance) ? lineDistance[0] : lineDistance },
    middleLineDistance: { value: Array.isArray(lineDistance) ? lineDistance[1] : lineDistance },
    bottomLineDistance: { value: Array.isArray(lineDistance) ? lineDistance[2] : lineDistance },
    topWavePosition: { value: new THREE.Vector3(topWavePosition.x, topWavePosition.y, topWavePosition.rotate) },
    middleWavePosition: { value: new THREE.Vector3(middleWavePosition.x, middleWavePosition.y, middleWavePosition.rotate) },
    bottomWavePosition: { value: new THREE.Vector3(bottomWavePosition.x, bottomWavePosition.y, bottomWavePosition.rotate) },
    iMouse: { value: new THREE.Vector2(-1000, -1000) },
    interactive: { value: interactive },
    bendRadius: { value: bendRadius },
    bendStrength: { value: bendStrength },
    bendInfluence: { value: 0 },
    parallax: { value: parallax },
    parallaxStrength: { value: parallaxStrength },
    lineGradient: { value: Array.from({ length: 8 }, () => new THREE.Vector3(1, 1, 1)) },
    lineGradientCount: { value: linesGradient.length }
  });

  // Fill gradient
  linesGradient.slice(0, 8).forEach((hex, i) => {
    const vec = hexToVec3(hex);
    uniforms.current.lineGradient.value[i].copy(vec);
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms.current,
      vertexShader,
      fragmentShader,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    let mouse = new THREE.Vector2(-1000, -1000);
    let targetInfluence = 0;

    const onResize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height);
      uniforms.current.iResolution.value.set(width * dpr, height * dpr, 1);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const dpr = renderer.getPixelRatio();
      mouse.set((e.clientX - rect.left) * dpr, (rect.height - (e.clientY - rect.top)) * dpr);
      targetInfluence = 1.0;
      if (parallax) {
        uniforms.current.parallaxOffset.value.set(
          ((e.clientX - rect.width / 2) / rect.width) * parallaxStrength,
          -((e.clientY - rect.height / 2) / rect.height) * parallaxStrength
        );
      }
    };

    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', () => { targetInfluence = 0; });
    onResize();

    let rafId: number;
    const animate = () => {
      uniforms.current.iTime.value = clock.getElapsedTime();
      uniforms.current.iMouse.value.lerp(mouse, mouseDamping);
      uniforms.current.bendInfluence.value += (targetInfluence - uniforms.current.bendInfluence.value) * mouseDamping;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [parallax, parallaxStrength, mouseDamping]);

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />;
}
