import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, TransformControls, Box, Sphere, Cylinder, Line } from '@react-three/drei'
import { useGraphStore } from '../store/useGraphStore'

// --- Компонент объекта с возможностью перемещения, вращения, масштабирования ---
const DraggableObject = ({ obj }: { obj: any }) => {
  const updatePosition = useGraphStore((state) => state.updatePosition)
  const updateRotation = useGraphStore((state) => state.updateRotation)
  const updateScale = useGraphStore((state) => state.updateScale)

  // Проверяем, чтобы позиция, вращение и масштаб были массивами
  const safePosition = Array.isArray(obj.position) ? obj.position : [0, 0, 0]
  const safeRotation = Array.isArray(obj.rotation) ? obj.rotation : [0, 0, 0]
  const safeScale = Array.isArray(obj.scale) ? obj.scale : [1, 1, 1]

  const handleDrag = (position: number[]) => {
    updatePosition(obj.id, position as [number, number, number])
  }

  const handleRotate = (rotation: number[]) => {
    updateRotation(obj.id, rotation as [number, number, number])
  }

  const handleScale = (scale: number[]) => {
    updateScale(obj.id, scale as [number, number, number])
  }

  return (
    <group
      position={safePosition as [number, number, number]}
      rotation={safeRotation as [number, number, number]}
      scale={safeScale as [number, number, number]}
    >
      {/* Перемещение */}
      <TransformControls mode="translate" onObjectChange={handleDrag}>
        <mesh>
          {obj.type === 'cube' && <boxGeometry />}
          {obj.type === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
          {obj.type === 'cylinder' && <cylinderGeometry args={[0.5, 0.5, 1, 32]} />}
          <meshStandardMaterial />
        </mesh>
      </TransformControls>

      {/* Вращение */}
      <TransformControls mode="rotate" onObjectChange={handleRotate}>
        <mesh>
          {obj.type === 'cube' && <boxGeometry />}
          {obj.type === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
          {obj.type === 'cylinder' && <cylinderGeometry args={[0.5, 0.5, 1, 32]} />}
          <meshStandardMaterial transparent opacity={0.5} />
        </mesh>
      </TransformControls>

      {/* Масштабирование */}
      <TransformControls mode="scale" onObjectChange={handleScale}>
        <mesh>
          {obj.type === 'cube' && <boxGeometry />}
          {obj.type === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
          {obj.type === 'cylinder' && <cylinderGeometry args={[0.5, 0.5, 1, 32]} />}
          <meshStandardMaterial transparent opacity={0.5} />
        </mesh>
      </TransformControls>
    </group>
  )
}

// --- Линия между двумя объектами ---
const EdgeLine = ({ from, to }: { from: number[]; to: number[] }) => {
  return <Line points={[from, to]} color="blue" lineWidth={2} />
}

// --- Основная сцена ---
const Scene3D = () => {
  const objects = useGraphStore((state) => state.objects)
  const edges = useGraphStore((state) => state.edges)

  const getObjectPosition = (id: string) => {
    const obj = objects.find((o) => o.id === id)
    return obj?.position || [0, 0, 0]
  }

  return (
    <Canvas camera={{ position: [3, 3, 5] }} style={{ background: '#1e1e1e' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Рисуем все объекты */}
      {objects.map((obj) => (
        <DraggableObject key={obj.id} obj={obj} />
      ))}

      {/* Рисуем связи между объектами */}
      {edges.map((edge) => {
        const fromPos = getObjectPosition(edge.from)
        const toPos = getObjectPosition(edge.to)
        return <EdgeLine key={edge.id} from={fromPos} to={toPos} />
      })}

      {/* Управление камерой */}
      <OrbitControls />
    </Canvas>
  )
}

export default Scene3D