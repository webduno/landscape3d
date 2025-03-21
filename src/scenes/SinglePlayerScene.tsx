"use client"
import SimpleScene from '@/scenes/SimpleScene'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Object3D, BoxGeometry, MeshStandardMaterial, Mesh, Group } from 'three'
import { MapControls, TransformControls } from '@react-three/drei'
import { createObject, getTransformMode, loadObjects, saveObjects } from '@/scripts/sceneHelpers'

export interface SinglePlayerSceneHandle {
  createObject: (position: [number, number, number], scale: [number, number, number], rotation: [number, number, number]) => Object3D
  saveObjects: () => void
}

type TransformMode = 'move' | 'scale' | 'rotate';

interface SinglePlayerSceneProps {
  selectedObject: Object3D | null
  setSelectedObject: (object: Object3D | null) => void
  transformMode?: TransformMode
  color: string
  isAdding?: boolean
  setIsAdding: (isAdding: boolean) => void
}
const STORAGE_KEY = 'singleplayer_scene'
const SinglePlayerScene = forwardRef<SinglePlayerSceneHandle, SinglePlayerSceneProps>((props, ref) => {
  const { isAdding = false, setIsAdding, selectedObject, setSelectedObject, transformMode = 'move', color } = props
  const sceneRef = useRef<Group>(null)
  const mapControlsRef = useRef<typeof MapControls>(null)
  // Load objects when the component mounts and scene is ready
  useEffect(() => {
    // Check if the scene is available now
    if (sceneRef.current) {
      loadObjects(sceneRef, STORAGE_KEY);
    } else {
      // Use requestAnimationFrame for a more efficient approach than setTimeout
      const checkSceneReady = () => {
        if (sceneRef.current) {
          loadObjects(sceneRef, STORAGE_KEY);
        } else {
          requestAnimationFrame(checkSceneReady);
        }
      };
      requestAnimationFrame(checkSceneReady);
    }
  }, []);
  
  // Create object wrapper to use shared function
  const handleCreateObject = (position: [number, number, number], scale: [number, number, number], rotation: [number, number, number]) => {
    return createObject(
      position, 
      scale,
      rotation,
      color, 
      sceneRef, 
      setIsAdding, 
      setSelectedObject, 
      isAdding
    );
  }

  // Save objects wrapper to use shared function
  const handleSaveObjects = () => {
    saveObjects(sceneRef, STORAGE_KEY);
  }
  
  if (selectedObject && selectedObject instanceof Mesh && selectedObject.material instanceof MeshStandardMaterial) {
    selectedObject.material.color.set(color);
  }
  
  useImperativeHandle(ref, () => ({
    createObject: handleCreateObject,
    saveObjects: handleSaveObjects
  }))

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
      <SimpleScene>
        {/* @ts-ignore */}
        <MapControls enablePan={!isAdding} minDistance={0.1} maxDistance={50} ref={mapControlsRef} />
        
        <group ref={sceneRef}>
          {/* <mesh onClick={(e) => {
            if (!isAdding && !selectedObject) {
              const clickedObject = e.object
            } else if (selectedObject) {
              e.stopPropagation()
            }
          }}>
            <boxGeometry args={[10, 0.1, 10]} />
            <meshStandardMaterial color="grey" />
          </mesh> */}
          {selectedObject && (
            <TransformControls 
              object={selectedObject} 
              mode={getTransformMode(transformMode)} 
              onPointerDown={(e) => {
                e.stopPropagation()
              }}
            />
          )}
        </group>
      </SimpleScene>
    </div>
  )
})

SinglePlayerScene.displayName = 'SinglePlayerScene'

export default SinglePlayerScene 