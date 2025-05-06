import { create } from 'zustand'

// Типы объектов
type ObjectType = 'cube' | 'sphere' | 'cylinder'

// Интерфейс для 3D-объекта
interface Object3D {
  id: string
  type: ObjectType
  position: [number, number, number] // XYZ
  rotation: [number, number, number]  // XYZ (в радианах)
  scale: [number, number, number]     // XYZ
  description?: string                // Описание
}

// Интерфейс связи между объектами
interface Edge {
  id: string
  from: string // ID начального объекта
  to: string   // ID конечного объекта
}

// Интерфейс состояния приложения
interface GraphState {
  objects: Object3D[]
  edges: Edge[]

  // Методы
  addCube: () => void
  addSphere: () => void
  addCylinder: () => void
  connectObjects: (fromId: string, toId: string) => void
  updatePosition: (id: string, position: [number, number, number]) => void
  updateRotation: (id: string, rotation: [number, number, number]) => void
  updateScale: (id: string, scale: [number, number, number]) => void
  updateDescription: (id: string, description: string) => void
  deleteObject: (id: string) => void
}

// Попробуем загрузить из localStorage
const savedData = localStorage.getItem('graphData')
const initialState = savedData
  ? JSON.parse(savedData)
  : { objects: [], edges: [] }

// Вспомогательная функция для сохранения в localStorage
function saveToLocalStorage(objects: Object3D[], edges: Edge[]) {
  localStorage.setItem(
    'graphData',
    JSON.stringify({ objects, edges })
  )
}

// Создаем Zustand store
export const useGraphStore = create<GraphState>((set) => ({
  objects: initialState.objects,
  edges: initialState.edges,

  // Добавить куб
  addCube: () =>
    set((state) => {
      const newObject = {
        id: Math.random().toString(36).substring(2),
        type: 'cube',
        position: [Math.random() * 5 - 2.5, 0, Math.random() * 5 - 2.5],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        description: '',
      }
      const newObjects = [...state.objects, newObject]
      saveToLocalStorage(newObjects, state.edges)
      return { objects: newObjects }
    }),

  // Добавить сферу
  addSphere: () =>
    set((state) => {
      const newObject = {
        id: Math.random().toString(36).substring(2),
        type: 'sphere',
        position: [Math.random() * 5 - 2.5, 0, Math.random() * 5 - 2.5],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        description: '',
      }
      const newObjects = [...state.objects, newObject]
      saveToLocalStorage(newObjects, state.edges)
      return { objects: newObjects }
    }),

  // Добавить цилиндр
  addCylinder: () =>
    set((state) => {
      const newObject = {
        id: Math.random().toString(36).substring(2),
        type: 'cylinder',
        position: [Math.random() * 5 - 2.5, 0, Math.random() * 5 - 2.5],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        description: '',
      }
      const newObjects = [...state.objects, newObject]
      saveToLocalStorage(newObjects, state.edges)
      return { objects: newObjects }
    }),

  // Создать связь между двумя объектами
  connectObjects: (fromId: string, toId: string) =>
    set((state) => {
      const newEdge = {
        id: Math.random().toString(36).substring(2),
        from: fromId,
        to: toId,
      }
      const newEdges = [...state.edges, newEdge]
      saveToLocalStorage(state.objects, newEdges)
      return { edges: newEdges }
    }),

  // Обновить позицию объекта
  updatePosition: (id: string, newPosition: [number, number, number]) =>
    set((state) => {
      const newObjects = state.objects.map((obj) =>
        obj.id === id ? { ...obj, position: [...newPosition] } : obj
      )
      saveToLocalStorage(newObjects, state.edges)
      return { objects: newObjects }
    }),

  // Обновить вращение объекта
  updateRotation: (id: string, newRotation: [number, number, number]) =>
    set((state) => {
      const newObjects = state.objects.map((obj) =>
        obj.id === id ? { ...obj, rotation: [...newRotation] } : obj
      )
      saveToLocalStorage(newObjects, state.edges)
      return { objects: newObjects }
    }),

  // Обновить масштаб объекта
  updateScale: (id: string, newScale: [number, number, number]) =>
    set((state) => {
      const newObjects = state.objects.map((obj) =>
        obj.id === id ? { ...obj, scale: [...newScale] } : obj
      )
      saveToLocalStorage(newObjects, state.edges)
      return { objects: newObjects }
    }),

  // Обновить описание объекта
  updateDescription: (id: string, description: string) =>
    set((state) => {
      const newObjects = state.objects.map((obj) =>
        obj.id === id ? { ...obj, description } : obj
      )
      saveToLocalStorage(newObjects, state.edges)
      return { objects: newObjects }
    }),

  // Удалить объект по ID + удалить все связи с ним
  deleteObject: (id: string) =>
    set((state) => {
      const newObjects = state.objects.filter((obj) => obj.id !== id)
      const newEdges = state.edges.filter((edge) => edge.from !== id && edge.to !== id)
      saveToLocalStorage(newObjects, newEdges)
      return { objects: newObjects, edges: newEdges }
    }),
}))