import { Object3D, BoxGeometry, MeshStandardMaterial, Mesh, Group } from 'three'

type TransformMode = 'move' | 'scale' | 'rotate';
type TransformControlsMode = 'translate' | 'scale' | 'rotate';

// Map transformMode to TransformControls mode
export const getTransformMode = (transformMode: TransformMode = 'move'): TransformControlsMode => {
  if (transformMode === 'move') return 'translate'
  return transformMode as TransformControlsMode
}

// Create a new 3D box object
export const createObject = (
  position: [number, number, number], 
  color: string, 
  sceneRef: React.RefObject<Group>,
  setIsMoving: (isMoving: boolean) => void,
  setSelectedObject: (object: Object3D | null) => void,
  isMoving: boolean
): Object3D => {
  if (isMoving) return new Object3D();

  setIsMoving(true)
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshStandardMaterial({ color })
  const mesh = new Mesh(geometry, material)
  mesh.position.set(...position)
  
  sceneRef.current?.add(mesh)
  setSelectedObject(mesh)

  return mesh
}

// Save objects to localStorage
export const saveObjects = (
  sceneRef: React.RefObject<Group>,
  storageKey: string
): any => {
  if (!sceneRef.current) return;
  
  const objects = sceneRef.current.children
    .filter(child => child instanceof Mesh && !(child.geometry instanceof BoxGeometry && child.geometry.parameters.width === 10))
    .map((mesh: any) => {
      const position = [mesh.position.x, mesh.position.y, mesh.position.z];
      const rotation = [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z];
      const scale = [mesh.scale.x, mesh.scale.y, mesh.scale.z];
      return { position, rotation, scale, color: mesh?.material.color.getHexString() };
    });
  
  localStorage.setItem(storageKey, JSON.stringify(objects));
  return objects
}

// Load objects from localStorage
export const loadObjects = (
  sceneRef: React.RefObject<Group>,
  storageKey: string
): void => {
  const sceneGroup = sceneRef.current;
  if (!sceneGroup) return;
  
  const objects = JSON.parse(localStorage.getItem(storageKey) || '[]')
  objects.forEach((object: any) => {
    const { position, rotation, scale, color } = object
    const mesh = new Mesh(
      new BoxGeometry(1, 1, 1), 
      new MeshStandardMaterial({ color: "#ff9900" })
    )
    mesh.position.set(position[0], position[1], position[2])
    mesh.rotation.set(rotation[0], rotation[1], rotation[2])
    mesh.scale.set(scale[0], scale[1], scale[2])
    mesh.material.color.set("#" + color)
    sceneGroup.add(mesh)
  })
} 