import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useMemo, useState } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { FORE, HAND, SHOULDER_Y, UPPER, WRIST, tipPosition } from '../arm/ik';
import { Joints } from '../arm/joints';

const D = Math.PI / 180;

const LOOK_AT: [number, number, number] = [0, 0.19, 0];
const CAMERA_START: [number, number, number] = [0.55, 0.38, 0.55];

type Look = 'solid' | 'ghost' | 'target';

interface ArmProps {
  joints: Joints;
  color: string;
  look: Look;
  highlight?: number | null;
}

const GRAPHITE = '#2a2f25';
const LIME = '#d3f36b';

function Round({ size, radius = 0.006, children, shadow }: { size: [number, number, number]; radius?: number; children: React.ReactNode; shadow?: boolean }) {
  const [sx, sy, sz] = size;
  const geo = useMemo(() => new RoundedBoxGeometry(sx, sy, sz, 4, radius), [sx, sy, sz, radius]);
  useEffect(() => () => geo.dispose(), [geo]);
  return (
    <mesh geometry={geo} castShadow={shadow}>
      {children}
    </mesh>
  );
}

/** Body material. Solid arms are glossy; ghost / target arms are see-through tints. */
function Material({ color, look, emissive, metal = 0.1, rough = 0.32 }: { color: string; look: Look; emissive?: string; metal?: number; rough?: number }) {
  if (look === 'solid') {
    return <meshStandardMaterial color={color} roughness={rough} metalness={metal} emissive={emissive ?? '#000'} emissiveIntensity={emissive ? 0.6 : 0} />;
  }
  return <meshStandardMaterial color={color} transparent opacity={look === 'target' ? 0.3 : 0.22} depthWrite={false} />;
}

/** The arm's signature lime glow (a tint of the arm's own color when it is a ghost). */
function Glow({ look, color }: { look: Look; color: string }) {
  if (look === 'solid') return <meshStandardMaterial color={LIME} emissive={LIME} emissiveIntensity={0.9} toneMapped={false} />;
  return <Material color={color} look={look} />;
}

/** A servo motor: dark graphite block that lights up yellow when its joint is highlighted. */
function Servo({ lit, look, size = [0.03, 0.036, 0.05] as [number, number, number] }: { lit: boolean; look: Look; size?: [number, number, number] }) {
  return (
    <Round size={size} radius={0.008} shadow={look === 'solid'}>
      <Material color={lit ? '#ffd23f' : GRAPHITE} look={look} emissive={lit ? '#ffb300' : undefined} metal={0.5} rough={0.4} />
    </Round>
  );
}

/** A joint: graphite hub with a glowing lime ring on each face. */
function Hinge({ look, r = 0.02, color }: { look: Look; r?: number; color: string }) {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow={look === 'solid'}>
        <cylinderGeometry args={[r, r, 0.056, 32]} />
        <Material color={GRAPHITE} look={look} metal={0.6} rough={0.35} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[0, 0, s * 0.0285]}>
          <torusGeometry args={[r * 0.78, 0.0024, 10, 40]} />
          <Glow look={look} color={color} />
        </mesh>
      ))}
    </group>
  );
}

/** A tapered ceramic shell with a glowing lime stripe down each side. */
function Link({ length, width, color, look }: { length: number; width: number; color: string; look: Look }) {
  const depth = width * 0.9;
  return (
    <group position={[0, length / 2, 0]}>
      <Round size={[width, length, depth]} radius={width * 0.38} shadow={look === 'solid'}>
        <Material color={color} look={look} />
      </Round>
      {[-1, 1].map((s) => (
        <group key={s} position={[0, 0, s * (depth / 2 + 0.0004)]}>
          <Round size={[width * 0.16, length * 0.62, 0.0016]} radius={0.0008}>
            <Glow look={look} color={color} />
          </Round>
        </group>
      ))}
    </group>
  );
}

