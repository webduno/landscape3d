"use client";
import { Cylinder, useTexture } from '@react-three/drei';
import { Walls } from './Walls';
import { Floor } from './Floor';
import { Platform } from './Platform';
import { Planters } from './Planters';
import { Columns } from './Columns';
import { Ceiling } from './Ceiling';
import { Lighting } from './Lighting';
import { SinglePortal } from './SinglePortal';
import { MainTorai } from './MainTorai';

export const HallOfPortals = () => {
  
  return (
    <group position={[0, 0, 0]}>
      <Lighting />
      <Ceiling />
      <Walls />
      <Floor />
      <Platform />
      <Planters />
      <Columns />
        <MainTorai />








        
        <group  scale={[0.5,0.5,0.5]} position={[-11.25, 8.75, 4]} >
  
  <SinglePortal position={[0, 0, 0]} rotation={[0, Math.PI/2, 0]} 
          portalMaterial={<meshStandardMaterial color="#dddddd" />}
        />
        </group>
      <group  scale={[0.5,0.5,0.5]} position={[-11.25, 8.75, -4]} >
  
  <SinglePortal position={[0, 0, 0]} rotation={[0, Math.PI/2, 0]} 
          portalMaterial={<meshStandardMaterial color="#dddddd" />}
        />
        </group>

      <group  scale={[0.5,0.5,0.5]} position={[-11.25, 8.75, 20]} >
  
  <SinglePortal position={[0, 0, 0]} rotation={[0, Math.PI/2, 0]} 
          portalMaterial={<meshStandardMaterial color="#dddddd" />}
        />
        </group>
      <group  scale={[0.5,0.5,0.5]} position={[-11.25, 8.75, -20]} >
  
  <SinglePortal position={[0, 0, 0]} rotation={[0, Math.PI/2, 0]} 
          portalMaterial={<meshStandardMaterial color="#d0f4aa" emissive="#d0f4aa" emissiveIntensity={0.75}/>}
        />
        </group>
<group  scale={[0.5,0.5,0.5]} position={[-11.25, 8.75, 12]} >
  
<SinglePortal position={[0, 0, 0]} rotation={[0, Math.PI/2, 0]} 
        portalMaterial={<meshStandardMaterial color="#d0f4aa" emissive="#d0f4aa" emissiveIntensity={0.75}/>}
      />
      </group>
<group  scale={[0.5,0.5,0.5]} position={[-11.25, 8.75, -12]} >
  
<SinglePortal position={[0, 0, 0]} rotation={[0, Math.PI/2, 0]} 
        portalMaterial={<meshStandardMaterial color="#d0f4aa" emissive="#d0f4aa" emissiveIntensity={0.75}/>}
      />
      </group>










      
        
      <group  scale={[0.5,0.5,0.5]} position={[11.25, 8.75, 4]} >
  
  <SinglePortal position={[0, 0, 0]} rotation={[0, -Math.PI/2, 0]} 
          portalMaterial={<meshStandardMaterial color="#dddddd" />}
        />
        </group>
      <group  scale={[0.5,0.5,0.5]} position={[11.25, 8.75, -4]} >
  
  <SinglePortal position={[0, 0, 0]} rotation={[0, -Math.PI/2, 0]} 
          portalMaterial={<meshStandardMaterial color="#fff4ff" emissive="#fff4ff" emissiveIntensity={0.75}/>}
        />
        </group>

      <group  scale={[0.5,0.5,0.5]} position={[11.25, 8.75, 20]} >
  
  <SinglePortal position={[0, 0, 0]} rotation={[0, -Math.PI/2, 0]} 
          portalMaterial={<meshStandardMaterial color="#dddddd" />}
        />
        </group>
      <group  scale={[0.5,0.5,0.5]} position={[11.25, 8.75, -20]} >
  
  <SinglePortal position={[0, 0, 0]} rotation={[0, -Math.PI/2, 0]} 
          portalMaterial={<meshStandardMaterial color="#ccddff" emissive="#ccddff" emissiveIntensity={0.75}/>}
        />
        </group>
<group  scale={[0.5,0.5,0.5]} position={[11.25, 8.75, 12]} >
  
<SinglePortal position={[0, 0, 0]} rotation={[0, -Math.PI/2, 0]} 
        portalMaterial={<meshStandardMaterial color="#d0f4aa" emissive="#d0f4aa" emissiveIntensity={0.75}/>}
      />
      </group>
<group  scale={[0.5,0.5,0.5]} position={[11.25, 8.75, -12]} >
  
<SinglePortal position={[0, 0, 0]} rotation={[0, -Math.PI/2, 0]} 
        portalMaterial={<meshStandardMaterial color="#d0f4aa" emissive="#d0f4aa" emissiveIntensity={0.75}/>}
      />
      </group>

















      <SinglePortal position={[-11.25, 0, 16]} rotation={[0, Math.PI/2, 0]} 
        portalMaterial={<meshStandardMaterial color="#f4d0aa" emissive="#f4d0aa" emissiveIntensity={0.75}/>}
      />
      <SinglePortal position={[11.25, 0, 16]} rotation={[0, -Math.PI/2, 0]} 
        portalMaterial={<meshStandardMaterial color="#aaf4d0" emissive="#aaf4d0" emissiveIntensity={0.75}/>}
      />
      
      <SinglePortal position={[-11.25, 0, 0]} rotation={[0, Math.PI/2, 0]} 
        portalMaterial={<meshStandardMaterial color="#aad0f4" emissive="#aad0f4" emissiveIntensity={0.75}/>}
      />
      <SinglePortal position={[11.25, 0, 0]} rotation={[0, -Math.PI/2, 0]} 
        portalMaterial={<meshStandardMaterial color="#d0f4aa" emissive="#d0f4aa" emissiveIntensity={0.75}/>}
      />

      <SinglePortal position={[-11.25, 1, -16]} rotation={[0, Math.PI/2, 0]} 
        portalMaterial={<meshStandardMaterial color="#aaf4d0" emissive="#aaf4d0"  emissiveIntensity={0.75}/>}
      />
      <SinglePortal position={[11.25, 1, -16]} rotation={[0, -Math.PI/2, 0]} 
        portalMaterial={<meshStandardMaterial color="#d0aaf4" emissive="#d0aaf4" emissiveIntensity={0.75}/>}
        />





    
    </group>
  );
};

