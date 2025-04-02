import { Object3D } from 'three'

export interface CanonPOVProps {
  position: [number, number, number]
  sceneObjects: Object3D[]
  onExit: () => void
  ballCount: number
}

export interface PhysicsSceneProps extends CanonPOVProps {
  isMobile: boolean
  playerHeight?: number
  playerRadius?: number
  moveSpeed?: number
  jumpForce?: number
  maxVelocity?: number
}

export interface PhysicalBallProps {
  position: [number, number, number]
  velocity: [number, number, number]
}

export interface PhysicalBoxProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  geometry: any
  material: any
  userData: any
} 