/** One finger: ceramic bar, dark rubber pad, glowing tip. */
function Finger({ len, look, color, lit, inward }: { len: number; look: Look; color: string; lit: boolean; inward: 1 | -1 }) {
  return (
    <group>
      <Round size={[0.011, len, 0.018]} radius={0.0045} shadow={look === 'solid'}>
        <Material color={lit ? '#ffd23f' : color} look={look} emissive={lit ? '#ffb300' : undefined} />
      </Round>
      <group position={[inward * -0.0052, 0, 0]}>
        <Round size={[0.0026, len * 0.72, 0.014]} radius={0.001}>
          <Material color="#14160f" look={look} rough={0.9} />
        </Round>
      </group>
      <mesh position={[0, len / 2 - 0.002, 0]}>
        <boxGeometry args={[0.0115, 0.0045, 0.0185]} />
        <Glow look={look} color={color} />
      </mesh>
    </group>
  );
}

function ArmModel({ joints, color, look, highlight }: ArmProps) {
  const [pan, lift, elbow, wristFlex, wristRoll, grip] = joints;
  const lit = (i: number) => look === 'solid' && highlight === i;
  const solid = look === 'solid';
  const jaw = (grip / 100) * 38 * D;
  const fingerLen = HAND - WRIST - 0.002;
  return (
    <group>
      {/* Base: dark plinth, ceramic collar, glowing ring */}
      <mesh position={[0, 0.006, 0]} receiveShadow castShadow={solid}>
        <cylinderGeometry args={[0.082, 0.088, 0.012, 56]} />
        <Material color={GRAPHITE} look={look} metal={0.5} rough={0.45} />
      </mesh>
      <mesh position={[0, 0.0125, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.078, 0.0025, 10, 64]} />
        <Glow look={look} color={color} />
      </mesh>
      <mesh position={[0, 0.02, 0]} castShadow={solid}>
        <cylinderGeometry args={[0.062, 0.07, 0.016, 48]} />
        <Material color={color} look={look} />
      </mesh>
      <group rotation={[0, pan * D, 0]}>
        {/* Turret: ceramic cone with a graphite motor cap */}
        <mesh position={[0, 0.04, 0]} castShadow={solid}>
          <cylinderGeometry args={[0.042, 0.054, 0.028, 44]} />
          <Material color={color} look={look} />
        </mesh>
        <mesh position={[0, 0.06, 0]} castShadow={solid}>
          <cylinderGeometry args={[0.032, 0.038, 0.016, 40]} />
          <Material color={lit(0) ? '#ffd23f' : GRAPHITE} look={look} emissive={lit(0) ? '#ffb300' : undefined} metal={0.5} rough={0.4} />
        </mesh>
        <mesh position={[0, 0.0685, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.026, 0.002, 10, 40]} />
          <Glow look={look} color={color} />
        </mesh>
        {/* Shoulder: 0 deg = upper arm straight up */}
        <group position={[0, SHOULDER_Y, 0]} rotation={[0, 0, -lift * D]}>
          <Servo lit={lit(1)} look={look} />
          <Hinge look={look} r={0.022} color={color} />
          <Link length={UPPER} width={0.032} color={color} look={look} />
          {/* Elbow: 0 deg = forearm pointing forward */}
          <group position={[0, UPPER, 0]} rotation={[0, 0, (-90 - elbow) * D]}>
            <Servo lit={lit(2)} look={look} />
            <Hinge look={look} r={0.02} color={color} />
            <Link length={FORE} width={0.028} color={color} look={look} />
            <group position={[0, FORE, 0]} rotation={[0, 0, -wristFlex * D]}>
              <Servo lit={lit(3)} look={look} size={[0.028, 0.032, 0.046]} />
              <Hinge look={look} r={0.017} color={color} />
              <group rotation={[0, wristRoll * D, 0]}>
                <group position={[0, WRIST * 0.5, 0]}>
                  <Servo lit={lit(4)} look={look} size={[0.034, 0.03, 0.034]} />
                </group>
                <Link length={WRIST} width={0.022} color={color} look={look} />
                {/* Fixed finger and moving finger */}
                <group position={[-0.014, WRIST + fingerLen / 2, 0]}>
                  <Finger len={fingerLen} look={look} color={color} lit={false} inward={1} />
                </group>
                <group position={[0.014, WRIST, 0]} rotation={[0, 0, -jaw]}>
                  <group position={[0, fingerLen / 2, 0]}>
                    <Finger len={fingerLen} look={look} color={color} lit={lit(5)} inward={-1} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

/** The glowing ball on the fingertips: drag it to move the arm, tap it to open/close the hand. */
function Handle({
  joints,
  onGrab,
  onDrag,
  onTap,
}: {
  joints: Joints;
  onGrab: () => boolean;
  onDrag: (p: [number, number, number]) => void;
  onTap: () => void;
}) {
  const { camera, controls } = useThree();
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const drag = useRef<{ plane: THREE.Plane; x: number; y: number; moved: boolean } | null>(null);
  const tip = tipPosition(joints);
  const hit = useMemo(() => new THREE.Vector3(), []);
  const setOrbit = (on: boolean) => {
    if (controls) (controls as unknown as { enabled: boolean }).enabled = on;
  };
  return (
    <group position={tip}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          document.body.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          setHover(false);
          if (!drag.current) document.body.style.cursor = '';
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          if (!onGrab()) return;
          (e.target as Element).setPointerCapture(e.pointerId);
          const n = camera.getWorldDirection(new THREE.Vector3());
          drag.current = { plane: new THREE.Plane().setFromNormalAndCoplanarPoint(n, new THREE.Vector3(...tip)), x: e.clientX, y: e.clientY, moved: false };
          setOrbit(false);
          setDown(true);
          document.body.style.cursor = 'grabbing';
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d) return;
          if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 6) d.moved = true;
          if (!d.moved) return;
          if (e.ray.intersectPlane(d.plane, hit)) onDrag([hit.x, Math.max(hit.y, 0.025), hit.z]);
        }}
        onPointerUp={(e) => {
          const d = drag.current;
          drag.current = null;
          (e.target as Element).releasePointerCapture?.(e.pointerId);
          setOrbit(true);
          setDown(false);
          document.body.style.cursor = hover ? 'grab' : '';
          if (d && !d.moved) onTap();
        }}
      >
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh scale={down ? 1.25 : hover ? 1.15 : 1} raycast={() => null}>
        <sphereGeometry args={[0.016, 24, 24]} />
        <meshStandardMaterial color="#ffd23f" emissive="#ffb300" emissiveIntensity={down ? 1.2 : 0.7} />
      </mesh>
      <mesh scale={down ? 1.25 : hover ? 1.15 : 1} raycast={() => null}>
        <sphereGeometry args={[0.028, 24, 24]} />
        <meshBasicMaterial color="#ffd23f" transparent opacity={0.28} depthWrite={false} />
      </mesh>
    </group>
  );
}

/** Drag to spin the view, pinch or scroll to zoom. */
function Controls({ resetKey }: { resetKey: number }) {
  const { camera, gl, set } = useThree();
  const ref = useRef<OrbitControls>();
  useEffect(() => {
    const c = new OrbitControls(camera, gl.domElement);
    c.target.set(...LOOK_AT);
    c.enablePan = false;
    c.minDistance = 0.25;
    c.maxDistance = 1.3;
    c.maxPolarAngle = Math.PI / 2 - 0.05; // don't go under the table
    c.update();
    ref.current = c;
    set({ controls: c as never });
    return () => {
      set({ controls: null });
      c.dispose();
    };
  }, [camera, gl, set]);
  useEffect(() => {
    if (!resetKey || !ref.current) return;
    camera.position.set(...CAMERA_START);
    ref.current.target.set(...LOOK_AT);
    ref.current.update();
  }, [resetKey, camera]);
  return null;
}

/**
 * Radar floor: a lime dot grid, soft range rings around the arm's reach, and a
 * slow sweep that rotates like a radar. Same lime-on-olive look as the GRIP site.
 */
function RadarFloor() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `varying vec3 vWorld;
          void main() { vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
        fragmentShader: `varying vec3 vWorld;
          uniform float uTime;
          const vec3 LIME = vec3(0.827, 0.953, 0.42);
          const vec3 BLUE = vec3(0.663, 0.847, 0.957);
          void main() {
            vec2 p = vWorld.xz;
            float r = length(p);
            // dot grid every 4 cm
            vec2 cell = fract(p / 0.04) - 0.5;
            float dots = 1.0 - smoothstep(0.06, 0.12, length(cell));
            // range rings every 10 cm, the reach ring (30 cm) is solid and brighter
            float ring = abs(fract(r / 0.1 + 0.5) - 0.5) * 0.1;
            float rings = 1.0 - smoothstep(0.0006, 0.0016, ring);
            float reach = 1.0 - smoothstep(0.0012, 0.0030, abs(r - 0.3));
            // rotating sweep with a fading tail
            float ang = atan(p.y, p.x);
            float d = mod(uTime * 0.7 - ang, 6.2831853);
            float sweep = exp(-d * 2.2) * smoothstep(0.0, 0.12, d) * (1.0 - smoothstep(6.1, 6.28, d)) * (1.0 - smoothstep(0.3, 0.62, r)) * step(0.02, r);
            float fade = 1.0 - smoothstep(0.35, 2.0, r);
            float a = dots * 0.42 * fade + rings * 0.22 * fade + reach * 0.9 + sweep * 0.5;
            if (a < 0.01) discard;
            vec3 col = mix(LIME, BLUE, smoothstep(0.3, 1.2, r));
            gl_FragColor = vec4(col, min(a, 1.0));
          }`,
      }),
    [],
  );
  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.getElapsedTime();
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} material={material}>
      <planeGeometry args={[6, 6]} />
    </mesh>
  );
}

export function ArmPreview({
  follower,
  leader,
  target,
  highlight = null,
  resetKey = 0,
  interact,
}: {
  follower: Joints | null;
  leader: Joints | null;
  target?: Joints | null;
  highlight?: number | null;
  resetKey?: number;
  /** When set, a glowing ball on the follower's fingertips can be dragged or tapped. */
  interact?: { onGrab: () => boolean; onDrag: (p: [number, number, number]) => void; onTap: () => void };
}) {
  const label = follower
    ? `3D view of the follower arm. Base ${Math.round(follower[0])} degrees, hand ${Math.round(follower[5])} percent open. Drag to turn the view.`
    : '3D view. No follower arm connected yet.';
    const showTarget =
    follower && target && target.some((v, i) => Math.abs(v - follower[i]) > 2);
  return (
    <Canvas
      shadows
      camera={{ position: CAMERA_START, fov: 42 }}
      dpr={[1, 2]}
      aria-label={label}
      role="img"
    >
      <color attach="background" args={['#0d100b']} />
      <fog attach="fog" args={['#0d100b', 1.0, 2.4]} />
      <hemisphereLight args={['#fff1e0', '#1a1410', 1.1]} />
      <directionalLight
        position={[0.5, 1.1, 0.6]}
        intensity={2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-radius={6}
        shadow-camera-left={-0.4}
        shadow-camera-right={0.4}
        shadow-camera-top={0.4}
        shadow-camera-bottom={-0.4}
      />
      <directionalLight position={[-0.6, 0.5, -0.7]} intensity={1.1} color="#d3f36b" />
      <RadarFloor />
      {follower && <ArmModel joints={follower} color="#e9ecdf" look="solid" highlight={highlight} />}
      {follower && interact && <Handle joints={follower} {...interact} />}
      {showTarget && <ArmModel joints={target!} color="#22b573" look="target" />}
      {leader && <ArmModel joints={leader} color="#4f7cff" look="ghost" />}
      <Controls resetKey={resetKey} />
    </Canvas>
  );
}
